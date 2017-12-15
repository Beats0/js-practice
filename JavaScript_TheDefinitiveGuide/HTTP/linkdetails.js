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