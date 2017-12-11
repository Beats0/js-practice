#### let与块级作用域
##### `var`
```js
for (var i = 0; i < 10; i++) {
    //......
}
console.log(i);         //10
```
##### `let`
```js
for (let i = 0; i < 10; i++) {
    //......
}
console.log(i);         //Error:i is not defined
```
##### `剩余参数`与`分布参数`
```js
function sum(num1, num2, ...nums) {
    var result = num1 + num2;
    for (let i = 0, len = nums.length; i < len; i++) {
        result += nums[i];
    }
    return result;
}

var result = sum(1, 2, 3, 4, 5, 6);        //21
```
##### 生成器
```js
function myNumbers() {
    for (var i = 0; i < 10; i++) {
        yield  i * 2;
    }
}

var generator = myNumbers();
try {
    while (true) {
        document.write(generator.next() + "<br/>");
    }
} catch (ex) {
    //......
} finally {
    generator.close();
}
```
##### 迭代器
```js
var person = {
    name: "Beats0",
    age: 29
};
var iterator = new Iterator(person);
try {
    while (true) {
        let value = iterator.next();
        document.write(value.join(";") + "<br/>");
    }
} catch (ex) {
    //......
} finally {
    generator.close();
}
```
#### 数组领悟
##### 形式
```js
var arrayComprehension=[value for each {variable in values} condition];
//注：必须使用JavaScript type属性为"application/javascript;version=1.7"
```
```
//原始数组
var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
//复制
var duplicate = [i for each(i in numbers)];
//偶数
var evens = [i for each(i in numbers) if (i % 2 == 0)];
//每个数乘2后的结果放到新数组中
var double = [i * 2 for each(i in numbers)];
//每个奇数乘以3后放到新数组中
var tripledOdds = [i * 3 for each(i in numbers) if (i % 2 > 0)];
```
##### 解构赋值
```js
var [name,age]=["Beats0","19"];
//  name:Beats0
//  age:19

var person2 = {
    name: "Beats0",
    age: 19
};
var {name: personName, age: personAge} = person2;
alert(personName);          //Beats0
alert(personAge);           //19
```
##### 代理对象

##### 代理函数

##### 映射集合

##### 类

##### 私有成员

##### `getter`与`setter`

##### 继承

##### 模块

## 严格模式
###### 以下严格模式参考自:[阮一峰-Javascript 严格模式详解](http://www.ruanyifeng.com/blog/2013/01/javascript_strict_mode.html)
全局使用
```js
"use strict";
```
局部函数使用：
```js
function dosomething() {
    "use strict";
}
```
###### 语法和行为改变
严格模式对Javascript的语法和行为，都做了一些改变。

全局变量显式声明
在正常模式中，如果一个变量没有声明就赋值，默认是全局变量。严格模式禁止这种用法，全局变量必须显式声明。
```js
"use strict";
　　v = 1; // 报错，v未声明
　　for(i = 0; i < 2; i++) { // 报错，i未声明
　　}
```
##### 静态绑定

Javascript语言的一个特点，就是允许"动态绑定"，即某些属性和方法到底属于哪一个对象，不是在编译时确定的，而是在运行时（runtime）确定的。
严格模式对动态绑定做了一些限制。某些情况下，只允许静态绑定。也就是说，属性和方法到底归属哪个对象，在编译阶段就确定。这样做有利于编译效率的提高，也使得代码更容易阅读，更少出现意外。
具体来说，涉及以下几个方面。

（1）禁止使用`with`语句

因为with语句无法在编译时就确定，属性到底归属哪个对象。
```js
　　"use strict";
　　var v = 1;
　　with (o){ // 语法错误
　　　　v = 2;
　　}
```
（2）创设`eval`作用域

正常模式下，Javascript语言有两种变量作用域（scope）：全局作用域和函数作用域。严格模式创设了第三种作用域：eval作用域。
正常模式下，eval语句的作用域，取决于它处于全局作用域，还是处于函数作用域。严格模式下，eval语句本身就是一个作用域，不再能够生成全局变量了，它所生成的变量只能用于eval内部。
```js
"use strict";
　　var x = 2;
　　console.info(eval("var x = 5; x")); // 5
　　console.info(x); // 2
```
##### 增强的安全措施

