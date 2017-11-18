//测试某个值是不是原生函数或者正则表达式
function idFunction(value) {
    return Object.prototype.toString.call(value) == "[object Function]";
}

function isRegExp(value) {
    return Object.prototype.toString.call(value) == "[object RegExp]";
}

//作用域安全性
//防止this进入window全局变量
function Person(name, age, job) {
    if (this instanceof Person) {
        this.name = name;
        this.age = age;
        this.job = job;
    } else {
        return new Person(name, age, job);          //再次使用new操作
    }
}

let person1 = Person("001", 19, "javascript");      //person1.name      001
let person2 = Person("002", 20, "javascript");      //person2.name      002
//
// 例子：通过长方形体积计算表面积
//
// //错误性的
// function Polygon(sides) {
//     if (this instanceof Polygon) {
//         this.sides = sides;
//         this.getArea = function () {
//             return 0;
//         }
//     } else {
//         return new Polygon(sides);
//     }
// }
//
// function Rectangle(width, height) {
//     Polygon.call(this, 2);
//     this.width = width;
//     this.height = height;
//     this.getArea = function () {
//         return this.width * this.height;
//     }
// }
//
// let rect = new Rectangle(5, 10);
// console.log(rect.sides);     //undefined
//

// 正确性的，使用原型链和寄生组合
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

let rect = new Rectangle(5, 10);
console.log(rect.sides);     //2



let EventUtil = {
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

// //错误性的
// let handler = {
//     message: "Event handled",
//     handlerClick: function (event) {
//         alert(this.message);
//     }
// };
// let btn = document.getElementById("btn")
// EventUtil.addHanler(btn, "click", function (event) {
//     handler.handlerClick(event);        //错误性的
// });
//
// //使用bind()方法
// function bind(fn, context) {
//     return function () {
//         return fn.apply(context, arguments);
//     }
// }

//正确性的
let handler = {
    message: "Event handled",
    handlerClick: function (event) {
        console.log(this.message + ":" + event.type);
    }
};
let btn = document.getElementById("btn");
EventUtil.addHanler(btn, "click", handler.handlerClick.bind(handler));

//柯里化(非真正意义上的柯里化，只做展示)
function add(num1, num2) {
    return num1 + num2;
}

function curriedAdd(num2) {
    return add(5, num2);
}

console.log(add(2, 3));          //5:2+3
console.log(curriedAdd(3));     //8:5+3

//柯里化(真正意义上的柯里化)
function curry(fn) {
    let args = Array.prototype.slice.call(arguments, 1);
    return function () {
        let innerArgs = Array.prototype.slice.call(arguments);
        let finalArgs = args.concat(innerArgs);
        return fn.apply(null, finalArgs);
    };
}

function add(num1, num2) {
    return num1 + num2;
}

var curriedAdd = curry(add, 5, 12);
console.log(curriedAdd());      //17

//柯里化与bind()
function bind(fn, context) {
    let args = Array.prototype.slice.call(arguments, 2);
    return function () {
        let innerArgs = Array.prototype.call(arguments);
        return fn.apply(context, finalArgs);
    };
}

//函数节流
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

//作为throttle()简化版
function throttle(method, context) {
    clearTimeout(method.timeoutId);     //写入ID
    method.timeoutId = setTimeout(function () {
        method.call(context);
    }, 100)
}

//写一个div，让它的高度根据界面进行回流而产生改动
function resizeDiv() {      //放入resize()的单独函数中
    let div = document.getElementById("myDiv");
    div.style.height = div.offsetWidth + "px";
}

window.onresize = function () {
    throttle(resizeDiv);        //调用throttle()并传入resizeDiv函数，节省计算能力
};

//自定义事件
//与DOM交互

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

//添加一个新对象
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

