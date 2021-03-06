## HTTP
* [HTTP请求编码对象](#http请求编码对象)
* [表单编码数据发起GET请求](#表单编码数据发起get请求)
* [XML编码请求](#xml编码请求)
* [使用HTTP post请求上传文件](#使用http-post请求上传文件)
* [使用POST方法发送multipart/form-data请求](#使用post方法发送multipart或form-data请求)
* [HTTP上传进度事件](#http上传进度事件)
* [超时](#超时)
* [HTTP跨域](#http跨域)
* [linkDetail.js](#linkdetail)
* [getJSONP](#getjsonp)

##### HTTP请求编码对象
```js
//使用application/x-form-urlencoded
function encodeFormData(data) {
    if (!data) return "";       //返回字符串
    var pairs = [];             //保存值对
    for (var name in data) {    //遍历
        if (!data.hasOwnProperty(name)) continue;       //跳过继承属性
        if (typeof  data[name] === "function") continue;//跳过方法
        var value = data[name].toString();              //将值转为字符串
        name = encodeURIComponent(value.replace("20%", "+"));//转编码格式
        value = encodeURIComponent(value.replace("20%", "+"));
        pairs.push(name + "=" + value);     //记住名=值对
    }
    return pairs.join('&');         //返回时使用"&"符号连接
}
```
##### 表单编码数据发起GET请求
```js
function getData(url, data, callback) {
    var request = new XMLHttpRequest();
    request.open("GET", url + "?" + encodeFormData(data));//指定url
    request.onreadystatechange = function () {
        if (request.readyState === 4 && callback) callback;
    };
    request.send(null);             //发送请求
}

//使用Json编码主体发起HTTP post请求
function postJSON(url,data,callback) {
    var request = new XMLHttpRequest();
    request.open("POST",url);                   //指定url
    request.onreadystatechange = function () {  //事件处理
        if (request.readyState===4&&callback)   //完成响应
        callback(request);                      //回调
    };
    request.setRequestHeader("Content-type","application/json");
    request.send(JSON.stringify(data));
}
```
##### XML编码请求

##### 使用HTTP post请求上传文件
```js
/**
 * 查找有data-upload属性的全部`<input type="file">`元素
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
```
##### 使用POST方法发送multipart或form-data请求
```js
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
```

[Demo](https://beats0.github.io/js-practice/JavaScript_TheDefinitiveGuide/HTTP/upload.html)

##### HTTP上传进度事件
```js
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
```
##### 超时
```js
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
```
## HTTP跨域
##### linkDetail
```js
/**
 * linkdetails.js
 * 查询有href但是没有title属性的<a>元素
 * 将这些元素注册onmouseover事件处理，使用HttpRequest Head请求详细信息
 * 将详细信息设置为链接的title属性并显示
 */
var supportsCORS = (new XMLHttpRequest()).withCredentials !== undefined;
var links = document.getElementsByTagName('a');
for (var i = 0; i < links.length; i++) {
    var link = links[i];
    if (!link.href) continue;
    if (link.title) continue;

    //如果是跨域链接
    if (link.host !== location.host || link.protocol !== location.protocol) {
        link.title = "外站链接";
        if (!supportsCORS) continue;
    }
    if (link.addEventListener)
        link.addEventListener("onmouseover", mouseoverHandler, false);
    else link.attachEvent("onmouseover", mouseoverHandler);
}

function mouseoverHandler(e) {
    var link = e.target || e.srcElement;            //<a>元素
    var url = link.href;                            //url
    var req = new XMLHttpRequest();                 //请求
    req.open("HEAD", url);                           //查询头部
    req.onreadystatechange = function () {
        if (req.readyState !== 4) return;
        if (req.status === 200) {
            var type = req.getResponseHeader("Content-Type");
            var size = req.getResponseHeader("Content-Length");
            var date = req.getResponseHeader("Last-Modified");
            link.title = "类型" + type + "\n" + "大小" + size + "\n" + "时间" + date;
        } else {
            //请求失败时
            if (!link.title)
                link.title = "Couldn't fetch details:\n" + req.status + " " + req.statusText;
        }
    };
    req.send(null);
    if (link.removeEventListener)
        link.removeEventListener("mouseover", mouseoverHandler, false);
    else link.detachEvent("onmouseover", onmouseoverHandler);
}
```
##### getJSONP
```js
/*
*指定url发送jsonp
* 把解析到的响应数据传给回调函数
* 在url添加一个名为jsonp的查询参数，用于指定名称
* */
function getJSONP(url, callback) {
    var cbnum = "cb" + getJSONP.counter++;  //每次资政计数器
    var cbname = "getJSONP." + cbnum;       //作为jsonp指定的函数属性

    if (url.indexOf("?") === -1)          //url没有查询部分
        url += "?jsonp=" + cbname;          //作为查询部分添加参数
    else
        url += "&jsonp" + cbname;         //作为新的参数添加它

    //创建script元素发送请求
    var script = document.createElement("script");
    //定义将被脚本执行的回调函数
    getJSONP[cbname] = function (response) {
        try {
            callback(response);         //处理响应数据
        }
        finally {                       //出错时
            delete getJSONP([cbname]);  //移除该元素
            script.parentNode.removeChild(script);
        }
    };
    //HTTP请求
    script.src = url;
    document.body.appendChild(script);
}

getJSONP.counter = 0;                     //创建位移回调函数名称的计数器
```