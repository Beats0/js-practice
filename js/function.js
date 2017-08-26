function text(a,b) {
    var c=(a+b)*b;
    return c;
}
console.log(text(1,5));

function fn1(color) {
    //alert(color);
}
fn1("red");

//test1声明变量与函数
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














