### 计时器
####计时器分为间歇调用和超时调用
##### 间歇调用为每一段时间执行一段代码，超时调用指在指定时间后执行代码
```
// 如果要取消，可以在超时之前取消调用计划：clearTimeout(计时器)
var time = null;
//超时调用指：setTimeout(函数/函数名，毫秒数)
// setTimeout(function () {
//     alert("3s后执行！");
// },3000);
function fn1() {
    alert("3s后执行！");
}
time = setTimeout(fn1,3000);//只用函数名
//清除
var btn2 = document.getElementById('btn2');
btn2.onclick = function () {
    clearTimeout(time);
}
```
#### 间歇调用：setInterval(函数/函数名，毫秒数)
```
var time2 = null;
time2 = setInterval(function () {
    alert("持续执行");
},3000);
//清除
var btn3 = document.getElementById('btn3');
btn3.onclick = function () {
    clearInterval(time2);
}
var ipt = document.getElementById('ipt');
var con = document.getElementById('con');
var time4 = null;
time4 = setInterval(function () {
    var words = ipt.value;
    con.innerHTML = words;
},10);
```
```
today = new Date();
christmas = new Date();
christmas.setMonth(11);//月份为12月
christmas.setDate(25);
christmas.setMinutes(0);
christmas.setMilliseconds(0);
if (today.getTime() < christmas.getTime()) {
    difference = christmas.getTime() - today.getTime();
    differenceDay = Math.floor(difference/(1000*60*60*24));
    differenceHour = Math.floor(difference/(1000*60*60*24*24));
    differenceMinutes = Math.floor(difference/(1000*60*60*24*24*60));
    differenceMilliseconds = (difference/(1000*60*60*24*24*60*1000));
    document.write("距离圣诞节还有" + differenceDay + "天," + differenceHour + "小时" +differenceMinutes +"分钟"+differenceMilliseconds+"秒");
}
```