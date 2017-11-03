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