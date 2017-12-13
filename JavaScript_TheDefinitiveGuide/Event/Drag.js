/**
 * 使用getScrollOffsets()方法
 **/
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

/**
 *拖动文档元素
 *定义了一个drag()函数，用于mousedowm事件吹程序的调用
 *可以兼容ie两种事件
 * 需要使用getScrollOffsets()方法
 * elementToDrag:接收的元素，必须是决定定位元素
 * style.left与style.top值将随拖动而改变
 * event:mousedown事件对象
 **/

function drag(elementToDrag, event) {
    //初始化鼠标位置
    var scroll = getScrollOffsets();
    var startX = event.clientX + scroll.x;
    var startY = event.clientY + scroll.y;

    //在文档坐标下的待拖动的元素的位置，假设它的offsetParent就是文档的body元素
    var origX = elementToDrag.offsetLeft;
    var origY = elementToDrag.offsetTop;

    //计算mousedown事件多喝元素左上角的距离,另存为鼠标移动距离
    var deltaX = startX - origX;
    var deltaY = startY - origY;

    //注册用于响应接着mousedown事件发生的mousemove和mouseup处理程序
    if (document.addEventListener) {   //标准事件,在document对象上注册捕获事件处理程序
        document.addEventListener("mousemove", moveHandler, true);
        document.addEventListener("mouseup", upHandler, true);
    } else if (document.attachEvent) { //IE,通过setCapture()捕获
        elementToDrag.setCapture();
        elementToDrag.attachEvent("onmousemove", moveHandler);
        elementToDrag.attachEvent("onmouseup", upHandler);
        //作为mouseup事件看待鼠标捕获的丢失
        elementToDrag.attachEvent("onlosecapture", upHandler);
    }
    //处理事件
    if (event.stopPropagation) event.stopPropagation(); //标准
    else event.cancelBubble = true;                     //IE

    //阻止任何默认操作
    if (event.preventDefault) event.preventDefault();   //标准
    else event.cancelBubble = false;                    //IE

    /**
     * 当元素正在拖动时，捕获mousemove事件处理程序
     **/
    function moveHandler(e) {
        if (!e) e = window.event;                            //IE
        //移动这个元素到当前鼠标位置，通过滚动条位置和初始单击的偏移量调整
        var scroll = getScrollOffsets();
        elementToDrag.style.left = (e.clientX + scroll.x - deltaX) + "px";
        elementToDrag.style.top = (e.clientY + scroll.y - deltaY) + "px";
        //不让其他元素影响
        if (e.stopPropagation) e.stopPropagation;           //标准
        else e.cancelBubble = true;                         //IE
    }

    /**
     * 捕获拖动拖动结束时mouseup事件处理程序
     **/
    function upHandler(e) {
        if (!e) e = window.event;                           //IE

        //注销捕获事件处理程序
        if (document.removeEventListener) {
            document.removeEventListener("mouseup", upHandler, true);
            document.removeEventListener("mousemove", moveHandler, true);
        } else if (document.detachEvent) {                  //IE 5+
            elementToDrag.detachEvent("onlosecapture", upHandler);
            elementToDrag.detachEvent("onmouseup", upHandler);
            elementToDrag.detachEvent("onmousemove", moveHandler);
            elementToDrag.releaseCapture();
        }
        //不让事件进一步传播
        if (e.stopPropagation) e.stopPropagation();         //标准
        else e.cancelBubble = true;                          //IE
    }
}
