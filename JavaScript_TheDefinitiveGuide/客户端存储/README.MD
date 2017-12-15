
## 客户端存储

#### localstorage、sessionstorage
##### 存储API

#### cookie
##### cookie API
* [js-cookie/js-cookie](https://github.com/js-cookie/js-cookie)
A simple, lightweight JavaScript API for handling browser cookies

```js
//实现基于cookie的存储API
/*
* cookieStorage.js
* */
function cookieStorage(maxage, path) {      //有效期与路径
    var cookie = (function () {
        var cookie = {};
        var all = document.cookie;
        if (all !== '') {
            all.split(/;\s*/).forEach(str => {
                const item = str.split('=');
                cookie[item[0]] = decodeURIComponent(item[1])
            })
        }
        return cookie
    }());

    var keys = Object.keys(cookie);
    return {
        length: keys.length,
        key(n) {
            if (n < 0 || n > keys.length) return null;
            return keys[n]
        },
        getItem(name) {
            return cookie[name] || null
        },
        setItem(key, value) {
            if (!(key in cookie)) {
                keys.push(key);
                this.length++
            }
            cookie[key] = value;
            var cookieStr = key + '=' + encodeURIComponent(value);
            if (maxage) cookie += '; max-age=' + maxage;
            if (path) cookie += '; path=' + path;
            document.cookie = cookieStr
        },
        removeItem(key) {
            if (!(key in cookie)) return;
            delete cookie[key];
            var index = keys.indexOf(key);
            keys.splice(index, 1);
            this.length--;
            document.cookie = key + '=; max-age=0'
        },
        clear() {
            for (var i = 0, len = keys.length; i < len; i++) {
                document.cookie = keys[i] + '=; max-age=0';
                cookie = {};
                keys = [];
                this.length = 0
            }
        }
    }
}
```

## 应用程序存储

##### 缓存的更新
```js
//显示其默认状态消息并打印
function status(msg) {
    document.getElementById('statusline').innerHTML = msg;
    console.log(msg);
}

//总是触发"checking"事件
window.applicationCache.onchecking = function () {
    status('checking for a new version');
    return false;
};
//如果清单文件没有改动，同时应用程序也已经缓存了，触发"onupdata"事件
window.applicationCache.onupdate = function () {
    status('this version is up to date');
    return false;
};
//还未缓存的或者清单有改动的，会下载并缓存所有资源,触发"downloading"事件,进行下载
window.applicationCache.ondownloading = function () {
    status('downloading new version');
    window.progresscount = 0;
    return false;
};
//在下载时触发"progress"事件
window.applicationCache.onprogress = function (e) {
    var progress = '';
    if (e && e.lengthComputable) {
        progress = '' + Math.round(100 * e.loaded / e.total) + '%';
    } else {
        progress = "(" + (++progresscount) + ')';
    }

    status('downloading new version' + progress);
    return false;
};
//下载完成后且首次将应用程序下载大缓存中时，触发"cached"事件
window.applicationCache.oncache = function () {
    status('this application is now cached locally');
    return false;
};
//下载完成并且应用程序更新后触发"updateready"事件，但依然可以看到老版本的应用程序
window.applicationCache.onupdateready = function () {
    status('a new version has been downloaded. Reload to run it');
    return false;
};
//浏览器处于离线状态，检查清单列表失败时，触发"error"事件，当一个未缓存的应用程序引用不存在的清单文件时也会触发此事件
window.applicationCache.onerror = function () {
    status('count not load manifest or cache application');
    return false;
};
//当一个缓存的应用程序引用不存在的清单文件时,触发"obsolete"事件，同时将应用从缓存中移除,之后将会通过网络加载资源
window.applicationCache.onobsolete = function () {
    status('this application is no longer cached, Reload from network');
    return false;
};
```

## 离线WEB应用

离线WEB应用:"PermaNode"————一个简单的记事本程序，用于将用户的文本保存到localStorage中

在网络连接时可上传至服务器，文件中包含了其他文件

使用url实现在服务端笔记数据
* pernanote.appcache
```ruby
CACHE MANIFEST
# PermaNote v8
permanote.html
permanote.js
NETWORK:
note
```
* pernanote.js
```js
var editor, statusline, savebutton, idletimer;

window.onload = function () {
    // 第一次载入初始化
    if (localStorage.note == null) localStorage.note = "";
    if (localStorage.lastModified == null) localStorage.lastModified = 0;
    if (localStorage.lastSaved == null) localStorage.lastSaved = 0;

    //查找编辑器UI元素并初始化
    editor = document.getElementById("editor");
    statusline = document.getElementById("statusline");
    savebutton = document.getElementById("savebutton");

    editor.value = localStorage.note; //初始化编辑器，保存数据
    editor.disabled = true;           //同步前禁止编辑

    // 文本去有内容输入时
    editor.addEventListener("input",
        function (e) {
            // 将值保存到localStorage
            localStorage.note = editor.value;
            localStorage.lastModified = Date.now();
            // 重置闲置计时器
            if (idletimer) clearTimeout(idletimer);
            idletimer = setTimeout(save, 5000);
            // 启动保存按钮
            savebutton.disabled = false;
        },
        false);
    //启动时草去同步服务器
    sync();
};

// 离开时保存数据到服务器
window.onbeforeunload = function () {
    if (localStorage.lastModified > localStorage.lastSaved)
        save();
};

// 离线时通知用户
window.onoffline = function () {
    status("Offline");
}

// 连线时
window.ononline = function () {
    sync();
};

//有新版本时提醒用户， 也可使用location.reload()方法强制载入
window.applicationCache.onupdateready = function () {
    status("A new version of this application is available. Reload to run it");
};

//么有新版本时也通知用户
window.applicationCache.onnoupdate = function () {
    status("You are running the latest version of the application.");
};

//在状态栏显示消息的函数
function status(msg) {
    statusline.innerHTML = msg;
}

//笔记更新超过5分钟自动上传服务器
function save() {
    if (idletimer) clearTimeout(idletimer);
    idletimer = null;

    if (navigator.onLine) {
        var xhr = new XMLHttpRequest();
        xhr.open("PUT", "/note");
        xhr.send(editor.value);
        xhr.onload = function () {
            localStorage.lastSaved = Date.now();
            savebutton.disabled = true;
        };
    }
}

//检查服务端是否有新版本，没有就保存当前版本
function sync() {
    if (navigator.onLine) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "/note");
        xhr.send();
        xhr.onload = function () {
            var remoteModTime = 0;
            if (xhr.status == 200) {
                var remoteModTime = xhr.getResponseHeader("Last-Modified");
                remoteModTime = new Date(remoteModTime).getTime();
            }

            if (remoteModTime > localStorage.lastModified) {
                status("Newer note found on server.");
                var useit =
                    confirm("There is a newer version of the note\n" +
                        "on the server. Click Ok to use that version\n" +
                        "or click Cancel to continue editing this\n" +
                        "version and overwrite the server");
                var now = Date.now();
                if (useit) {
                    editor.value = localStorage.note = xhr.responseText;
                    localStorage.lastSaved = now;
                    status("Newest version downloaded.");
                }
                else
                    status("Ignoring newer version of the note.");
                localStorage.lastModified = now;
            }
            else
                status("You are editing the current version of the note.");

            if (localStorage.lastModified > localStorage.lastSaved) {
                save();
            }

            editor.disabled = false;
            editor.focus();             //再次启动时
        }
    }
    else {                              //离线状态下不可同步
        status("Can't sync while offline");
        editor.disabled = false;
        editor.focus();
    }
}
```
[Demo](https://beats0.github.io/js-practice/JavaScript_TheDefinitiveGuide/%E5%AE%A2%E6%88%B7%E7%AB%AF%E5%AD%98%E5%82%A8/permanote.html)
