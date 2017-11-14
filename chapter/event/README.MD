### 事件处理
#### event事件
```
//event属性：type获取 | target绑定DOM元素 | keyCode键码 | relatedTarget移入移出DOM元素 | currenTarge获取冒泡前触发DOM元素与this | pageX/pageY获取相对页面的水平垂直坐标
var con = document.getElementById("con");
con.onclick = function (e) {
    // console.log(e);
    var e = e||window.event;
    console.log(e);//IE兼容性
    console.log(e.type);//clik
    console.log(e.target);//节点及以下所有DOM元素
}
//keyCode阻止右键事件兼容
con.oncontextmenu = function (e) {
    var e = e || window.event;
    if (e.preventDefault) {
        e.preventDefault();
    } else {
        e.returnValue(false);//IE
    }
    alert("不可使用右键菜单");
}
```
#### math对象 为全局对象
```
//math.PI | abs() | ceil()向上舍入最近的整数 | floor()向下舍入最近的整数 | min() | max() |
var a = 1;
var b = -1;
var c =2.3333;
var a1 = Math.abs(a);
var b1 = Math.abs(b);
console.log(a1);
console.log(b1);//1
console.log(Math.ceil(c));//3
console.log(Math.floor(c));//2
// if (a < b) {
//     if (a < c) {
//         console.log(a)
//     } else {
//         console.log(c)
//     }
// } else {
//     if (b < c) {
//         console.log(b)//min = -1
//     } else {
//         console.log(c)
//     }
// }
console.log(Math.min(a,b,c));//min = -1
//Math.round()四舍五入 | random()求出0-1的随机数
console.log(Math.round(c));//2
console.log(Math.random());//0-1中的随机数0.6072557380996593
console.log(Math.floor(Math.random()*10+20));//20-30的随机整数
```
#### Date对象
```
document.write(new Date());
//new Date(milliseconds)指定时间毫秒数
document.write(new Date(1412312323231));
//new Date(dateStr)将字符串转化为Date对象，格式为“yyyy/MM/dd HH：mm：ss”
document.write(new Date("2017/09/09 16:00:00"));
var datenow = new Date();
var dateyear = datenow.getFullYear();
document.write(dateyear);//现在的年份

function test(o) {
    var i = 0;
    if (typeof o == "object") {
        var j= 0;
        for (var k = 0;k < 10;k++) {
            console.log(k);
        }
        console.log(k);
    }
    console.log(j);
}
```
#### 抛出异常
```
// function fa(x) {
//     if (x<0)
//         throw new Error("不能是负数");
//     for (var f=1;x>1;f *= x,x--);
//         return f;
// }

try {
    var n = Number(prompt("输入一个正整数",""));
    var f = factorial(n);
    alert(n+"!="+f);
}
catch (ex) {
    alert(ex);
}
```
#### 事件清除
```
//这是无效的,因为这样使用了不同的函数
var btn = document.getElementById("myBtn");
btn.addEventListener("click", function () {
    alert(this.id);
}, false);
btn.removeEventListener("clik", function () {
    alert(this.id);
}, false);

//正确的
var btn = document.getElementById("myBtn");
var handler = function () {
    alert(this.id);
};
btn.addEventListener("click", handler, false);
btn.removeEventListener("clik", handler, false);

//支持IE和Opera，注意是用attachEvent()和detachEvent()方法,点击为onclick
btn.attachEvent("onclick", function () {
    alert("Clicked");
});
//IE事件清除
var btn = document.getElementById("myBtn");
var handler = function () {
    alert("Clicked");
};

btn.attachEvent("onclick", handler);

btn.detachEvent("onclick", handler);
```
#### 在需要通过一个函数处理多个事件时可以使用type属性
```
var handler = function (event) {
    switch (event.type) {
        case "click":
            alert("Clicked");
            break;

        case "mouseover":
            event.target.style.backgroundColor = "red";
            break;

        case "mouseout":
            event.target.style.backgroundColor = "blue";
            break;
    }
};

btn.onclick = handler;
btn.onmouseover = handler;
btn.onmouseout = handler;
```

