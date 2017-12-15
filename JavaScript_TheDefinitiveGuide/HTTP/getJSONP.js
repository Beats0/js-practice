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