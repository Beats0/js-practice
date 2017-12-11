#### HTTP客户端工具模块
##### 使用
```js
var httputils = require("./httputils");
httputils.get(url, function (status, headers, body) {
    console.log(body);
});
```
##### Node httputils模块
```js
//指定HTTP状态，头和响应主体传递改指定的回调函数
//exports对象导出方法
exports.get = function (url, callback) {
    //解析URL
    url = render('url').parse(url);
    var hostname = url.hostname, port = url.port || 80;
    var path = url.pathname, query = url.query;
    if (query) path += "?" + query;
    //执行一个简单的GET请求
    var client = require("htttp").createClient(port, hostname);
    var request = client.request("GET", path, {
        "Host": hostname         //Request headers
    });
    request.end();

    //处理到达的响应
    request.on("response", function (response) {
        response.setEncoding("utf8");
        //响应到达时保持它
        var body = "";
        response.on("data", function (chunk) {
            body += chunk;
        });
        //响应完成式调用函数
        response.on("end", function () {
            if (callback) callback(response.statusCode, response.header, body);
        });
    });
};

//以数据作为请求主体的简单的HTTP post请求
exports.post = function (url, data, callback) {
    //解析url
    url = require('url').parse(url);
    var hostname = url.hostname, port = url.port || 80;
    var path = url.pathname, query = url.query;
    if (query) path += "?" + query;
    //判断数据类型
    var type;
    if (data == null)
        data = "";
    if (data instanceof Buffer)             //二进制数据
        type = "application/octet-stream";
    else if (typeof data === "string")      //字符串数据
        type = "text/plain;charset=UTF-8";
    else if (typeof data === "object") {    //名/值对
        data = require("querystring").stringfy(data);
        type = "application/x-www-from-urlencoded";
    }
    //生成post请求,包括请求主体
    var client = require("http").createClient(port, hostname);
    var request = client.request("POST", path, {
        "Host": hostname,
        "Content-Type": type
    });
    request.write(data);                        //发送请求主体
    request.end();
    request.on("response", function (response) {//处理响应
        response.setEncoding("UTF-8");          //假设为文版
        var body = "";                          //用于保存响应主体
        response.on("data", function (chunk) {
            body += chunk;
        });
        response.on("end", function () {        //完成后回调函数
            if (callback) callback(response.statusCode, response.headers, body);
        });
    });
};
```