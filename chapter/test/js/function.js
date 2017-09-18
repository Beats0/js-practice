// var a =['ant','Big','cat','Dog'];
// console.log(a);
// a.sort();
// console.log("区分大小写"+a);
// a.sort(function (s,t) {
//     var a = s.toLowerCase();
//     var b = t.toLowerCase();
//     if (a < b) return -1;
//     if (a > b) return 1;
//     return 0;
// })
// console.log("不区分大小写"+a);
 var a = [1,2,3,4,5];
// console.log(a);
// console.log(a.splice(4));
// console.log("a="+a);
// console.log(a.splice(1,2));
// console.log("a="+a);
// console.log(a.splice(1,1));
// console.log("a="+a);
console.log("a="+a);
console.log(a.splice(2,0,'a','b'));
console.log("a="+a);
console.log(a.splice(2,2,[1,2],3));
console.log("a="+a);

// name 是 Person 本身的属性
function Person(name) {
    this.name = name;
}
// describe是Person.prototype的属性
Person.prototype.describe = function () {
    return 'Name: '+this.name;
};
var person = new Person('Jane');
// for...in循环会遍历实例自身的属性（name），
// 以及继承的属性（describe）
for (var key in person) {
    console.log(key);
}
// name
// describe

//with
var o = {
    name: 'Alice'
};
var p = [];
with (o) {
    p.push('Hello ', name, '!');
};
console.log(p.join('')) // "Hello Alice!"
//with模板抽插
// var str = 'Hello <%= name %>!';
// var o = {
//     name: 'Alice'
// };
// function tmpl(str, obj) {
//     str = 'var p = [];' +
//         'with (obj) {p.push(' + parser(str) + ')};' +
//         'return p;'
//     var r = (new Function('obj', str))(obj);
//     return r.join('');
// }
// tmpl(str, o)
// // "Hello Alice!"

//数组的某个位置是空位，与某个位置是undefined，是不一样的。如果是空位，使用数组的forEach方法、for...in结构、以及Object.keys方法进行遍历，空位都会被跳过。
var a = [undefined, undefined, undefined];
a.forEach(function (x, i) {
    console.log(i + '. ' + x);
});
// 0. undefined
// 1. undefined
// 2. undefined
for (var i in a) {
    console.log(i);
}
// 0
// 1
// 2
Object.keys(a)
// ['0', '1', '2']



function add(x, y) {
    return x + y;
}
console.log(add(1,2));

//变量提升
if (false) {
    function f() {}
}
f() // 不报错
// 上面代码的原始意图是不声明函数f，但是由于f的提升，导致if语句无效，所以上面的代码不会报错。要达到在条件语句中定义函数的目的，只有使用函数表达式。

if (false) {
    var f = function () {};
}
f() // undefined

var obj = [1, 2, 3];
function f(o){
    o = [2, 3, 4];
}
f(obj);
console.log(obj);// [1, 2, 3]

var a = [1,2,3,4];
for (var i in a) {
    console.log(a[i]);
}

function foo() {
    var x = 1;
    function bar() {
        console.log(x);
    }
    return bar;
}
var x = 2;
var f = foo();
f() // 1

function inputnum() {
    var sinputnum=prompt("输入一个1-7的整数");
    try {
        if (sinputnum == parseInt(sinputnum)) {
            if (parseInt(sinputnum>7) || parseInt(sinputnum)<1) {
                alert("输入的不是1-7的整数");
            }
            else {
                switch (parseInt(sinputnum)) {
                    case 1:alert("星期一");break;
                    case 2:alert("星期二");break;
                    case 3:alert("星期三");break;
                    case 4:alert("星期四");break;
                    case 5:alert("星期五");break;
                    case 6:alert("星期六");break;
                    case 7:alert("星期日");break;
                    default:
                    break;
                }
            }

        }
        else {
            alert("输入的不是一个整数");
        }
    }
    catch (e) {
        alert("输入的不是一个整数");
    }
}
inputnum();