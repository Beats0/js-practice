## HTML5 API
* [地理位置](#地理位置)
* [历史记录管理](#历史记录管理)
* [跨域消息传递](#跨域消息传递)
* [Web Worker](#web-worker)
* [类型化数组与Array Buffer](#类型化数组与array-buffer)
* [Blob](#blob)
* [文件系统API](#文件系统api)
* [客户端数据库](#客户端数据库)
* [Web嵌套字节](#web嵌套字节)

#### 地理位置
#### 历史记录管理
```js
//使用popState方法管理历史记录，前进后退将保留记录并打印
    window.onload = newgame;
    window.onpopstate = popState;
    var state, ui;

    function newgame(playagain) {            //初始游戏
        playagain ? true : false;
        //console.log(playagain);
        ui = {
            heading: null,
            prompt: null,
            input: null,
            low: null,
            mid: null,
            high: null
        };
        for (id in ui) ui[id] = document.getElementById(id);
        ui.input.onchange = handleGuess;

        state = {                           //数字随机，初始游戏状态
            n: Math.floor(Math.random() * 99 + 1),
            low: 0,
            high: 100,
            guesstimes: 0,
            guess: undefined                //最后一次时
        };
        display(state);                     //修改文档内容显示该初始状态
        /**
         * 此函数将作为onload事件处理调用，play again也会再调用
         * 在第二种情况下play again === true，保存
         * 但如果作为load事件则不会保存，进行历史管理将会覆盖真正的历史记录
         * 所以等待popstate事件而不是直接进行状态保存，提供对象，使用replaceState()方法并保存状态
         *
         * */
        if (playagain === true) save(state);
    }

    function save(state) {              //如果支持的话使用pushState()方法
        if (!history.pushState) return;
        var url = "#guess" + state.guessnum;
        history.pushState(state, "", url);//保存状态，标题，url
    }

    function popState(event) {          //恢复历史状态
        if (event.state) {
            console.log(event);         //打印历史状态信息
            state = event.state;        //恢复历史状态
            display(state);
        }
        else {
            history.replaceState(state, "", "#guess" + state.guessnum);
        }
    }

    function handleGuess() {            //每次输入数字时调用，更新，保存，显示状态
        var g = parseInt(this.value);
        if ((g > state.low) && (g < state.high)) {
            if (g < state.n) state.low = g;
            else if (g > state.n) state.high = g;
            state.guess = g;
            state.guesstimes++;
            save(state);
            display(state);
        } else {
            alert("Please enter a number greater than" + state.low + "and less than" + state.high);//无效的不保存
        }
    }

    function display(state) {           //修改文档显示当前状态
        ui.heading.innerHTML = "I'm thinking a number between" + state.low + "and" + state.high;
        ui.low.style.width = state.low + "%";
        ui.mid.style.width = state.high - state.low + "%";
        ui.high.style.width = (100 - state.high) + "%";
        ui.input.style.visibility = "visible";
        ui.input.value = "";
        ui.input.focus();

        if (state.guess === undefined) {//提示
            ui.prompt.innerHTML = "请输入一个数字";
        }
        else if (state.guess < state.n) {
            ui.prompt.innerHTML = "太小";
        }
        else if (state.guess > state.n) {
            ui.prompt.innerHTML = "太大";
        } else {
            ui.input.style.visibility = "hidden";
            ui.heading.innerHTML = "正确";
            ui.prompt.innerHTML = "恭喜你<button onclick='newgame(true)'>Play again</button>";
        }
    }
```
[Demo popState](https://beats0.github.io/js-practice/JavaScript_TheDefinitiveGuide/API/pushState.html)

#### 跨域消息传递
可使用`postMessage( )`方法

Twitter搜索,将它通过iframe的形式嵌入在任何web页面,通过postMEssage()方法将查询字符串传递给它来搜索
```js
if (window.addEventListener)            //兼容性管理
            window.addEventListener("message", handleMessage, false);
        else
            window.attachEvent("onmessage", handleMessage);

        function handleMessage(e) {
            /**
             * 不在意消息来源，愿意接受任何来源的Twitter搜索结果
             * 但消息源自其内嵌的窗口
             * 使用JQuery的getJson()工具函数
             */
            if (e.source !== window.parent) return;
            var searchterm = e.data; //  获取搜索内容
            jQuery.getJSON("http://search.twitter.com/search.json?callback=?", {q: searchterm},
                function (data) {   //  使用请求结果调用
                    var tweets = data.results;
                    //  构造一个HTML文档来显示搜索结果
                    var escaped = searchterm.replace("<", "&lt;");
                    var html = "<h2>" + escaped + "</h2>";
                    if (tweets.length == 0) {
                        html += "No tweets found";
                    }
                    else {
                        html += "<dl>";
                        for (var i = 0; i < tweets.length; i++) {
                            var tweet = tweets[i];
                            var text = tweet.text;
                            var from = tweet.from_user;
                            var tweeturl = "http://twitter.com/#!/" +
                                from + "/status/" + tweet.id_str;
                            html += "<dt><a target='_blank' href='" +
                                tweeturl + "'>" + tweet.from_user +
                                "</a></dt><dd><dd>" + tweet.text + "</dd>";
                        }
                        html += "</dl>";
                    }
                    //  设置<iframe>文档
                    document.body.innerHTML = html;
                }
            );
        }
        $(function () {
            window.parent.postMessage("Twitter Search v0.1", "*");
        });
```
[Demo TwitterSeatch](https://beats0.github.io/js-practice/JavaScript_TheDefinitiveGuide/API/TwitterSearch.html)

#### Web Worker
 - Web Worker无法访问DOM节点；
 - Web Worker无法访问全局变量或是全局函数；
 - Web Worker无法调用alert()或者confirm之类的函数；
 - Web Worker无法访问window、document之类的浏览器全局变量；

Web Worker中的Javascript依然可以使用setTimeout(),setInterval()之类的函数，也可以使用XMLHttpRequest对象来做Ajax通信。

专用线程dedicated web worker，以及共享线程shared web worker。 Dedicated web worker随当前页面的关闭而结束；这意味着Dedicated web worker只能被创建它的页面访问。与之相对应的Shared web worker可以被多个页面访问。在Javascript代码中，“Work”类型代表Dedicated web worker，而“SharedWorker”类型代表Shared web worker。

在绝大多数情况下，使用Dedicated web worker就足够了，因为一般来说在web worker中运行的代码是专为当前页面服务的。而在一些特定情况下，web worker可能运行的是更为普遍性的代码，可以为多个页面服务。在这种情况下，我们会创建一个共享线程的Shared web worker，它可以被与之相关联的多个页面访问，只有当所有关联的的页面都关闭的时候，该Shared web worker才会结束。相对Dedicated web worker，shared web worker稍微复杂些。

##### Web Worker使用XMLHt:
//在web worker中发起同步XMLHttpRequest
```js
/**
 * 消息是url数组，以字符串形式同步获取每个url指定的内容
 * 并将字符串数组回调回去
 * */
onmessage = function (e) {
    var urls = e.data;      //输入要获取的url
    var contents = [];      //输出url指定内容

    for (var i = 0; i < urls.length; i++) {
        var url = urls[i];
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, false);
        xhr.send();
        if (xhr.status !== 200)
            throw Error(xhr.status + "" + xhr.statusText + ":" + url);
        contents.push(xhr.responseText);    //存储通过url获取得到的内容
    }
    postMessage(contents);                  //将url内容以数组形式传递调回主线程
}
```

#### 类型化数组与Array Buffer
JavaScript类型化数组是一种类似数组的对象，并提供了一种用于访问原始二进制数据的机制。 正如你可能已经知道，Array 存储的对象能动态增多和减少，并且可以存储任何JavaScript值。JavaScript引擎会做一些内部优化，以便对数组的操作可以很快。
 - 缓冲和视图：类型化数组架构
 - 数组缓冲
 - 类型化数组视图
 - 数据视图

使用sieve算法，返回一个小于n的最大素数
```js
function steve(n) {
    var a = new Int8Array(n + 1);           //如果想是合数，则a[x]=1
    var max = Math.floor(Math.sqrt(n));     //因数不能比他大
    var p = 2;                              //2是第一个素数
    while (p < max) {
        for (var i = 2 * p; i <= n; i += p) //将p的倍数都标记为合数
            a[i] = 1;
        while (a[++p]) ;                    //下一个未标记的索引值是函数
        /*empty*/
    }
    while (a[n]) n--;                       //反向循环找到最大的素数
    return n;                               //返回n
}
```

#### Blob

以下选自:[Blod对象的介绍与使用](https://www.cnblogs.com/wangfajing/p/7202139.html?utm_source=itdadao&utm_medium=referral)

`blob对象：`

一个 Blob对象表示一个不可变的, 原始数据的类似文件对象。Blob表示的数据不一定是一个JavaScript原生格式 blob对象本质上是js中的一个对象，里面可以储存大量的二进制编码格式的数据。

`blob对象实际用途：`

 - 分片上传:
 在进行文件上传的时候，因为服务器的限制，会限制每一次上传到服务器的文件大小不会很大，这个时候我们就需要把一个需要上传的文件进行切割，然后分别进行上传到服务器。
```js
var BYTES_PER_CHUNK = 1024 * 1024; // 每个文件切片大小定为1MB .
var blob = document.getElementById("file").files[0];
var slices = Math.ceil(blob.size / BYTES_PER_CHUNK);
var blobs = [];
slices.forEach(function(item, index) {
    blobs.push(blob.slice(index,index + 1));
});
```

- 粘贴图片:
获取剪切板上的数据来进行粘贴的操作。例如通过QQ截图后，需要在网页上进行粘贴操作。
```js
document.addEventListener('paste', function (e) {
    console.info(e);
    var cbd = e.clipboardData;
        var fr = new FileReader();
        var html = '';
        for(var i = 0; i < cbd.items.length; i++) {
            var item = cbd.items[i];
            console.info(item);
            if(item.kind == "file"){
                var blob = item.getAsFile();
                if (blob.size === 0) {
                    return;
                }
                console.info(blob);
                fr.readAsDataURL(blob);
                fr.on<x>load=function(e){
                    var result=document.getElementById("result");
                    //显示文件
                    result.innerHTML='<img src="' + this.result +'" alt="" />';
                }
            }
        }
});
```

##### Blob API
  ![Blob API](https://ws1.sinaimg.cn/large/006nOlwNgy1fmlzxdqohxj30lf0imq6y.jpg)

用Blob显示一个拖放图片的文件及地址(可多选)
```js
var getBlobURL = (window.URL && URL.createObjectURL.bind(URL)) || window.createObjectURL || (window.webkitURL && webkitURL.revokeObjectURL.bind(webkitURL));
var revokeBlobURL = (window.URL && URL.revokeObjectURL.bind(URL)) || (window.webkitURL && webkitURL.revokeObjectURL.bind(webkitURL)) || window.revokeBlobURL;
//拖放
window.onload = function () {
    var droptarget = document.getElementById('droptarget');
    droptarget.ondragenter = function (e) {
        var types = e.dataTransfer.types;
        if (!types || (types.contains && types.contains("Files")) || (types.indexOf && types.indexOf("Files") != -1)) { //是否为文件
            droptarget.classList.add("active");         //高亮显示
            return false;
        }
    };
    //移除时取消
    droptarget.ondragleave = function () {
        droptarget.classList.remove("active");
    };
    //通知浏览器继续发出提醒
    droptarget.ondragover = function (e) {
        return false;
    };
    //放下文件时获取url并显示对应缩略图
    droptarget.ondrop = function (e) {
        var files = e.dataTransfer.files;               //放下文件
        for (var i = 0; i < files.length; i++) {
            var type = files[i].type;
            if (type.substring(0, 6) !== "image/") continue;//不是图片的忽略
            var img = document.createElement('img');    //创建<img>元素
            img.src = getBlobURL(files[i]);             //使用Blob URL
            img.onload = function () {                  //图片载入时
                this.width = 200;                       //调整图片大小并合并
                document.body.appendChild(this);        //添加到文档
                revokeBlobURL(this.src);                //避免内存泄露
                console.log(this.src);                  //打印图片地址
            }
        }
        droptarget.classList.remove("active");
        return false;
    }
};
```
[Demo BlobImage](https://beats0.github.io/js-practice/JavaScript_TheDefinitiveGuide/API/blobURL.html)

参考:
[blueimp/JavaScript-Load-Image](https://github.com/blueimp/JavaScript-Load-Image)

#### 文件系统API
允许web应用对一个私有的文件系统"沙箱"进行读写文件、创建目录、列出目录等操作。

 - 异步文件系统API:[fs.js](https://github.com/Beats0/js-practice/blob/master/JavaScript_TheDefinitiveGuide/API/fs.js)
 - 异步文件系统API:[fs worker.js](https://github.com/Beats0/js-practice/blob/master/JavaScript_TheDefinitiveGuide/API/fsworker.js)

#### 客户端数据库

存储美国邮政编码的IndexDB数据库:

Test:

Zipcode: 12201

City: Albany

[Demo Zipcode](https://beats0.github.io/js-practice/JavaScript_TheDefinitiveGuide/API/Zipcode.html)

#### Web嵌套字节

- WebSocket协议:

为什么还需要另一个协议？WebSocket协议能带来什么好处？

答案很简单，因为 HTTP 协议有一个缺陷：通信只能由客户端发起。

- 参考:

[阮一峰-WebSocket 教程](http://www.ruanyifeng.com/blog/2017/05/websocket.html?utm_source=tuicool&utm_medium=referral)

- 实例:

使用WebSocket和Node的聊天服务器，基于Node，需运行一个WebSocket服务器:https://github.com/miksago/node-websocket-server/

包含:

[WebSocket chart server](https://github.com/Beats0/js-practice/blob/master/JavaScript_TheDefinitiveGuide/API/wschatserver.js)

[WebSocket chart client](https://github.com/Beats0/js-practice/blob/master/JavaScript_TheDefinitiveGuide/API/wschatclient.html)
