//let与块级作用域
//var
for (var i = 0; i < 10; i++) {
    //......
}
console.log(i);         //10

//let
for (let i = 0; i < 10; i++) {
    //......
}
console.log(i);         //Error:i is not defined

//剩余参数与分布参数
function sum(num1, num2, ...nums) {
    var result = num1 + num2;
    for (let i = 0, len = nums.length; i < len; i++) {
        result += nums[i];
    }
    return result;
}

var result = sum(1, 2, 3, 4, 5, 6);        //21

生成器

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

//迭代器
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

//数组领悟
//形式
// var arrayComprehension=[value for each {variable in values} condition];
//注：必须使用JavaScript type属性为"application/javascript;version=1.7"
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

//解构赋值
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

//代理对象

//代理函数

//映射集合

//类

//私有成员

//getter与setter

//继承

//模块


"use strict";

function dosomething() {
    "use strict";
}