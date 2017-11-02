#### test1声明变量与函数
```
function text(a,b) {
    var c = (a+b)*b;//var显示声明
    return c;
}
console.log(text(1,5));

function fn1(color) {
    //alert(color);
}
fn1("red");
```
#### 全局变量与局部变量
```
var list = document.getElementById('list');
    console.log(list);
var  lis = list.getElementsByTagName('li');
    console.log(lis[2]);
    console.log(lis.length);
    //var lis = [li,li,li,li,li];

    lis[0].onclick = function () {
        lis[0].style.backgroundColor="red";
    }
    lis[1].onclick = function () {
        lis[1].style.backgroundColor="red";
    }
    //使用for循环,this
    for (var i = 2; i < 5; i++) {
        lis[i].onclick=function () {
            this.style.backgroundColor="hotpink";
        }
    }
// 使用TagName
// var lis = list.getElementsByTagName("li")[1];
//     lis.onclick = function () {
//         this.style.backgroundColor="red";
//     }
```
#### test2焦点
```
//onfocus与onblur
var userName = document.getElementsByTagName('input')[0];
userName.onfocus = function () {
    if (userName.value=="输入账号") {
        userName.value="";
    }
}
userName.onblur = function () {
    if (userName.value=="") {
        userName.value="输入账号";
    }
}
```
#### 声明变量
```
var a1 = "100";//显式声明
a2 = 200;//隐式声明，全局变量
function fn2() {
    var a = 300;
    alert(a);
}
fn2();
```

#### 声明提升
```
var x = 10;//全局变量
function outer() {
    //alert(x);//undefined
    var x = 20;//局部变量提升
    function inner() {
        var x = 30;
        alert(x);
    }
    inner();
    alert(x);
}
outer();
alert(x)
// 函数名优先于变量名
// console.log(fn2())
// var fn2 = "333";
// function fn2() {
//     alert("222");//222函数名优先于变量名，将会覆盖变量名
// }

//调用
var calculator = {
    x: 1,
    y: 1,
    add: function () {
        this.result = this.x + this.y;//this当前对象
    }
};
calculator.add();//调用1+1
console.log(calculator.result);//2 结果
```
#### this值调用
```
var o = {                               //对象o
    m: function () {                    //对象中的方法m()
        var self = this;                //将this值保存在一个变量中
        console.log(this === o);        //“true”：this就是这个对象{m：f}
        f();                            //调用辅助函数f()

        function f() {                  //定义嵌套函数f()
            console.log(this === o);    //"faLse"：this的值为全局对象或undefined
            console.log(self === o);    //“true”：self指外部函数的this值{m：f}
        }
    }
};
o.m();                                  //调用对象o的方法
```
#### 元素值
```
// innerHTML获取标签中的内容（包含标签）
// var val = abj.innerHTML;获取值
// abj.innerHTML = “新值”;设置值
var ipt = document.getElementById('ipt');
var inner2 = document.getElementById('inner');
ipt.onclick = function () {
    inner2.innerHTML="233";
    console.log(inner2.innerHTML);
}
// inner span
var ipt3 = document.getElementById('ipt3');
var inner3 = document.getElementById('inner3');
ipt3.onclick = function () {
    inner3.innerHTML="<span>23333</span>";//<span>2333</span> 作为标签
    console.log(inner3.innerHTML);//打印<span>2333</span>字符串
    //inner3.innerText="<span>23333</span>";//打印<span>2333</span> 作为字符串
    console.log(inner3.innerText);//打印2333 作为标签
}
```
#### value 表单 submit等
```
var ipt4 = document.getElementById("ipt4");
var txt = document.getElementById("txt");
var slt = document.getElementById("slt");
var con = document.getElementById("con");
sub.onclick = function () {
    con.innerHTML = ipt4.value+","+txt.value+","+slt.value;
}
```
#### test3 数组arr
```
// var arr = [];
var arr1 = ["1","2","3"];//创建数组
console.log(arr1[0]);
arr1[0] = "newarr1";//赋新值
console.log(arr1[0]);//newarr1
console.log(arr1.length);//数组长度
var arr2 = new Array();//创建数组
//var arr3 = new Array(size);//创建数组的长度
var arr4 = new Array("b1","b2","b3","b4");
```
#### 数组操作
```
// var len = arr4.push("b5","b6");//将元素添加到末尾，并返回新长度
// console.log(arr4);//["b1", "b2", "b3", "b4", "b5", "b6"]
// console.log(len);//6

// var len = arr4.unshift("b5","b6");//将元素添加到开始，并返回新长度
// console.log(arr4);//["b5", "b6", "b1", "b2", "b3", "b4"]
// console.log(len);//6

// var last = arr4.pop();//删除数最后一项，并返回删除的元素
// console.log(arr4);//["b1", "b2", "b3"]
// console.log(last);//b4

// var first = arr4.shift();//删除数组第一项，并返回删除的元素
// console.log(arr4);//["b2", "b3", "b4"]
// console.log(first);//b1

//for循环
// for (var i = 0; i <arr.length; i++) {
//      document.write(arr[i]+",");
//  }
for (var i2 = 0; i2 < arr4.length; i2++) {
    document.write(arr4[i2]+",");//b1,b2,b3,b4,
}
//for-in循环遍历
// for (var item in arr) {
//     document.write(arr[item]+",");
// }
for (var i3 in arr4) {
    document.write(arr4[i3]+",");//b1,b2,b3,b4,
}
//for each
// var newarr4 = arr4.forEach(function (item,index) {
//     document.write(item+",");//b1,b2,b3,b4,
// })
var date = [1,2,3,4,5];
var sumofSquares = 0;
date.forEach(function (x) {
    sumofSquares += x*x;
})
console.log(sumofSquares);
//map
var newarr5 = arr4.map(function (item2,index) {
    document.write(item2+",");//b1,b2,b3,b4,
    return item2+2;
})
console.log(newarr5);
//["b12", "b22", "b32", "b42"]
```

