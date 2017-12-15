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