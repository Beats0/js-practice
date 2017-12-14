//whenReady()
var whenReady = (function () {
    var funcs = [];
    var ready = false;

    //文档就绪时，调用事件处理程序
    function handler(e) {
        if (ready) return;      //如果运行过一次就只需返回
        //发生readystatechange事件
        if (e.type === "readystatechange" && document.readyState !== "complete")
            return;
        //运行所有注册函数
        //每次计算funcs.length,防止调用导致注册更多函数
        for (var i = 0; i < funcs.length; i++) {
            funcs[i].call(document);
        }
        ready = true;
        funcs = null;
    }

    if (document.addEventListener) {
        document.addEventListener("DOMContentLoaded", handler, false);
        document.addEventListener("readystatechange", handler, false);
        window.addEventListener("load", handler, false);
    } else if (document.attachEvent) {
        document.attachEvent("onreadystatechange", handler);
        window.attachEvent("onload", handler);
    }
    //返回whenReady()函数
    return function whenReady(f) {
        if (ready) f.call(document);        //准备完毕调用
        else funcs.push(f);                 //否则加入队列等待
    }
}());

//使用HTTP post请求上传文件
/**
 * 查找有data-upload属性的全部<input type="file">元素
 * 注册onchange事件处理程序
 * 选择文件时自动生成通过POST方法发送到自定"upload" 的URL，服务器响应忽略
 * **/
var elts = document.getElementsByTagName("input");
for (var i = 0; i < elts.length; i++) {
    var input = elts[i];
    if (input.type !== "file") {
        continue;
    }
    var url = input.getAttribute("data-uploadto");//获取上传url
    if (!url) {                                   //跳过没有url的
        continue;
    }
    input.addEventListener("change", function () {//选择文件时
        var file = this.files[0];                 //单个文件
        if (!file) {                              //没有文件
            return;
        }
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url);                    //向url发送post请求
        xhr.send(file);                           //将文件作为主体发送
    }, false);
}

//使用POST方法发送multipart/form-data请求
function postFormData(url, data, callback) {
    if (typeof FormData === "undefined") {
        throw new Error("FormData is not implemented");
    }
    var request = new XMLHttpRequest();             //Http请求
    request.open("POST", url);                      //向url发送post请求
    request.onreadystatechange = function () {
        if (request.readyState === 4 && callback) {//回调函数
            callback(request);
        }
    };
    var formdata = new FormData();
    for (var name in data) {
        if (!data.hasOwnProperty(name)) {           //跳过继承属性
            continue;
        }
        var value = data[name];
        if (typeof value === "function") continue;  //跳过方法
        formdata.append(name, value);
    }
    request.send(formdata);                         //当出入FormData队形时sent()会自动设置Content-Type头
}

//HTTP上传进度事件
// 查找所有含有"fileDropTarget"类的元素
//并注册DnD事件处理程序使它们能响应文件的拖放
//当文件放下时，上传它们到data-uploadto属性指定的URL
whenReady(function () {
    var elts = document.getElementsByClassName("fileDropTarget");
    for (var i = 0; i < elts.length; i++) {
        var target = elts[i];
        var url = target.getAttribute("data-uploadto");
        if (!url) continue;
        createFileUploadDropTarget(target, url);
    }

    function createFileUploadDropTarget(target, url) {
        //跟踪当前是否正在上传，因此我们能拒绝放下
        //我们可以处理多个并发上传
        //但对这个例子使用进度通知太困难了
        var uploading = false;
        console.log(target, url);
        target.ondragenter = function (e) {
            console.log("dragenter");
            if (uploading) return;
            var types = e.dataTransfer.types;
            if (types &&
                ((types.contains && types.contains("Files")) ||
                    (types.indexOf && types.indexOf("Files") !== -1))) {
                target.classList.add("wantdrop");
                return false;
            }
        };
        target.ondragover = function (e) {
            if (!uploading) return false;
        };
        target.ondragleave = function (e) {
            if (!uploading)
                target.classList.remove("wantdrop");
        };
        target.ondrop = function (e) {
            if (uploading) return false;
            var files = e.dataTransfer.files;
            if (files && files.length) {
                uploading = true;
                var message = "Uploading files:<ul>";
                for (var i = 0; i < files.length; i++) {
                    message += "<li>" + files[i].name + "</li>";
                }
                message += "</ul>";
                target.innerHTML = message;
                target.classList.remove("wantdrop");
                target.classList.add("uploading");
                var xhr = new XMLHttpRequest();
                xhr.open("OPST", url);
                var body = new FormData();
                for (var i = 0; i < files.length; i++) {
                    body.append(i, files[i]);
                }
                xhr.upload.onprogress = function (e) {
                    if (e.lengthComputable) {
                        target.innerHTML = message +
                            Math.round(e.loaded / e.total * 100) +
                            "% Complete";
                    }
                };
                xhr.upload.onload = function (e) {
                    uploading = false;
                    target.classList.remove("uploading");
                    target.innerHTML = "Drop files to upload";
                };
                xhr.send(body);
            }
            target.classList.remove("wantdrop");
        }
    }
})

//超时
/*发起HTTP GET请求获取指定URL的内容
*如果响应成功到达，传入responseText给回调函数
*如果响应在timeout毫秒内没有到达，终止这个请求
*浏览器可能在abort()后触发"readystatechange"
*如果是部分请求结果到达，甚至可能设置status属性
*所以需要设置一个标记，当部分且超时的响应到达时不会调用回调函数
*如果使用load事件就没有这个风险
**/
function timedGetText(url, timeout, callback) {
    var request = new XMLHttpRequest();
    var timedout = false;
    var timer = setTimeout(function () {
        timedout = true;
        request.abort();
    }, timeout);
    request.open("GET", url);
    request.onreadystatechange = function () {
        if (request.readyState !== 4) return;
        if (timedout) return;
        clearTimeout(timer);
        if (request.status == 200) {
            callback(request.responseText);
        }
    };
    request.send();
}