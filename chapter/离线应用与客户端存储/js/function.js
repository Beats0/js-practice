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


//Web存储机制
//sessionStorage对象
// sessionStorage存储
//使用方法存储
sessionStorage.setItem("name", "Beats0");
//使用属性存储
sessionStorage.book = "JavaScript";

//sessionStorage读取
//使用方法读取
let name = sessionStorage.getItem("name");
//使用属性读取
let book = sessionStorage.book;
//使用for,length结合Key()方法迭代
for (let i = 0, len = sessionStorage.length; i < len; i++) {
    let key = sessionStorage.key(i);
    let value = sessionStorage.getItem(key);
    console.log(key + "=" + value);
}
//使用for-in迭代
for (let key in sessionStorage) {
    let value = sessionStorage.getItem(key);
    console.log(key + "=" + value);
}
//sessionStorage删除
sessionStorage.removeItem("book");

// globalStorage对象
//保存数据
globalStorage["www.github.com"].name = "Beats0";
//获取数据
let name = globalStorage["www.github.com"].name;

//localStorage对象
//兼容性
function getLocalStorage() {
    if (typeof localStorage == "object") {
        return localStorage;
    } else if (typeof globalStorage == "object") {
        return globalStorage[localtion.host];
    } else {
        throw new Error("Local storage not available!")
    }
}

//调用
let storage = getLocalStorage();

//storage事件

//数据库
let request, database;
request = IndexedDB.open("admin");
request.onerror = function (event) {
    console.log("Bad happened while trying to open:" + event.target.errorCode);
};
request.onerror = function (event) {
    database = event.target.result;
};
//对象存储空间
//每次调用add()或put()都会创建一个新的请求，并将返回的请求保存到一个变量中
let i = 0,
    request,
    requests = [],
    len = user.length;

while (i < len) {
    request = storage.add(users[i++]);
    request.onerror = function () {
        //处理error
    };
    request.onsuccess = function () {
        //处理success
    };
    request.push(request);
}