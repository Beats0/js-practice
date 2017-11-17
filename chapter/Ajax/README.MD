### Ajax
*JAX 在浏览器与 Web 服务器之间使用异步数据传输（HTTP 请求），这样就可使网页从服务器请求少量的信息，而不是整个页面。*
#### Ajax支持性
```
    function ajaxFunction() {
        var xmlHttp;
        try {
            // Firefox, Opera 8.0+, Safari
            xmlHttp = new XMLHttpRequest();
        }
        catch (e) {
            // Internet Explorer
            try {
                xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
            }
            catch (e) {
                try {
                    xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
                }
                catch (e) {
                    alert("您的浏览器不支持AJAX！");
                    return false;
                }
            }
        }
    }
```

#### 兼容性
```
if (window.XMLHttpRequest) {
    var xhr=XMLHttpRequest();
}
else {
    var xhr=new ActiveXObject("Microsoft.XMLHTTP");
}
```
#### 发送
```
xhr.open("get", "example", false);
xhr.send(null);
```

#### 检查响应状态(注意不能太过依赖)
```
if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
    alert(xhr.responseText);
} else {
    alert("Request was unsuccessful:" + xhr.status);
}
```

#### readyState 属性

状态 | 描述 |
-----|-----|
0 |请求未初始化（在调用 open() 之前）
1 |请求已提出，已经调用 open()，调用 send() 之前
2 |请求已发送，已经调用send()（这里通常可以从响应得到内容头部）
3 |请求处理中（响应中通常有部分数据可用，但是服务器还没有完成响应）
4 |请求已完成（可以访问服务器响应并使用它）

#### 一般是使用第4阶段
```
var xhr=createXHR();
xhr.onreadystatechange=function () {
    if (xhr.readyState == 4) {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
            alert(xhr.responseText);
        } else {
            alert("Request was unsuccessful:" + xhr.status);
        }
    }
};
xhr.open("get","example",true);
xhr.send(null);
```
#### http头部信息
```
xhr.setRequestHeader("MyHeader","MyValue");


var myHeader = xhr.getResponseHeader("MyHeader");
var allHeader = xhr.getAllResponseHeaders();

```

#### GET请求
```
xhr.open("get", "example.php?name1=value1&name2=value2", true);

function addURLparam(url, name, value) {
    url += (url.indexOf("?") == -1 ? "?" : "&");
    url = +encodeURIComponent(name) + "=" + encodeURIComponent(value);
    return url;
}
// 构建
var url = "example.php";
//添加参数
url = addURLparam(url, "name", "Nicholas");
url = addURLparam(url, "bool", "JavaScript");
//初始化请求
xhr.open("get", url, false);
```

#### POST请求
```
function submitData() {
    var xhr = createXHR();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                alert(xhr.responseText);
            } else {
                alert("Request was unsuccessful:" + xhr.status);
            }
        }
    };

    xhr.open("post", "post.php", true)
    xhr.setRequestHeader("Content-Type", "application/x-wwww-form-urlencoded");
    var form = document.getElementById("user-info");
    xhr.send(serialize(form));
}
```
PHP文件：
```
<?php
    header("Content-Type:text/plain");
    echo<<<EOF
Name:{$_POST['user-name']}
Email:{$_POST['user-email']}
EOF;
?>
```

### XMLHttpRequest 2级

1. FormData()表单数据序列化
```
var data = new FormData(document.forms[0]);
//send()方法
var xhr = createXHR();
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
            alert(xhr.responseText);
        } else {
            alert("Request was unsuccessful:" + xhr.status);
        }
    }
};
xhr.open("post", "post.php", true);
var form = document.getElementById("user-info");
xhr.send(new FormData(form));
```

2. 超时设定

3. overrideMimeType()重写XHR响应MIME类型

4. 进度事件

状态 | 描述 |
-----|-----|
loadstart       |在接受响应数据的第一个字节时触发
progress        |在接受响应期间不断触发
error           |错误时触发
abort           |调用abort()方法时触发
load            |在接受完整响应数据时触发
loadend         |在通信完成或触发error、abort或load事件后触发

5. 跨浏览器CORS

6. 图像PING

7. JSONP 跨域调用
*例如通过地理位置查询ip*
```
function handleResponse(response) {
    alert("Your IP address" + response.ip + "which is in" + response.city + "," + response.region_name);
}

var script = document.createElement("script");
script.src = "http://freegeoip.net/json/?callback=handleResponse";
document.body.insertBefore(script.body.firstChild);
```

#### Comet 推送事件
*Comet通过监听readystatechange事件或者检测readyState值是否为3*
```
function crearteStreamingClient(url, progress, finished) {
    var xhr = new XMLHttpRequest(),
        received = 0;

    xhr.open("get", url, true);
    xhr.onreadystatechange = function () {
        var result;
        if (xhr.readyState == 3) {
            //只获得最新数据并调整计数器
            result = xhr.responseText.substring(received);
            received += result.length;

            //调用progress回调函数
            progress(result);
        } else if (xhr.readyState == 4) {
            finished(xhr.responseText);
        }
    };
    xhr.send(null);
    return xhr;
}

var client = crearteStreamingClient("streaming.php", function (data) {
    alert("Received:" + data);
}, function (data) {
    alert("Done!");
});
```

#### Comet 推送事件

#### SSE 发送事件

#### Web Sockets 全双工、双向通信
*Web Sockets的加密协议不是`http://`,而是`ws://`,加密方式不是`https://`,而是`wss://`*

#### 安全性