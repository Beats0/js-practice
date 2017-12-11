### Ajax
*JAX 在浏览器与 Web 服务器之间使用异步数据传输（HTTP 请求），这样就可使网页从服务器请求少量的信息，而不是整个页面。*
#### Ajax支持性
```js
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
```js
if (window.XMLHttpRequest) {
    var xhr=XMLHttpRequest();
}
else {
    var xhr=new ActiveXObject("Microsoft.XMLHTTP");
}
```
#### 发送
[Demo](https://beats0.github.io/js-practice/chapter/Ajax/)
```js
function createXHR() {
        if(typeof XMLHttpRequest != "undefined"){
            return new XMLHttpRequest();
        }else if (typeof ActiveXObject != "undefined"){
            if(typeof arguments.callee.activeXString != "string"){
                var version = [ "MSXML2.XMLHttp.6.0","MSXML2.XMLHttp.3.0","MSXML2.XMLHttp"],
                    i,len;
                for (i=0,len=versions.length; i<len;i++){
                    try{
                        new ActiveXObject(versions[i]);
                        arguments.callee.activeXString = versions[i];
                        break;
                    }catch(ex){
                    }
                }
            }return new ActiveXObject(arguments.callee.activeXString);
        }else{
            throw new Error("No XHR object available.");
        }
    }
    var xhr1 = createXHR();
    //如果你不用支持IE7以前的版本，直接使用下面方式来创建XHR对象即可
    var xhr = new XMLHttpRequest();

xhr.open("get", "example", false);
xhr.send(null);
//example即为想要发送的xhr
```

#### 检查响应状态(注意不能太过依赖)
```js
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
```js
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
```js
xhr.setRequestHeader("MyHeader","MyValue");


var myHeader = xhr.getResponseHeader("MyHeader");
var allHeader = xhr.getAllResponseHeaders();

```

#### GET请求
```js
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
```js
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
```php
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
```js
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
```js
function handleResponse(response) {
    alert("Your IP address" + response.ip + "which is in" + response.city + "," + response.region_name);
}

var script = document.createElement("script");
script.src = "http://freegeoip.net/json/?callback=handleResponse";
document.body.insertBefore(script.body.firstChild);
```

#### Comet 推送事件
*Comet通过监听readystatechange事件或者检测readyState值是否为3*
```js
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

