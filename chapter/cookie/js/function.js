var paras = document.getElementsByTagName("p");
for (var i = 0; i < paras.length; i++)
     var title_text = paras[i].getAttribute("title");
if (title_text) alert((title_text));

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

//创建一个可在 cookie_session 变量中存储访问者姓名的函数：参数存有 cookie_session 的名称、值以及过期天数。
function setCookie(c_name, value, expiredays) {
    var exdate = new Date()
    exdate.setDate(exdate.getDate() + expiredays)
    document.cookie = c_name + "=" + escape(value) +
        ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())//将天数转换为有效的日期，然后，我们将 cookie_session 名称、值及其过期日期存入 document.cookie_session 对象。
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

// //创建
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


//Cookie
//CookieUtil()
let CookieUtil = {
    get: function (name) {
        let cookieName = encodeURIComponent(name) + "=",
            cookieStart = document.cookie.indexOf(cookieName),
            cookieValue = null;

        if (cookieStart > -1) {
            let cookieEnd = document.cookie.indexOf(";", cookieStart);  //查找分号
            if (cookieEnd == -1) {
                cookieEnd = document.cookie.length;                     //没有分号的说明是最后一个值
            }
            cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd))
        }
        return cookieValue;
    },
    set: function (name, value, expires, path, domain, secure) {        //设置Cookie值
        let cookieText = encodeURIComponent(name) + "=" + encodeURIComponent(value);
        if (expires instanceof Date) {
            cookieText += "; expires=" + expires.toMTString();
        }
        if (path) {
            cookieText += "; path" + path;
        }
        if (domain) {
            cookieText += "; domain" + domain;
        }
        if (secure) {
            cookieText += "; secure";
        }
        document.cookie = cookieText;
    },
    unset: function (name, path, domain, secure) {
        this.set(name, "", new Date(0), path, domain, secure);
    }
};
//使用
//设置Cookie
CookieUtil.set("name", "Beats0");
CookieUtil.set("book", "JavaScript");
//读取Cookie
console.log(CookieUtil.get("name"));         // Beats0
console.log(CookieUtil.get("book"));         // JavaScript
//删除Cookie
// CookieUtil.unset("name");
// CookieUtil.unset("book");
// //设置Cookie的路径，域，失效日期
CookieUtil.set("name", "Beats0", "/book/project", "www.github.com", new Date("November 20, 2018"));

//子Cookie
//SubCookieUtil()
let SubCookieUtil = {
    get: function (name, subName) {
        let subCookies = this.getAllResponseHeaders(name);
        if (subCookies) {
            return subCookies[subName];
        } else {
            return null;
        }
    },
    getAll: function (name) {
        let cookieName = encodeURIComponent(name) + "=",
            cookieStart = document.cookie.indexOf(cookieName),
            cookieValue = null,
            cookieEnd,
            subCookies,
            i,
            len,
            parts,
            result = {};

        if (cookieStart > -1) {
            let cookieEnd = document.cookie.indexOf(";", cookieStart);  //查找分号
            if (cookieEnd == -1) {
                cookieEnd = document.cookie.length;                     //没有分号的说明是最后一个值
            }
            cookieValue = document.cookie.substring(cookieStart + cookieName.length, cookieEnd);
            if (cookieValue.length > 0) {
                subCookies = cookieValue.split("&");
                for (i = 0, len = subCookies.length; i < len; i++) {
                    parts = subCookies[i].split("=");
                    result[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
                }
                return result;
            }
        }
        return null;
    },
//其他代码
};
//调用
//假设document.cookie=data=name=Beats0&Booke=JavaScript
//取得全部cookie
let data = SubCookieUtil.getAll("data");
console.log(data.name);
console.log(data.book);
//逐个获取子cookie
console.log(SubCookieUtil.get("data", "name"));
console.log(SubCookieUtil.get("data", "book"));

//设置子Cookie
//SubCookieUtil()
let SubCookieUtil = {
    set: function (name, subName, value, expiress, path, domain, secure) {
        let subcookies = this.getAll(name) || {};
        subcookies[subName] = value;
        this.setAll(name, subcookies, expiress, path, domain, secure);
    },
    setAll: function (name, subookies, value, expiress, path, domain, secure) {
        let cookieText = encodeURIComponent(name) + "=",
            subcookieParts = new Array(),
            subName;
        for (subName in subookies) {
            if (subName.length > 0 && subookies.hasOwnProperty(subName)) {
                subcookieParts.push(encodeURIComponent(subName) + "=" + encodeURIComponent(subookies[subName]));
            }
        }
        if (cookieParts.length > 0) {
            cookieText += subcookieParts.join("&");
            if (expires instanceof Date) {
                cookieText += "; expires=" + expires.toMTString();
            }
            if (path) {
                cookieText += "; path" + path;
            }
            if (domain) {
                cookieText += "; domain" + domain;
            }
            if (secure) {
                cookieText += "; secure";
            }
        } else {
            cookieText += "; expires" + (new Date(0)).toGMTString();
        }
        document.cookie = cookieText;
    },
    //更多代码
};