#### eventPhase属性，确定事件当前正位于事件流的那个阶段，如果在捕获阶段调用的时间处理程序，那么eventPhase为1，如果事件处理程序位于目标对象上，则eventPhase为2；如果在冒泡阶段调用的事件处理程序，eventPhase为3，注意“处于目标”发生在冒泡阶段，但eventPhase仍然一直等于2，如：
```
btn.onclick = function (event) {
    alert(event.eventPhase);        //2
};

document.body.addEventListener("click", function (event) {
    alert(event.eventPhase);        //1
});

document.body.onclick = function (event) {
    alert(event.eventPhase);        //3
};
```
#### 跨浏览器的事件对象(4种方法)
```
var EventUtil = {
    addHanler: function (element, type, handler) {
        //......
    },
    getEvent: function (event) {
        return event ? event : window.event;
    },
    getTarget: function (event) {
        return event.target || event.srcElement;
    },
    praventDefault: function (event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },

    removeHandler: function (element, type, hanlder) {
        //......
    },

    stopPropagation: function (event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    }
};
```
#### load事件
```
//<img src="01.gig" onload="alter('Image loaded')"
var image = document.getElementById("myImage");
EventUtil.addHanler(image, "load", function (event) {
    event = EventUtil.getEvent(event);
    alert(EventUtil.getTarget(event).src);
});
```
#### scroll事件,Safair3.1兼容
```
EventUtil.addHanler(window, "scroll", function (event) {
    if (document.compatMode == "CSS1Compat") {
        alert(document.documentElement.scrollTop);
    } else {
        alert(document.body.scrollTop);
    }
});
```
### mouse属性
#### 1.客户区坐标,clientX,clientY
```
var clientDiv = document.getElementById("clientDiv");
EventUtil.addHanler(clientDiv, "click", function (event) {
    event = EventUtil.getEvent(event);
    alert("Client coordinates: " + event.clientX + "," + event.clientY);
});
```
#### 2.页面坐标,pageX,pageY
```
var pageDiv = document.getElementById("pageDiv");
EventUtil.addHanler(pageDiv, "click", function (event) {
    event = EventUtil.getEvent(event);
    alert("Client coordinates: " + event.pageX + "," + event.pageY);
});

//IE8兼容
var div = document.getElementById("myDiv");
EventUtil.addHanler(div, "click", function (event) {
    event = EventUtil.getEvent(event);
    var pageX = event.pageX,
        pageY = event.pageY;

    if (pageX === undefined) {
        pageX = event.clientX + (document.body.scrollLeft || document.documentElement.scrollLeft);
    }

    if (pageY === undefined) {
        pageY = event.clientY + (document.body.scrollTop || document.documentElement.scrollTop);
    }

    alert("page coordinates:" + pageX + "," + pageY);
});
```
#### 3.屏幕坐标位置
```
var div = document.getElementById("myDiv");
EventUtil.addHanler(pageDiv, "click", function (event) {
    event = EventUtil.getEvent(event);
    alert("Client coordinates: " + event.scaleX + "," + event.screenY);
});
```
#### 4.修改键
包含shiftKey，ctrlKey，altKey，metaKey

