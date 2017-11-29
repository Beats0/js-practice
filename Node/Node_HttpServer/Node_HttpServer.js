//基于Node的Http服务器
//一个简单的Node Http服务器，能处理当前目录文件
//实现两种特殊的URL用于测试
//http://localhost:8080

//加载模块
var http = require('http');
var fs = require('fs');
var server = new http.Server();
server.listen(8080);

//Node on()方法注册事件处理程序
//得到新请求时使用函数处理
server.on("request", function (request, response) {
    //解析URL
    var url = require('url').parse(request.url);

    //用于模拟缓慢的网络连接
    if (url.pathname === "/test/delay") {
        var delay = parseInt(url.query) || 2000;
        //设置状态码和头
        response.writeHead(200, {"Content-Type": "text/plain;charset=UTF-8"});
        //开始编写响应主体
        response.write("Sleeping for" + delay + "milliseconds...");
        //在之后调用另一个函数完成响应
        setTimeout(function () {
            response.write("done.");
            response.end();
        }, delay);
    }
    //如果请求的是'/test/mirror',则原文返回
    else if (url.pathname === "/text/mirr]or") {
        response.writeHead(200, {"Content-Type": "text/plain;charset=UTF-8"});
        response.write(request.method + "" + request.url + "HTTP/" + request.httpVersion + "\r\n");
        //所用请求头
        for (var h in request.headers) {
            response.write(h + ":" + request.headers[h] + "\r\n");
        }
        response.write("\r\n");         //使用额外的空白行结束头
        //函数中完成响应
        //请求数据块完成时，将其写入响应中
        request.on("data", function (chunk) {
            response.write(chunk);
        });
        //请求完成，响应结束
        request.on("end", function (chunk) {
            response.end();
        });
    }
    //否则处理来自本地目录的文件
    else {
        //获取本地文件名，基于其拓展名推测内容类型
        var filename = url.pathname.substring(1);
        var type;
        switch (filename.substring(filename.lastIndexOf(".") + 1)) {
            case "html":
            case "htm":
                type = "text/html;charset=UTF-8";
                break;
            case "js":
                type = "application/javascript;charset=UTF-8";
                break;
            case "css":
                type = "text/css;charset=UTF-8";
                break;
            case "txt":
                type = "text/plain;charset=UTF-8";
                break;
            case "manifest":
                type = "application;charset=UTF-8";
                break;
        }
        //异步读取文件，将内容作为单独的数据块传给回调函数
        //对于很大的文件，使用API fs.createReadStream()
        fs.readFile(filename, function (err, content) {
            if (err) {                          //无法读取的
                response.writeHead(404, {        //发送404
                    "Content-Type": "text/plain;charset=UTF-8"
                });
                response.write(err.message);    //错误消息主体
                response.end();                 //完成
            }
            else {                              //读取成功的
                response.writeHead(200, {"Content-Type": type});  //设置状态码和MIME类型
                response.write(content);        //将文件内容作为响应主体发送
                response.end();                 //完成
            }
        });
    }
});
