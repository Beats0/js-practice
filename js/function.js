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
