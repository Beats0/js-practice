#### 全局变量指向window.name
```
var name = "abc";
function myname() {
    alert(this.name);
}
// alert(window.name);//abc
// myname();//abc
// window.myname();//abc

var btn = document.getElementById("btn");
var con = document.getElementById("con");
var ipt = document.getElementsByName("ipt");
```
#### 窗口位置
```
var left = window.screenLeft;
var left = window.screenX;//FireFox
alert(left);
```
#### 窗口打开
```
//window.open() 参数：URL(link)，name（targe），feature(字符串)
 btn.onclick = function () {
     window.open("https://www.baidu.com","_blank","resizable=no,height=500,width=800,left=300,top=100");
 }
```
#### 系统对话框
```
//alert()，confirm()，prompt()
var choose = confirm("你是coder吗？");
 if (choose) {
     alert("yes!");
 } else {
     alert("no!");
 }
//prompt
var choose2 = prompt("你的名字是“ ”");
if (choose2 == null) {
    var chooseno = prompt("你的名字是“ ”")
} else {
    alert("你好"+choose2);
}

//navigator对象 参数：userAgent用户代理字符串,onLine是否连网络,platform平台
console.log(navigator.userAgent);

//history保存用户上网历史记录（从窗口代开开始算起），go()跳转到
btn.onclick = function () {
    history.go(-1);
}
```
#### 获取元素样式
```
//getComputedStyle(nodeObj,false); 1为节点对象，2为false或null，建议为null兼容IE9，IE8以下不支持
var con_style_width = getComputedStyle(con,false).width;
var attr = "width";
var con_style_height = getComputedStyle(con,false)[attr];//以变量属性的方法
console.log(con_style_width);
console.log(con_style_height);
//currentStyle['attr'] 返回为对象，计算后样式的属性值对的集合

// var style_current = con.currentStyle["height"];

if (con.currentStyle) {
    var con_style = getComputedStyle["width"];
} else {
    var con_style = getComputedStyle(con,false)["width"];
}
console.log(con_style);//兼容性
```
#### 封装类库
```
function getStyle(obj,attr) {
    if (obj.currentStyle) {
        var style = obj.currentStyle[attr];
    } else {
        var style = getComputedStyle(obj,false)[attr];
    }
    return style;
}
console.log(getStyle(con,"height"));
```