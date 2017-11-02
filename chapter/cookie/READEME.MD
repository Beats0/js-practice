### cookie
```
var paras=document.getElementsByTagName("p");
for (var i=0;i<paras.length;i++)
    var title_text=paras[i].getAttribute("title");
if  (title_text) alert((title_text));

//创建一个函数来检查是否已设置 cookie：
function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=")
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1
            c_end = document.cookie.indexOf(";", c_start)
            if (c_end == -1) c_end = document.cookie.length
            return unescape(document.cookie.substring(c_start, c_end))
        }
    }
    return ""
}
//创建一个可在 cookie 变量中存储访问者姓名的函数：参数存有 cookie 的名称、值以及过期天数。
function setCookie(c_name, value, expiredays) {
    var exdate = new Date()
    exdate.setDate(exdate.getDate() + expiredays)
    document.cookie = c_name + "=" + escape(value) +
        ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())//将天数转换为有效的日期，然后，我们将 cookie 名称、值及其过期日期存入 document.cookie 对象。
}
//如果 cookie 已设置，则显示欢迎词，否则显示提示框来要求用户输入名字。
function checkCookie() {
    username = getCookie('username')
    if (username != null && username != "") {
        alert('Welcome again ' + username + '!')
    }
    else {
        username = prompt('Please enter your name:', "")
        if (username != null && username != "") {
            setCookie('username', username, 365)
        }
    }
}
```
#### 创建
```
// document.cookie = "user1=test1";
// document.cookie = "user2=test2";
// document.cookie = "user3=test3";
// //有效期
// var dates = new Date();
// dates.setDate(dates.getDate() + 3);
// document.cookie = "password123;expires=" + dates;
// //获取cookie
// var cookies = document.cookie;
// document.write(cookies);
// //切割cookie
// // var cookiesArr = cookies.split("; ");
// // document.write(cookiesArr);
// // for (var i=0;i<cookiesArr.length;i++) {
// //     var cookiesEach = cookiesArr[i].split("=");
// //     console.log(cookiesEach);
// // }
// //cookie封装
// function getCookie(key) {
//     var CookieArr = document.cookie.split("; ");
//     for (var i = 0; i < CookieArr.length; i++) {
//         var CookieEach = CookieArr[i].split("=");
//         if (CookieEach[0] == key) {
//             return CookieEach[1];
//         }
//     }
//     return false;
// }
// console.log(getCookie("user1"));
// //删除cookie
// var date2=new Date();
// date2.setDate(date2.getDate()-1);
// document.cookie="password=123;expires="+date2;
```