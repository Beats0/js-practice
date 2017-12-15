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