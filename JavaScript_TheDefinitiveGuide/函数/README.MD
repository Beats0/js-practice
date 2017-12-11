## 面向对象编程
### 类和构造函数
```js
var F = function () {};         //函数对象
var P = F.prototype;            //与F相关联的原型对象
var C = P.constructor;          //与原型相关联的函数
C === F                         //true
```
`Range()`
```js
function Range(from, to) {
        this.from = from;
        this.to = to;
    }

    Range.prototype = {
        includes: function (x) {
            return this.from <= x && x <= this.to;
        },
        foreach: function (f) {
            for (var x = Math.ceil(this.from); x <= this.to; x++) f(x)
        },
        tostring: function () {
            return "(" + this.from + ")" + "..." + this.to + ")";
        }
    };
    var r = Range(1, 10);
    r.includes(2);
    r.foreach(console.log);
    console.log(r);
```
`Range()`简单的封装
```js
    //保存到闭包中
    function Range(from,to) {
        this.from=function () {
            return from;
        };
        this.to=function () {
            return to;
        };
    }

    Range.prototype = {
        constructor: Range,
        includes: function (x) {
            return this.from() <= x && x <= this.to();
        },
        foreach: function (f) {
            for (varx = Math.ceil(this.from()), max = this.to(); x <= max; x++) f(x);
        },
        tostring: function () {
            return "(" + this.from + ")" + "..." + this.to + ")";
        }
    };

    var r = new Range(1, 5);
    r.from = function () {
        return 0;
    };
    console.log(r);
```
#### 实例与方法

### 子类