#### Fetch API
Fetch API 参考自[阮一峰JavaScript标准参考-Ajax-Fetch API](http://javascript.ruanyifeng.com/bom/ajax.html#toc27)
Fetch API是一种新规范，用来取代XMLHttpRequest对象。它主要有两个特点，一是接口合理化，Ajax是将所有不同性质的接口都放在XHR对象上，而Fetch是将它们分散在几个不同的对象上，设计更合理；二是Fetch操作返回Promise对象，避免了嵌套的回调函数。

下面的代码检查浏览器是否部署了Fetch API。
```js
if ("fetch" in window){
  // 支持
} else {
  // 不支持
}
```
下面是一个Fetch API的简单例子。
```js
fetch(url).then(function (response) {
  return response.json();
}).then(function (jsonData) {
  console.log(jsonData);
}).catch(function () {
  console.log('出错了');
});
```
上面代码向指定的URL发出请求，得到回应后，将其转为JSON格式，输出到控制台。如果出错，则输出一条提示信息。注意，fetch方法返回的是一个Promise对象。

作为比较，XMLHttpRequest的写法如下。
```js
var xhr = new XMLHttpRequest();
xhr.open('GET', url);
xhr.responseType = 'json';
xhr.onload = function() {
  console.log(xhr.response);
};
xhr.onerror = function() {
  console.log('出错了');
};
xhr.send();
```
#### stream数据流

Fetch API最大的特点是，除了返回Promise对象，还有一点就是数据传送是以数据流（stream）的形式进行的。对于大文件，数据是一段一段得到的。
```js
response.text().then(function (responseText) {
  console.log(responseText);
}
```
上面代码中的text()，其实就是一个数据流读取器，并使用指定格式解读。

Fetch API提供以下五个数据流读取器。
- text()：返回字符串
- json()：返回一个JSON对象
- formData()：返回一个FormData对象
- blob()：返回一个blob对象
- arrayBuffer()：返回一个二进制数组

数据流只能读取一次，一旦读取，数据流就空了。再次读取就不会得到结果。解决方法是在读取之前，先使用.clone()方法，复制一份一模一样的副本。
```js
var url = 'LargeFile.txt';
var progress = 0;
var contentLength = 0;

fetch(url).then(function (response) {
  // 本次请求总的数据长度
  contentLength = response.headers.get('Content-Length');
  var getStream = function (reader) {};
  return getStream(response.body.getReader());
})
.catch(function (error) {
  console.log(error);
});
```
上面代码中，response.body.getReader()返回的就是数据流之中的一段。处理数据流的getStream函数代码如下。
```js
var progress = 0;
var contentLength = 0;

var getStream = function (reader) {
  return reader.read().then(function (result) {
    // 如果数据已经读取完毕，直接返回
    if (result.done) {
      return;
    }

    // 取出本段数据（二进制格式）
    var chunk = result.value;

    var text = '';
    // 假定数据是UTF-8编码，前三字节是数据头，
    // 而且每个字符占据一个字节（即都为英文字符）
    for (var i = 3; i < chunk.byteLength; i++) {
      text += String.fromCharCode(chunk[i]);
    }

    // 将本段数据追加到网页之中
    document.getElementById('content').innerHTML += text;

    // 计算当前进度
    progress += chunk.byteLength;
    console.log(((progress / contentLength) * 100) + '%');

    // 递归处理下一段数据
    return getStream(reader);
  };
};
```
上面这样的数据流处理，可以提高网站性能表现，减少内存占用，对于请求大文件或者网速慢的场景相当有用。传统的XMLHTTPRequest对象不支持数据流，所有的数据必须放在缓存里，等到全部拿到后，再一次性吐出来。

#### fetch()

fetch方法的第一个参数可以是URL字符串，也可以是后文要讲到的Request对象实例。Fetch方法返回一个Promise对象，并将一个response对象传给回调函数。

response对象有一个ok属性，如果返回的状态码在200到299之间（即请求成功），这个属性为true，否则为false。因此，判断请求是否成功的代码可以写成下面这样。
```js
fetch('./api/some.json').then(function (response) {
  if (response.ok) {
    response.json().then(function (data) {
      console.log(data);
    });
  } else {
    console.log('请求失败，状态码为', response.status);
  }
}, function(err) {
  console.log('出错：', err);
});
response对象除了json方法，还包含了服务器HTTP回应的元数据。

fetch('users.json').then(function(response) {
  console.log(response.headers.get('Content-Type'));
  console.log(response.headers.get('Date'));
  console.log(response.status);
  console.log(response.statusText);
  console.log(response.type);
  console.log(response.url);
});
```
上面代码中，response对象有很多属性，其中的response.type属性比较特别，表示HTTP回应的类型，它有以下三个值。
- basic：正常的同域请求
- cors：CORS机制下的跨域请求
- opaque：非CORS机制下的跨域请求，这时无法读取返回的数据，也无法判断是否请求成功
如果需要在CORS机制下发出跨域请求，需要指明状态。
```js
fetch('http://some-site.com/cors-enabled/some.json', {mode: 'cors'})
  .then(function(response) {
    return response.text();
  })
  .then(function(text) {
    console.log('Request successful', text);
  })
  .catch(function(error) {
    log('Request failed', error)
  });
  ```
除了指定模式，fetch方法的第二个参数还可以用来配置其他值，比如指定cookie连同HTTP请求一起发出。
```js
fetch(url, {
  credentials: 'include'
})
```
发出POST请求的写法如下。
```js
fetch("http://www.example.org/submit.php", {
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  },
  body: "firstName=Nikhil&favColor=blue&password=easytoguess"
}).then(function(res) {
  if (res.ok) {
    console.log("Perfect! Your settings are saved.");
  } else if (res.status == 401) {
    console.log("Oops! You are not authorized.");
  }
}, function(e) {
  console.log("Error submitting form!");
});
```
目前，还有一些XMLHttpRequest对象可以做到，但是Fetch API还没做到的地方，比如中途中断HTTP请求，以及获取HTTP请求的进度。这些不足与Fetch返回的是Promise对象有关。