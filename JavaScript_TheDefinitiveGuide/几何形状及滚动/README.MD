### 几何形状及滚动
##### 查询窗口滚动条的位置
```js
function getScrollOffsets(w) {
    //指定窗口，默认当前窗口
    w = w || window;
    //除IE8以外的
    if (w.pageXOffset != null)
        return {
            x: w.pageXOffset,
            y: w.pageYOffset
        };
    //标准浏览器
    var d = w.document;
    if (document.compatMode == "CSS1Compat")
        return {
            x: d.documentElement.scrollLeft,
            y: d.documentElement.scrollTop
        };
    //怪异模式下的浏览器
    return {
        x: d.body.scrollLeft,
        y: d.body.scrollTop
    };
}
```
##### 查询窗口视图大小
```js
function getViewportSize(w) {
    //指定窗口，默认当前窗口
    w = w || window;
    //除IE8以外的
    if (w.innerWidth != null)
        return {
            w: w.innerWidth,
            h: w.innerHeight
        };
    //标准浏览器
    var d = w.document;
    if (document.compatMode == "CSS1Compat")
        return {
            w: d.documentElement.clientWidth,
            h: d.documentElement.clientHeight
        };
    //怪异模式下的浏览器
    return {
        w: d.body.clientWidth,
        h: d.body.clientHeight
    };
}
```
##### 查询元素的几何尺寸
```js
var box = e.getBoundingClientRect();
var w = box.width || (box.right - box.left);
var h = box.height || (box.bottom - box.top);
```
##### 滚动
```js
var docunmentHeight=document.documentElement.offsetHeight;
var viewportHeight=window.innerHeight;
window.scrollTo(0,docunmentHeight-viewportHeight);
javascript:void setInterval(function () {
    scrollBy(0,10)
},200);
```