（1）禁止this关键字指向全局对象
```js
　　function f(){
　　　　return !this;
　　}
　　// 返回false，因为"this"指向全局对象，"!this"就是false
　　function f(){
　　　　"use strict";
　　　　return !this;
　　}
　　// 返回true，因为严格模式下，this的值为undefined，所以"!this"为true。
```
因此，使用构造函数时，如果忘了加new，this不再指向全局对象，而是报错。
```js
　　function f(){
　　　　"use strict";
　　　　this.a = 1;
　　};
　　f();// 报错，this未定义
```
###### 禁止在函数内部遍历调用栈
```js
　　function f1(){
　　　　"use strict";
　　　　f1.caller; // 报错
　　　　f1.arguments; // 报错
　　}
　　f1();
```
###### 禁止删除变量
严格模式下无法删除变量。只有configurable设置为true的对象属性，才能被删除。
```js
　　"use strict";
　　var x;
　　delete x; // 语法错误
　　var o = Object.create(null, {'x': {
　　　　　　value: 1,
　　　　　　configurable: true
　　}});
　　delete o.x; // 删除成功
```
##### 显式报错

正常模式下，对一个对象的只读属性进行赋值，不会报错，只会默默地失败。严格模式下，将报错。
```js
　　"use strict";

　　var o = {};
　　Object.defineProperty(o, "v", { value: 1, writable: false });
　　o.v = 2; // 报错
```
严格模式下，对一个使用getter方法读取的属性进行赋值，会报错。
```js
　　"use strict";

　　var o = {

　　　　get v() { return 1; }
　　};
　　o.v = 2; // 报错
```
严格模式下，对禁止扩展的对象添加新属性，会报错。
```js
　　"use strict";
　　var o = {};
　　Object.preventExtensions(o);
　　o.v = 1; // 报错
严格模式下，删除一个不可删除的属性，会报错。
　　"use strict";
　　delete Object.prototype; // 报错
```
###### 重名错误
严格模式新增了一些语法错误。

（1）对象不能有重名的属性

正常模式下，如果对象有多个重名属性，最后赋值的那个属性会覆盖前面的值。严格模式下，这属于语法错误。
```js
　　"use strict";
　　var o = {
　　　　p: 1,
　　　　p: 2
　　}; // 语法错误
```
（2）函数不能有重名的参数

正常模式下，如果函数有多个重名的参数，可以用`arguments[i]`读取。严格模式下，这属于语法错误。
```js
　　"use strict";
　　function f(a, a, b) { // 语法错误
　　　　return ;
　　}
```
###### 禁止八进制表示法
正常模式下，整数的第一位如果是0，表示这是八进制数，比如0100等于十进制的64。严格模式禁止这种表示法，整数第一位为0，将报错。
```js
　　"use strict";
　　var n = 0100; // 语法错误
```
###### arguments对象的限制

arguments是函数的参数对象，严格模式对它的使用做了限制。

（1）不允许对arguments赋值
```js
　　"use strict";
　　arguments++; // 语法错误
　　var obj = { set p(arguments) { } }; // 语法错误
　　try { } catch (arguments) { } // 语法错误
　　function arguments() { } // 语法错误
　　var f = new Function("arguments", "'use strict'; return 17;"); // 语法错误
```
（2）arguments不再追踪参数的变化
```js
　　function f(a) {
　　　　a = 2;
　　　　return [a, arguments[0]];
　　}
　　f(1); // 正常模式为[2,2]
　　function f(a) {
　　　　"use strict";
　　　　a = 2;
　　　　return [a, arguments[0]];
　　}
　　f(1); // 严格模式为[2,1]
```
（3）禁止使用`arguments.callee`

这意味着，你无法在匿名函数内部调用自身了。
```js
　　"use strict";
　　var f = function() { return arguments.callee; };
　　f(); // 报错
```
###### 函数必须声明在顶层

将来Javascript的新版本会引入"块级作用域"。为了与新版本接轨，严格模式只允许在全局作用域或函数作用域的顶层声明函数。也就是说，不允许在非函数的代码块内声明函数。
```js
"use strict";
　　if (true) {
　　　　function f() { } // 语法错误
　　}
　　for (var i = 0; i < 5; i++) {
　　　　function f2() { } // 语法错误
　　}
```
###### 保留字
为了向将来Javascript的新版本过渡，严格模式新增了一些保留字：`implements`, `interface`, `let`, `package`, `private`, `protected`, `public`, `static`, `yield`。

使用这些词作为变量名将会报错。
```js
　　function package(protected) { // 语法错误
　　　　"use strict";
　　　　var implements; // 语法错误
　　}
```
此外，ECMAscript第五版本身还规定了另一些保留字（`class`, `enum`, `export`, `extends`, `import`, `super`），以及各大浏览器自行增加的`const`保留字，也是不能作为变量名的。

#### 变量

#### 对象

#### 函数

#### eval()

#### eval()与arguments

#### 抑制this


## JavaScript库类

