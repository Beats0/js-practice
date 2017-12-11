## 文档加载事件
#### whenReady()
```js
//whenReady()作为Document对象函数的方法调用
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
```