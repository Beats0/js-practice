// //兼容
// if (window.XMLHttpRequest) {
//     var xhr = XMLHttpRequest();
// }
// else {
//     var xhr = new ActiveXObject("Microsoft.XMLHTTP");
// }

//发送
xhr.open("get", "example", false);
xhr.send(null);

// //检查响应状态(注意不能太过依赖)
// if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
//     alert(xhr.responseText);
// } else {
//     alert("Request was unsuccessful:" + xhr.status);
// }


//一般是使用第4阶段
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
xhr.open("get", "example", true);
xhr.setRequestHeader("MyHeader", "MyValue");
xhr.send(null);

var myHeader = xhr.getResponseHeader("MyHeader");
var allHeader = xhr.getAllResponseHeaders();


//GET请求
xhr.open("get", "example.php?name1=value1&name2=value2", true);

function addURLparam(url, name, value) {
    url += (url.indexOf("?") == -1 ? "?" : "&");    //检查问号，没有就添加"?"，否则添加"&"
    url = +encodeURIComponent(name) + "=" + encodeURIComponent(value);
    return url;
}

//构建
var url = "example.php";
//添加参数
url = addURLparam(url, "name", "Nicholas");
url = addURLparam(url, "bool", "JavaScript");
//初始化请求
xhr.open("get", url, false);

//POST请求
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

    xhr.open("post", "post.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-wwww-form-urlencoded");
    var form = document.getElementById("user-info");
    xhr.send(serialize(form));
}

{/*<?php*/
}
{/*header("Content-Type:text/plain");*/
}
{/*echo<<<EOF*/
}
{/*Name:{$_POST['user-name']}*/
}
{/*Email:{$_POST['user-email']}*/
}
{/*EOF;*/
}
{/*?>*/
}

// 1.FormData()表单数据序列化
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


// 2.超时设定

// 3.overrideMimeType()重写XHR响应MIME类型

// 4.进度事件


// 5. 跨浏览器CORS
//
// 6. 图像PING
//
// 7. JSONP
//例如通过地理位置查询ip
function handleResponse(response) {
    alert("Your IP address" + response.ip + "which is in" + response.city + "," + response.region_name);
}

var script = document.createElement("script");
script.src = "http://freegeoip.net/json/?callback=handleResponse";
document.body.insertBefore(script.body.firstChild);

//Comet 推送事件

//SSE 发送事件

//Web Sockets 全双工、双向通信
//Web Sockets的加密协议不是http://,而是ws://,加密方式不是https://,而是wss://

//安全性




