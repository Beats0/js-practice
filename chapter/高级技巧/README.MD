## 高级函数
##### 类型检测
测试某个值是不是原生函数或者正则表达式
```js
function idFunction(value) {
    return Object.prototype.toString.call(value) == "[object Function]";
}

function isRegExp(value) {
    return Object.prototype.toString.call(value) == "[object RegExp]";
}
```
##### 作用域与构造函数
检测作用域安全性,防止this进入window全局变量
```js
function Person(name, age, job) {
    if (this instanceof Person) {
        this.name = name;
        this.age = age;
        this.job = job;
    } else {
        return new Person(name, age, job);          //再次使用new操作
    }
}

var person1 = Person("001", 19, "javascript");      //person1.name      001
var person2 = Person("002", 20, "javascript");      //person2.name      002
```
例子：通过长方形体积计算表面积
*错误性的*
```js
function Polygon(sides) {
    if (this instanceof Polygon) {
        this.sides = sides;
        this.getArea = function () {
            return 0;
        }
    } else {
        return new Polygon(sides);
    }
}

function Rectangle(width, height) {
    Polygon.call(this, 2);
    this.width = width;
    this.height = height;
    this.getArea = function () {
        return this.width * this.height;
    }
}

var rect = new Rectangle(5, 10);
console.log(rect.sides);     //undefined
```
*正确性的，使用原型链和寄生组合*
```js
function Polygon(sides) {
    if (this instanceof Polygon) {
        this.sides = sides;
        this.getArea = function () {
            return 0;
        }
    } else {
        return new Polygon(sides);
    }
}

function Rectangle(width, height) {
    Polygon.call(this, 2);
    this.width = width;
    this.height = height;
    this.getArea = function () {
        return this.width * this.height;
    }
}

Rectangle.prototype = new Polygon();        //为Rectangle添加sides属性

var rect = new Rectangle(5, 10);
console.log(rect.sides);     //2
```

##### 惰性载入

##### 函数绑定
*错误性的*
```js
var handler = {
    message: "Event handled",
    handlerClick: function (event) {
        alert(this.message);
    }
};
var btn = document.getElementById("btn")
EventUtil.addHanler(btn, "click", function (event) {
    handler.handlerClick(event);        //错误性的
});
```
使用`bind()`方法
```js
function bind(fn, context) {
    return function () {
        return fn.apply(context, arguments);
    }
}
```
正确性的
```js
var handler = {
    message: "Event handled",
    handlerClick: function (event) {
        console.log(this.message + ":" + event.type);
    }
};
var btn = document.getElementById("btn");
EventUtil.addHanler(btn, "click", handler.handlerClick.bind(handler));
```
##### 函数`柯里化`
是把接受多个参数的函数变换成接受一个单一参数(最初函数的第一个参数)的函数，并且返回接受余下的参数且返回结果的新函数,技术上来讲就是使用闭包返回函数
*柯里化(非真正意义上的柯里化，只做展示)*
```js
function add(num1, num2) {
    return num1 + num2;
}

function curriedAdd(num2) {
    return add(5, num2);
}

console.log(add(2, 3));          //5:2+3
console.log(curriedAdd(3));     //8:5+3
```
*柯里化(真正意义上的柯里化)*
```js
function curry(fn) {
    var args = Array.prototype.slice.call(arguments, 1);
    return function () {
        var innerArgs = Array.prototype.slice.call(arguments);
        var finalArgs = args.concat(innerArgs);
        return fn.apply(null, finalArgs);
    };
}

function add(num1, num2) {
    return num1 + num2;
}

var curriedAdd = curry(add, 5, 12);
console.log(curriedAdd());      //17
```

*柯里化与`bind()`*
```js
function bind(fn, context) {
    var args = Array.prototype.slice.call(arguments, 2);
    return function () {
        var innerArgs = Array.prototype.call(arguments);
        return fn.apply(context, finalArgs);
    };
}
```

## 防篡改对象

##### 不可拓展的对象isExtensible()

##### 密封对象seal()

##### 冻结对象Object.isFrozen()

## 高级定时器
 - 超时调用setTimeout()
 - 间歇调用setInterval()

## 函数节流
```js
let processor = {
    timeoutId: null,

    //实际进行处理的方法
    performProcessing: function () {
        //实际执行的代码
    },
    //初始处理调用方法
    process: function () {
        clearTimeout(this.timeoutId);
        let that = this;
        this.timeoutId = setTimeout(function () {
            that.performProcessing();       //只调用一次
        }, 100)
    }
};
//尝试开始执行
processor.process();
```
*作为throttle()简化版*
```js
function throttle(method, context) {
    clearTimeout(method.timeoutId);     //写入ID
    method.timeoutId = setTimeout(function () {
        method.call(context);
    }, 100)
}
```
*再例如：写一个div，让它的高度根据界面进行回流而产生改动*
```js
function resizeDiv() {      //放入resize()的单独函数中
    let div = document.getElementById("myDiv");
    div.style.height = div.offsetWidth + "px";
}

window.onresize = function () {
    throttle(resizeDiv);        //调用throttle()并传入resizeDiv函数，节省计算能力
};
```

