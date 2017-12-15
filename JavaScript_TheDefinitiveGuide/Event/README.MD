## Event 事件
* [文档加载事件 whenReady()](#文档加载事件)
* [元素拖动事件 drag()](#元素拖动事件)
* [鼠标滚轮事件 enclose()](#鼠标滚轮事件)
* [拖放事件](#拖放事件)
* [文本事件](#文本事件)
* [键盘事件](#键盘事件)
### 文档加载事件
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

### 元素拖动事件
#### drag()方法与getScrollOffsets()方法
```js
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
 * 使用drag()方法
 * 拖动文档元素
 * 定义了一个drag()函数，用于mousedowm事件吹程序的调用
 * 可以兼容ie两种事件
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
```
[Demo](https://beats0.github.io/js-practice/JavaScript_TheDefinitiveGuide/Event/Drag.html)

### 鼠标滚轮事件
#### enclose()方法
调用:
```html
    <script>
        whenReady(function () {
            enclose(document.getElementById("content"),400, 200, -50, -50);
        })
    </script>
    <div id="content"></div>
```
或者
```js
// enclose(content, 400, 200, -50, -50);
function enclose(content, framewidth, frameheight, contentX, contentY) {
    framewidth = Math.max(framewidth, 50);
    frameheight = Math.max(frameheight, 50);
    contentX = Math.min(contentX, 0) || 0;
    contentY = Math.min(contentY, 0) || 0;
    var frame = document.createElement("div");
    frame.className = "enclosure";
    frame.style.width = framewidth + "px";
    frame.style.height = frameheight + "px";
    frame.style.overflow = "hidden";
    frame.style.boxSizing = "border-box";
    frame.style.webkitBoxSizing = "border-box";
    frame.style.mozBoxSizing = "border-box";
    content.parentNode.insertBefore(frame, content);
    frame.appendChild(content);
    content.style.position = "relative";
    content.style.left = contentX + "px";
    content.style.top = contentY + "px";
    var isMacWebkit = ( navigator.userAgent.indexOf("Macintosh") !== -1 &&
        navigator.userAgent.indexOf("WebKit") !== -1 );
    var isFirefox = ( navigator.userAgent.indexOf("Gecko") !== -1 );
    frame.onwheel = wheelHandler;
    frame.onmousewheel = wheelHandler;
    if (isFirefox) {
        frame.addEventListener("DOMMouseScroll", wheelHandler, false);
    }

    function wheelHandler(event) {
        var e = event || window.event;
        var deltaX = e.deltaX * -30 ||
            e.wheelDeltaX / 4 ||
            0;
        var deltaY = e.deltaY * -30 ||
            e.wheelDeltaY / 4 ||
            (e.wheelDeltaY === undefined && e.wheelDelta / 4) ||
            e.detail * -10 ||
            0;
        if (isMacWebkit) {
            deltaX /= 30;
            deltaY /= 30;
        }
        if (isFirefox && e.type !== "DOMMouseScroll") {
            frame.removeEventListener("DOMMouseScroll", wheelHandler, false);
        }
        var contentBox = content.getBoundingClientRect();
        var contentWidth = contentBox.right - contentBox.left;
        var contentHeight = contentBox.bottom - contentBox.top;
        if (e.altKey) {
            if (deltaX) {
                framewidth -= deltaX;
                //framewidth = Math.min( framewidth, contentWidth );
                framewidth = Math.max(framewidth - deltaX, contentWidth);
                frame.style.width = framewidth + "px";
            }
            if (deltaY) {
                frameheight -= deltaY;
                //frameheight = Math.min( frameheight, contentHeight );
                frameheight = Math.max(frameheight - deltaY, contentHeight);
                frame.style.height = frameheight + "px";
            }
        } else {
            if (deltaX) {
                var minoffset = Math.min(framewidth - contentWidth, 0);
                contentX = Math.max(contentX + deltaX, minoffset);
                // contentX = Math.min( contentX, 0 );
                contentX = Math.min(contentX, framewidth - contentWidth);
                content.style.left = contentX + "px";
            }
            if (deltaY) {
                var minoffset = Math.min(frameheight - contentHeight, 0);
                contentY = Math.max(contentY + deltaY, minoffset);
                // contentY = Math.min( contentY, 0 );
                contentY = Math.min(contentY, frameheight - contentHeight);
                content.style.top = contentY + "px";
            }
        }
        if (e.preventDefault) e.preventDefault();
        if (e.stopPropagation) e.stopPropagation();
        e.cancelBubble = true;
        e.returnValue = false;
        return false;
    }
}
```
[Demo](https://beats0.github.io/js-practice/JavaScript_TheDefinitiveGuide/Event/enclose.html)

### 拖放事件
##### dnd.js
```js
function displayTime() {
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;
    clock.innerHTML = hours + ":" + minutes + ":" + seconds;
    setTimeout(displayTime, 1000);
}

displayTime();
// 使时钟能够拖动，使用<span draggable="true">也行
clock.draggable = true;
// 设置拖动事件处理程序
clock.ondragstart = function (event) {
    var event = event || window.event;
    // DataTransfer对象是拖放API的关键
    var dt = event.dataTransfer;
    // 告诉浏览器正则拖动的数据类型及数据（这里的数据是时间戳）
    dt.setData("Text", clock.innerHTML + "\n");
    // 用图标来表示正在被拖动的时间戳
    if (dt.setDragImage) {
        dt.setDragImage(icon, 0, 0);
    }
};
```
[Demo](https://beats0.github.io/js-practice/JavaScript_TheDefinitiveGuide/Event/dnd.html)
#### drop_target.js 作为拖放目标和拖放源的列表
```js
(function () {
    // 查找所有的<ul class="dnd">元素，并对其调用dnd()函数
    var lists = document.getElementsByTagName("ul");
    var regexp = /\bdnd\b/;
    for (var i = 0; i < lists.length; i++) {
        if (regexp.test(lists[i].className)) dnd(lists[i]);
    }

    // 为列表元素添加拖放事件处理程序
    function dnd(list) {
        var originalClass = list.className; // 保存元素CSS类
        var entered = 0;                    // 跟踪进入和离开
        /**
         * 拖放时调用这个处理程序，检测拖放时是否能处理
         * 如果能，就返回false可以，并用高亮方式拖动，让用户知道
         * **/
        list.ondragenter = function (e) {
            e = e || window.event;                  //标准或IE
            var from = e.relatedTarget;
            entered++;
            if (( from && !isChild(from, list) ) || entered == 1) {
                //所有的dnd信息都在dataTransfer对象上
                var dt = e.dataTransfer;

                //dt.types对象列出可以拖放数据的类型或格式，包含contains()方法，indexOf()方法，IE8及以前不支持
                var types = dt.types;               //可返回格式选项
                if (!types ||                       // IE
                    ( types.contains && types.contains("text/plain") ) || // HTML5
                    ( types.indexOf && types.indexOf("text/plain") != -1 ))// Webkit
                {
                    list.className = originalClass + " droppable";
                    return false;
                }
                //无法识别数据类型时不拖放
                return
            }
            return false;
        };
        list.ondragover = function (e) {        //鼠标移动上时返回false
            return false;
        };                                      //如果真正的离开列表(不仅仅是从一个列表到另外一个列表)，取消高亮显示
        list.ondragleave = function (e) {
            e = e || window.event;
            var to = e.relatedTarget;           //列表以外的元素或者打破离开和进入次数的平衡，取消高亮显示
            entered--;
            if (( to && !isChild(to, list) ) || entered <= 0) {
                list.className = originalClass;
                entered = 0;
            }
            return false;
        }
        //实际调用时，使用一下函数
        list.ondrop = function (e) {
            e = e || window.event;
            var dt = e.dataTransfer;
            var text = dt.getData("Text");      //获得Text
            if (text) {
                var item = document.createElement("li");
                item.draggable = true;
                item.appendChild(document.createTextNode(text));//添加文本
                list.appendChild(item);                         //添加到列表

                list.className = originalClass;                 //恢复列表原始样式并且重置进入次数
                entered = 0;
                return false;
            }
        };
        //使原始列表可拖动
        var items = list.getElementsByTagName("li");
        for (var i = 0; i < items.length; i++) {
            items[i].draggable = true;
        }
        list.ondragstart = function (e) {            //调用
            var e = e || window.event;
            var target = e.target || e.srcElement;
            if (target.tagName !== "LI") {
                return false;
            }
            var dt = e.dataTransfer;                //获得dataTransfer对象
            dt.setData("Text", target.innerText || target.textContent);
            dt.effectAllowed = "copyMove";          //允许移动复制这些数据类型
        };
        //成功后放置后调用
        list.ondragend = function (e) {
            e = e || window.event;
            var target = e.target || e.srcElement;
            if (e.dataTransfer.dropEffect === "move") {
                target.parentNode.removeChild(target);
            }
        };
        //a是b的子元素返回true
        function isChild(a, b) {
            for (; a; a = a.parentNode) {
                if (a === b) return true;
            }
            return false;
        }
    }
})();
```
[Demo](https://beats0.github.io/js-practice/JavaScript_TheDefinitiveGuide/Event/drop_target.html)
### 文本事件
##### InputFilter.js 过滤`<input>`元素的键盘输入
```js
(function () {
    var inputElts = document.getElementsByTagName("input");
    for (var i = 0; i < inputElts.length; i++) {
        var elt = inputElts[i];
        // 过滤掉不是文本域以及没有 data-allowed-chars属性的元素
        if (elt.type != "text" || !elt.getAttribute("data-allowed-chars")) {
            continue;
        }
        if (elt.addEventListener) {
            elt.addEventListener("keypress", filter, false);
            elt.addEventListener("textInput", filter, false);
            elt.addEventListener("textinput", filter, false);
        } else {                        //IE
            elt.attachEvent("onkeypress", filter);
        }
    }

    function filter(event) {
        var e = event || window.event;
        var target = e.target || e.srcElement;
        var text = null;
        if (e.type === "textinput" || e.type === "textInput") {
            text = e.data;
        } else {
            var code = e.charCode || e.keyCode;
            if (code < 32 // 控制字符
                || e.charCode == 0 // 功能键（仅指Firefox）
                || e.ctrlKey || e.altKey) /* 按下辅助键 */ {
                return;
            }
            // 将字符编码转换为字符串
            text = String.fromCharCode(code);
        }
        // 从input元素中提取所需要的信息
        var allowed = target.getAttribute("data-allowed-chars");
        var messageid = target.getAttribute("data-messageid");
        if (messageid) {
            var messageElement = document.getElementById(messageid);
        }

        // //遍历输入文字的字
        // for (var i = 0; i < text.length; i++) {
        //     var c = text.charArt(i);
        //     if (allowed.indexOf(c) == -1) {       //是否是不允许的字符
        //         //存在不合法字符时显示消息元素
        //         if (messageElement) messageElement.style.visibility = "visible";
        //
        //         //取消默认行为，不会插入文本
        //         if (e.preventDefault) e.preventDefault();
        //         if (e.returnValue) e.returnValue = false;
        //         return false;
        //     }
        // }
        // //如果所有字符都合法时，隐藏存在的消息元素
        // if (messageElement) messageElement.style.visibility="hidden";

        var value = target.value + text; // 已输入的值 + 待校验的值
        var regExp = new RegExp(allowed);
        if (!regExp.test(value)) { // 输入非法
            if (messageElement) {
                messageElement.style.visibility = "visible";
            }
            if (e.preventDefault) e.preventDefault();
            if (e.returnValue) e.returnValue = false;
            return false;
        }
        // 如果所有的字符都合法，则隐藏存在的消息元素
        if (messageElement) {
            messageElement.style.visibility = "hidden";
        }
    }
})();

//propertyToUpperCas事件探测文本输入
forceToUpperCase(uppercase);

function forceToUpperCase(element) {
    if (typeof element === "string") {
        element = document.getElementById(element);
    }
    element.oninput = upperCase;
    element.onpropertychange = upperCaseOnPropertyChange; // IE
    function upperCase(event) {
        this.value = this.value.toUpperCase();
    }

    function upperCaseOnPropertyChange(event) {
        var e = event || window.event;
        if (e.propertyName === "value") {
            // 移除 onpropertychange 处理程序，避免变大写的时候循环调用
            this.onpropertychange = null;
            // 把值都变为大写
            this.value = this.value.toUpperCase();
            // 恢复 onpropertychange 处理程序
            this.onpropertychange = upperCaseOnPropertyChange;
        }
    }
}
```
[Demo](https://beats0.github.io/js-practice/JavaScript_TheDefinitiveGuide/Event/InputFilter.html)

### 键盘事件
##### Keymap.js 键盘按下或释放时
```js
// 构造函数
function Keymap(bindings) {
    this.map = {}; // 按键标识符到handler的映射
    // { 按键标识符1: handler1, ... }
    if (bindings) {
        for (var name in bindings) {
            this.bind(name, bindings[name]);
        }
    }
}

// 绑定 指定的按键标识符和指定的处理程序函数
Keymap.prototype.bind = function (key, func) {
    this.map[Keymap.normalize(key)] = func;
};
// 删除 指定标识符的绑定
Keymap.prototype.unbind = function (key) {
    delete this.map[Keymap.normalize(key)];
};
// 在指定的元素上配置 keymap
Keymap.prototype.install = function (element) {
    var keymap = this;

    function handler(event) {
        return keymap.dispatch(event, element);
    }

    if (element.addEventListener) {
        element.addEventListener("keydown", handler, false);
    } else if (element.attachEvent) {
        element.attachEvent("onkeydown", handler);
    }
};
// 当触发键盘事件时，如果匹配到了 Keymap.map 中的keyid，则调用keyid对应的handler
Keymap.prototype.dispatch = function (event, element) {
    var modifiers = ""; // 辅助键
    var keyname = null; // 键名
    if (event.altKey) modifiers += "alt_";
    if (event.ctrlKey) modifiers += "ctrl_";
    if (event.metaKey) modifiers += "meta_";
    if (event.shiftKey) modifiers += "shift_";
    if (event.key) {
        keyname = event.key;
    } else if (event.keyIdentifier && event.keyIdentifier.substring(0, 2) !== "U+") {
        keyname = event.keyIdentifier;
    } else {
        keyname = Keymap.keyCodeToKeyname[event.keyCode];
    }
    if (!keyname) return;
    // 键盘事件发生时的keyid
    var keyid = modifiers + keyname.toLowerCase();
    // 匹配 Keymap.map 中的keyid
    var handler = this.map[keyid];
    if (handler) { // 如果匹配到了，则调用keyid对应的handler
        var returnValue = handler.call(element, event, keyid);
        if (returnValue === false) { // 如果返回值为false
            // 取消冒泡
            if (event.stopPropagation) {  // 标准
                event.stopPropagation();
            } else {
                event.cancelBubble = true;  // IE
            }
            // 阻止按键的默认行为，即取消此次按键
            if (event.preventDefault) {   // 标准
                event.preventDefault();
            } else {
                event.returnValue = false;  // IE
            }
        }
        return returnValue;
    }
};
// 把标准化keyid，“ctrl+s” => “ctrl_s”
Keymap.normalize = function (keyid) {
    keyid = keyid.toLowerCase();
    var words = keyid.split(/\s+|[\-+_]/);
    var keyname = words.pop();
    keyname = Keymap.aliases[keyname] || keyname;
    words.sort();
    words.push(keyname);
    return words.join("_");
};
// 把按键常见的别名映射到“正式名”
Keymap.aliases = {
    "escape": "esc",
    "delete": "del",
    "return": "enter",
    "ctrl": "control",
    "space": "spacebar",
    "ins": "insert"
}
// 传统的keyCode是不标准的，以下可以在大多数浏览器和OS中使用
Keymap.keyCodeToKeyname = {
    // Keys with words or arrows on them
    8: "Backspace",
    9: "Tab",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Esc",
    32: "Spacebar",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "Left",
    38: "Up",
    39: "Right",
    40: "Down",
    45: "Insert",
    46: "Del",
    // Number keys on main keyboard (not keypad)
    48: "0",
    49: "1",
    50: "2",
    51: "3",
    52: "4",
    53: "5",
    54: "6",
    55: "7",
    56: "8",
    57: "9",
    // Letter keys. Note that we don't distinguish upper and lower case
    65: "A",
    66: "B",
    67: "C",
    68: "D",
    69: "E",
    70: "F",
    71: "G",
    72: "H",
    73: "I",
    74: "J",
    75: "K",
    76: "L",
    77: "M",
    78: "N",
    79: "O",
    80: "P",
    81: "Q",
    82: "R",
    83: "S",
    84: "T",
    85: "U",
    86: "V",
    87: "W",
    88: "X",
    89: "Y",
    90: "Z",
    // Keypad numbers and punctuation keys. (Opera does not support these.) 96:"0",
    97: "1",
    98: "2",
    99: "3",
    100: "4",
    101: "5",
    102: "6",
    103: "7",
    104: "8",
    105: "9",
    106: "Multiply",
    107: "Add",
    109: "Subtract",
    110: "Decimal",
    111: "Divide",
    // Function keys
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    124: "F13",
    125: "F14",
    126: "F15",
    127: "F16",
    128: "F17",
    129: "F18",
    130: "F19",
    131: "F20",
    132: "F21",
    133: "F22",
    134: "F23",
    135: "F24",
    // Punctuation keys that don't require holding down Shift
    // Hyphen is nonportable: FF returns same code as Subtract
    59: ";",
    61: "=",
    186: ";",
    187: "=", // Firefox and Opera return 59,61
    188: ",",
    190: ".",
    191: "/",
    192: "`",
    219: "[",
    220: "\\",
    221: "]",
    222: "'"
}
// ----------
var keymap = new Keymap({
    "ctrl+s": function () {
        console.info("ctrl+s");
    },
    "ctrl+a": function () {
        console.info("ctrl+a");
    }
});
keymap.bind("ctrl+v", function () {
    console.info("ctrl+v");
});
keymap.install(document.body);
```
