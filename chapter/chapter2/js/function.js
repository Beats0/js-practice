var str1 = "aBcDeFC";
console.log(str1);
// console.log(str1.toLowerCase());//小写
// console.log(str1.toUpperCase());//大写
// indexOff()返回字符串第一处出现的索引，没有匹配的返回-1；
console.log(str1.indexOf("c"));//2 区分大小写
// lastindexOf() 返回字符串子串最后出现的索引，没有匹配的返回-1；
console.log(str1.lastIndexOf("C"));//6
var str2 = new String("abc");
console.log(str2+"123");//abc123

//slice()从已有的字符串中提取部分字符串，返回新的字符串
// var str = string.slice(start[,end]);
// slice返回的字符串包括start处的字符，但是不包括end处的字符；
var str3 = str1.slice(1,3);
console.log(str3);//Bc

//split()用于吧字符串分割成字符串数组；
// var arr = string.split('分隔符'[.length]);
// 第一个参数必须，指定分隔符，第二个参数可选，为返回数组长度；
var str4 = 'a=bc=def=g';
var arr1 = str4.split("=");
var arr2 = str4.split("");
var arr3 = str4.split("",3);//3为length
console.log(arr1);//["a", "bc", "def", "g"]
console.log(arr2);//["a", "=", "b", "c", "=", "d", "e", "f", "=", "g"]
console.log(arr3);//["a", "=", "b"]

//substr()
// var str = string.substr(start[,length]);
// start必需，字符串起始位置；length可选
var str5 = str1.substr(2,5);
console.log(str5);//cDeFC

//substring()返回介于两个指定下标之间的字符；
// var str = string.substringr(start[,end]);
// 返回的字符串包括start处的字符，但不包括end处的字符；
var str6 = str1.substring(2,5);
console.log(str6);//cDe

//concat()将两个字符串文本组合起来并返回一个新的字符串；
// var strconcat = str1.concat(str2);
var strconcat = str1.concat(str2);
console.log(strconcat);//aBcDeFCabc

//charAt()返回指定的字符
// var strcharAt = str.charAt(num);num为字符串中的下标；
var strcharAt = str1.charAt(2);
console.log(strcharAt);//c

//parseInt(string)将字符串转换为整数返回
//parseFloat(string)将字符串转换为浮点数返回
//toString()用于将当前对象以字符串形式返回
//如果解析不到就返回NaN
var str6 = "200px";
var num1 = parseInt(str6);
console.log(num1);//200
var str6 = "a200px";
var num1 = parseInt(str6);
console.log(num1);//NaN
var str7 = "200.123";
var num2 = parseFloat(str7);
console.log(num2);//200.123
var num3 = 10;
var str8 = num3.toString();
console.log(str8);//10为字符串类型
// var str = bool.toString();//布尔型

//字符串拼接
var a = "abc"+"xyz";//abcxyz
var a = 10+10;//20
var a = "abc"+10;//abc10
var a = "abc"+10+20+"xyz";//abc1020zyx
var a= 10+20+"abc"+"xyz"//30abcxyz
console.log(a);

(function () {
    //test1声明变量与函数
    function text(a,b) {
        var c = (a+b)*b;//var显示声明
        return c;
    }
    console.log(text(1,5));

    function fn1(color) {
        //alert(color);
    }
    fn1("red");
//全局变量与局部变量
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

//test2焦点
//onfocus与onblur
    var userName = document.getElementsByTagName('input')[0];
    var userPasswd = document.getElementsByTagName('input')[1];
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
//声明变量
    var a1 = "100";//显式声明
    a2 = 200;//隐式声明，全局变量
    function fn2() {
        var a = 300;
        alert(a);
    }
    fn2();
//声明提升
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

//元素值
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
//value 表单 submit等
    var ipt4 = document.getElementById("ipt4");
    var txt = document.getElementById("txt");
    var slt = document.getElementById("slt");
    var con = document.getElementById("con");
    sub.onclick = function () {
        con.innerHTML = ipt4.value+","+txt.value+","+slt.value;
    }

// test3 数组arr
// var arr = [];
    var arr1 = ["1","2","3"];//创建数组
    console.log(arr1[0]);
    arr1[0] = "newarr1";//赋新值
    console.log(arr1[0]);//newarr1
    console.log(arr1.length);//数组长度
    var arr2 = new Array();//创建数组
//var arr3 = new Array(size);//创建数组的长度
    var arr4 = new Array("b1","b2","b3","b4");
// 数组操作
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
    var newarr4 = arr4.forEach(function (item,index) {
        document.write(item+",");//b1,b2,b3,b4,
    })
//map
    var newarr5 = arr4.map(function (item2,index) {
        document.write(item2+",");//b1,b2,b3,b4,
        return item2+2;
    })
    console.log(newarr5);
//["b12", "b22", "b32", "b42"]

//数组操作
    /*splice*/
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
    /*slice*/
// slice(start,end)以数组的形式返回数组的一部分，不包括end位置的元素，如果省略end将会复制start及以后的所有元素
    var newarr7 = arr4.slice(0,2);
    console.log(newarr7);//["b1", "b2"]
    console.log(arr4);
// ["b1", "b2", "b3", "b4"]原数组无变化
    /*jion*/
// join(‘分隔符’)用数组的元素组成字符串
// var str = arr.join('-');
    var str = arr4.join('-');
    console.log(str);
// b1-b2-b3-b4 string
    /*concat*/
// concat用于合并数组并返回一个新数组
// var newArray = arr.concat(arra1.array2,.....arrayN);
    var arrconcat = arr4.concat(arr6);
    console.log(arrconcat);
// ["b1", "b2", "b3", "b4", "newa2", "newb2", "newc2", "d2"]
    /*reverse*/
// reverse将数组反转
// var newArray = arr.reverse();
    var arrreverse = arr4.reverse();
    console.log(arrreverse);
// ["b4", "b3", "b2", "b1"]
    /*sort*/
// newArray = arr.sort() 对数组进行排序（ASCll码方式）
    var arrsort = [5,23,6,9,42,63,78,91];
    console.log(arrsort.sort());
// [23, 42, 5, 6, 63, 78, 9, 91]
    /**sort(function(a,b){return a-b})升序（冒泡排序方式）**/
    console.log(arrsort.sort(function (a,b) {
        return a-b;
    }))
// [5, 6, 9, 23, 42, 63, 78, 91]
// /**sort(function(a,b){return a-b})降序（冒泡排序方式）**/
// console.log(arrsort.sort(function (a,b) {
//     return a+b;
// }))
// // [91, 9, 78, 63, 6, 5, 42, 23]
}());