## 自定义事件
##### 观察者模式
*与DOM交互*
```js
function EventTarget() {
    this.handlers = {};
}

EventTarget.prototype = {
    constructor: EventTarget,
    addHanler: function (type, handler) {
        if (typeof this.handlers[type] == "undefined") {
            this.handlers[type] = [];
        }
        this.handlers[type].push(handler);
    },
    fire: function (event) {
        if (event.target) {
            event.target = this;
        }
        if (this.handlers[event.type] instanceof Array) {
            var handlers = this.handlers[event.type];
            for (var i = 0, len = handlers.length; i < len; i++) {
                handlers[i](event);
            }
        }
    },
    removeHandler: function (type, handler) {
        if (this.handlers[type] instanceof Array) {
            var handlers = this.handlers[type];
            for (var i = 0, len = handlers.length; i < len; i++) {
                if (handlers[i] === handler) {
                    break;
                }
            }
            handlers.splice(i, 1);
        }
    }
};

//调用
function handleMassage(event) {
    alert("Message recevied:" + event.massage);
}
```
*添加一个新对象*
```js
var target = new EventTarget();
//添加一个事件处理程序
target.addHanler("message", handleMassage);
//触发事件
target.fire({type: "message", message: "Hello world!"});
//删除事件处理程序
target.removeHandler("message", handleMassage);
//再次，应没有处理程序
target.fire({type: "message", message: "Hellow world!"});

//使用继承
function Person(name, age) {
    EventTarget.call(this);
    this.name = name;
    this.age = age;
}

inheritPrototype(Person, EventTarget);       //继承
Person.prototype.say = function (message) {
    this.fire({type: "message", message: message});
};
```

## 拖放
```js
var DragDrop = function () {
    var dragging = null;

    function handleEvent(event) {
        //优化鼠标拖动方式
        var dragging = null;
        diffX = 0;
        diffY = 0;

        //获取事件和目标
        event = EventUtil.getEvent(event);
        var target = EventUtil.getTarget(event);
        //确定事件类型
        switch (event.type) {
            case "mousedown":
                if (target.className.indexOf("draggable") > -1) {
                    dragging = target;
                    diffX = event.clientX - target.offsetLeft;
                    diffY = event.clientY - target.offsetTop;
                }
                break;

            case  "mousemove":
                if (dragging !== null) {
                    //指定位置
                    dragging.style.left = (event.clientX - diffX) + "px";
                    dragging.style.top = (event.clientY - diffY) + "px";
                }
                break;

            case "mouseup":
                dragging = null;
                break;
        }
    };
    //接口
    return {
        enable: function () {
            EventUtil.addHanler(document, "mousedown", handleEvent);
            EventUtil.addHanler(document, "mousemove", handleEvent);
            EventUtil.addHanler(document, "mouseup", handleEvent);
        },
        disabled: function () {
            EventUtil.removeHandler(document, "mousedown", handleEvent);
            EventUtil.removeHandler(document, "mousemove", handleEvent);
            EventUtil.removeHandler(document, "mouseup", handleEvent);
        }
    }
}();
```
*添加自定义事件*
```js
var DragDrop = function () {
    var dragdrop = new EventTarget(),
        dragging = null,
        diffX = 0;
        diffY = 0;

    function handleEvent(event) {
        //获取事件和目标
        event = EventUtil.getEvent(event);
        var target = EventUtil.getTarget(event);
        //确定事件类型
        switch (event.type) {
            case "mousedown":
                if (target.className.indexOf("draggable") > -1) {
                    dragging = target;
                    diffX = event.clientX - target.offsetLeft;
                    diffY = event.clientY - target.offsetTop;
                    dragdrop.fire({type: "dragstart", target: dragging, x: event.clientX, y: event.clientY});
                }
                break;

            case  "mousemove":
                if (dragging !== null) {
                    //指定位置
                    dragging.style.left = (event.clientX - diffX) + "px";
                    dragging.style.top = (event.clientY - diffY) + "px";

                    //触发自定义事件
                    dragdrop.fire({type: "drag", target: dragging, x: event.clientX, y: event.clientY});

                }
                break;

            case "mouseup":
                dragdrop.fire({type: "dragend", target: dragging, x: event.clientX, y: event.clientY});
                dragging = null;
                break;
        }
    };
    //接口
    dragdrop.enable = function () {
        EventUtil.addHanler(document, "mousedown", handleEvent);
        EventUtil.addHanler(document, "mousemove", handleEvent);
        EventUtil.addHanler(document, "mouseup", handleEvent);
    };
    dragdrop.disabled = function () {
        EventUtil.removeHandler(document, "mousedown", handleEvent);
        EventUtil.removeHandler(document, "mousemove", handleEvent);
        EventUtil.removeHandler(document, "mouseup", handleEvent);
    };
    return dragdrop;
}();

DragDrop.addHanler("dragstart", function (event) {
    var status = document.getElementById("status");
    status.innerHTML = "Start dragging" + event.target.id;
});
DragDrop.addHanler("drag", function (event) {
    var status = document.getElementById("status");
    status.innerHTML += "<br/> Dragged" + event.target.id + " to (" + event.x + "," + event.y + ")";
});
DragDrop.addHanler("dragend", function (event) {
    var status = document.getElementById("status");
    status.innerHTML += "<br/> Dragged" + event.target.id + " at (" + event.x + "," + event.y + ")";
});
```