#### 数组操作
##### splice
```
// splice(1,2) 从1的位置开始（含1）向后删除2个元素，以数组形式返回所有移除的元素
// var newArray = arrsplice(1,2);
// arr.splice(1,2,v1,v2);在删除元素的位置添加元素v1，v2
var arr6 = ["a2","b2","c2","d2"];
// var newarr6 = arr6.splice(1,2);
// console.log(arr6);//["a2", "d2"]
// console.log(newarr6);//["b2", "c2"]
arr6.splice(0,3,"newa2","newb2","newc2");
console.log(arr6);
// ["newa2", "newb2", "newc2", "d2"]
```
##### slice
```
// slice(start,end)以数组的形式返回数组的一部分，不包括end位置的元素，如果省略end将会复制start及以后的所有元素
var newarr7 = arr4.slice(0,2);
console.log(newarr7);//["b1", "b2"]
console.log(arr4);
// ["b1", "b2", "b3", "b4"]原数组无变化
```
#####　jion
```
// join(‘分隔符’)用数组的元素组成字符串
// var str = arr.join('-');
var str = arr4.join('-');
console.log(str);
// b1-b2-b3-b4 string
```
##### concat
```
// concat用于合并数组并返回一个新数组
// var newArray = arr.concat(arra1.array2,.....arrayN);
var arrconcat = arr4.concat(arr6);
console.log(arrconcat);
// ["b1", "b2", "b3", "b4", "newa2", "newb2", "newc2", "d2"]
```
##### reverse
```
// reverse将数组反转
// var newArray = arr.reverse();
var arrreverse = arr4.reverse();
console.log(arrreverse);
// ["b4", "b3", "b2", "b1"]
```
##### sort
```
// newArray = arr.sort() 对数组进行排序（ASCll码方式）
var arrsort = [5,23,6,9,42,63,78,91];
console.log(arrsort.sort());
// [23, 42, 5, 6, 63, 78, 9, 91]
```
##### sort(function(a,b){return a-b})升序（冒泡排序方式）
```
 console.log(arrsort.sort(function (a,b) {
     return a-b;
 }))
// [5, 6, 9, 23, 42, 63, 78, 91]
// /**sort(function(a,b){return a-b})降序（冒泡排序方式）**/
// console.log(arrsort.sort(function (a,b) {
//     return a+b;
// }))
// // [91, 9, 78, 63, 6, 5, 42, 23]
```
##### 多维数组与查询
```
// var table = new  Array(10);//表格10行
// for (var i = 0;i < table;i++)
//      table[i] = new Array(10);//表格10列
//  //初始化数组
// for (var row = 0;row < table.length;row++) {
//     for (col = 0;col < table[row].length;col++) {
//         table[row][col] = row*col;
//     }
// }
// //查询9*9表
// var product = table[5][7];
// console.log(table);
// console.log(product);

document.write("<table style='border: 1px solid black'>");
 for (var i = 1;i <= 9;i++) {
     document.write("<tr>");
     for (var j = 1;j <= i;j++) {
         document.write("<td style='text-align: center;border: 1px solid black'>");
         document.write(i + "X" + j + "=" + i*j);
         document.write("</td>");
     }
     // document.write("<br/>");
     document.write("</tr>");
 }
document.write("</table>");
```