#### 简单的点击菜单效果
```
EventUtil.addHanler(window, "lode", function (event) {
    var div = document.getElementById("mydiv");

    EventUtil.addHanler(div, "contextmenu", function (event) {
        event = EventUtil.getEvent(event);
        EventUtil.preventDefault(event);

        var menu = document.getElementById("myMenu");
        menu.style.left = event.clientX + "px";
        menu.style.top = event.clientY + "px";
        menu.style.visibility = "visible";
    });

    EventUtil.addHanler(document, "click", function (event) {
        document.getElementById("myMenu").style.visibility = "hidden";
    });
});
```
#### 事件委托 提高性能
适合用于click,mousedown,mouseup,keydown,keyup和keypress
```
var list = document.getElementById("myLinks");
EventUtil.addHanler(list, "click", function (event) {
    event = EventUtil.getEvent(event);
    var taget = EventUtil.getEvent(event);

    switch (taget.id) {
        case "sometsthing1":
            document.title = "change title";
            break;

        case "sometsthing2":
            location.href = "http://www.w3cschool.com";
            break;

        case "sometsthing3":
            alert("Hi!");
            break;
    }
});
```

### 事件补充

#### 键盘事件

属性 | 描述 |
-----|-----|
onkeydown       |当按下按键时运行脚本
onkeypress      |当按下并松开按键时运行脚本
onkeyup         |当松开按键时运行脚本

#### 鼠标事件

属性 | 描述 |
-----|-----|
onclick         |当单击鼠标时运行脚本
ondblclick      |当双击鼠标时运行脚本
ondrag          |当拖动元素时运行脚本
ondragend       |当拖动操作结束时运行脚本
ondragenter     |当元素被拖动至有效的拖放目标时运行脚本
ondragleave     |当元素离开有效拖放目标时运行脚本
ondragover      |当元素被拖动至有效拖放目标上方时运行脚本
ondragstart     |当拖动操作开始时运行脚本
ondrop          |当被拖动元素正在被拖放时运行脚本
onmousedown     |当按下鼠标按钮时运行脚本
onmousemove     |当鼠标指针移动时运行脚本
onmouseout      |当鼠标指针移出元素时运行脚本
onmouseover     |当鼠标指针移至元素之上时运行脚本
onmouseup       |当松开鼠标按钮时运行脚本
onmousewheel    |当转动鼠标滚轮时运行脚本
onscroll        |当滚动元素滚动元素的滚动条时运行脚本


#### 媒介事件
*由视频、图像以及音频等媒介触发的事件。
 适用于所有 HTML 5 元素，不过在媒介元素（诸如 audio、embed、img、object 以及 video）中最常用：
*

属性 | 描述 |
-----|-----|
onabort             |当发生中指事件时运行脚本
oncanplay           |当媒介能够开始播放但可能因缓冲而需要停止时运行脚本
oncanplaythrough    |当媒介能够无需因缓冲而停止即可播放至结尾时运行脚本
ondurationchange    |当媒介长度改变时运行脚本
onemptied           |当媒介资源元素突然为空时（网络错误、加载错误等）运行脚本
onended             |当媒介已抵达结尾时运行脚本
onerror             |当在元素加载期间发生错误时运行脚本
onloadeddata        |当加载媒介数据时运行脚本
onloadedmetadata    |当媒介元素的持续时间以及其他媒介数据已加载时运行脚本
onloadstart         |当浏览器开始加载媒介数据时运行脚本
onpause             |当媒介数据暂停时运行脚本
onplay              |当媒介数据将要开始播放时运行脚本
onplaying           |当媒介数据已开始播放时运行脚本
onprogress          |当浏览器正在取媒介数据时运行脚本
onratechange        |当媒介数据的播放速率改变时运行脚本
onreadystatechange  |当就绪状态（ready-state）改变时运行脚本
onseeked            |当媒介元素的定位属性 [1] 不再为真且定位已结束时运行脚本
onseeking           |当媒介元素的定位属性为真且定位已开始时运行脚本
onstalled           |当取回媒介数据过程中（延迟）存在错误时运行脚本
onsuspend           |当浏览器已在取媒介数据但在取回整个媒介文件之前停止时运行脚本
ontimeupdate        |当媒介改变其播放位置时运行脚本
onvolumechange      |当媒介改变音量亦或当音量被设置为静音时运行脚本
onwaiting           |当媒介已停止播放但打算继续播放时运行脚本


