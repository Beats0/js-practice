### 事件处理
#### event事件
```
//event属性：type获取 | target绑定DOM元素 | keyCode键码 | relatedTarget移入移出DOM元素 | currenTarge获取冒泡前触发DOM元素与this | pageX/pageY获取相对页面的水平垂直坐标
var con = document.getElementById("con");
con.onclick = function (e) {
    // console.log(e);
    var e = e||window.event;
    console.log(e);//IE兼容性
    console.log(e.type);//clik
    console.log(e.target);//节点及以下所有DOM元素
}
//keyCode阻止右键事件兼容
con.oncontextmenu = function (e) {
    var e = e || window.event;
    if (e.preventDefault) {
        e.preventDefault();
    } else {
        e.returnValue(false);//IE
    }
    alert("不可使用右键菜单");
}
```
#### math对象 为全局对象
```
//math.PI | abs() | ceil()向上舍入最近的整数 | floor()向下舍入最近的整数 | min() | max() |
var a = 1;
var b = -1;
var c =2.3333;
var a1 = Math.abs(a);
var b1 = Math.abs(b);
console.log(a1);
console.log(b1);//1
console.log(Math.ceil(c));//3
console.log(Math.floor(c));//2
// if (a < b) {
//     if (a < c) {
//         console.log(a)
//     } else {
//         console.log(c)
//     }
// } else {
//     if (b < c) {
//         console.log(b)//min = -1
//     } else {
//         console.log(c)
//     }
// }
console.log(Math.min(a,b,c));//min = -1
//Math.round()四舍五入 | random()求出0-1的随机数
console.log(Math.round(c));//2
console.log(Math.random());//0-1中的随机数0.6072557380996593
console.log(Math.floor(Math.random()*10+20));//20-30的随机整数
```
#### Date对象
```
document.write(new Date());
//new Date(milliseconds)指定时间毫秒数
document.write(new Date(1412312323231));
//new Date(dateStr)将字符串转化为Date对象，格式为“yyyy/MM/dd HH：mm：ss”
document.write(new Date("2017/09/09 16:00:00"));
var datenow = new Date();
var dateyear = datenow.getFullYear();
document.write(dateyear);//现在的年份

function test(o) {
    var i = 0;
    if (typeof o == "object") {
        var j= 0;
        for (var k = 0;k < 10;k++) {
            console.log(k);
        }
        console.log(k);
    }
    console.log(j);
}
```
#### 抛出异常
```
// function fa(x) {
//     if (x<0)
//         throw new Error("不能是负数");
//     for (var f=1;x>1;f *= x,x--);
//         return f;
// }

try {
    var n = Number(prompt("输入一个正整数",""));
    var f = factorial(n);
    alert(n+"!="+f);
}
catch (ex) {
    alert(ex);
}
```