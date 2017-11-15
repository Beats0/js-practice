#### try-catch语句
```try {
    //可能导致错误的代码
} catch (error) {
    //错误时怎么处理
    alter(error.message);
}
```
#### finally子句
```
function testFinally() {
    try {
        return 2;
    } catch (error) {
        return 1;
    } finally {
        return 0;       //0
    }
}
```
#### 类型错误
```
try {
    somfunction{};
} catch (error) {
    if (error instanceof TypeError) {
        //处理类型错误
    } else if (error instanceof RangeError) {
        //处理引用错误
    } else {
        //处理其他类型错误
    }
}
```

#### 抛出错误 throw
```
throw new Error("Something bad happened!");

//原型链继承error
function CustomError(message) {
    this.name = "CustomError";
    this.message = message;
}
CustomError.prototype = new Error();
throw new CustomError("my masssage");
```


#### 抛出错误的时机
```
function process(values) {
    values.sort();

    for (var i = 0,len = values.length;i++) {
        if (values[i] > 100) {
            return values[i];
        }
    }
    return -1;
}
```
=>抛出错误的时机的处理
```
function processs(values) {
    if (!(values instanceof Array)) {
        throw new Error("process():Argument must be an array!");        //判断类型，如果不是Array类型则报错
    }
    values.sort();
    for (var i = 0, len = values.length; i < len; i++) {
        if (values[i] > 100) {
            return values[i];
        }
    }
    return -1;
}
```
#### 错误类型
##### 流控制错误
```
function concat(str1, str2, str3) {
    var result = str1 + str2;
    if (str3) {
        result += str3;       //undefined
    }
    return result;
}
```
=>以上这句话的意思即判断str3使用concat方法，但是在if中，会将str3装换为3个数值：true、false、undefined，这样会影响结果，应更改适当的比较
```
function concat(str1,str2,str3) {
    var result = str1+str2;
    if (typeof str3 == "string"){
        result += str3;
    }
    return result;
}
//str3装换为布尔值：true、false
```
##### 数据类型错误
```
function getQuerString(url) {
    var pos = url.indexOf("?");
    if (pos > -1) {
        return url.substring(pos+1);
    }
    return "";
}
```
=>两个函数只能操作字符串，如果传入其他数据类型就会报错
```
function getQuerString(url) {
    if (typeof url == "string") {         //正确，先检测是否为字符串类型
        var pos = url.indexOf("?");
        if (pos > -1) {
            return url.substring(pos + 1);
        }
    }
    return "";
}
```
##### 检测方法
*检测参数中是否存在sort()方法*
```
function reverseSort(values) {
    if (typeof values.sort == "function") {          //不要这样
        values.sort();
        values.reverse();
    }
}
```
=>使用instanceof检测
```
function reverseSort(values) {
    if (values instanceof Array) {          //正确
        values.sort();
        values.reverse();
    }
}
```
##### 通信错误(Ajax)
*必须使用encodeURLComponent()方法*
```
function addQueryStringArg(url, name, value) {
    if (url.indexOf("?") == -1) {
        url += "?";
    } else {
        url += "&";
    }
    url += encodeURIComponent(name) + "=" + encodeURIComponent(value);
    return url;
}

var url = "http://www.bilibili.com";
var newurl = addQueryStringArg(url, "redir", "?a=b&c=d");
alert(newurl);
```
#### 记录错误日志
```
function logError(sev, msg) {
    var img = new img;
    img.src = "log.php?sev=" + encodeURIComponent(sev) + "&msg" + encodeURIComponent(msg);
}
```
#### 数值检测
```
 function divide(num1,num2) {
     return num1 / num2;
 }
```
*检测数值*
```
function divide(num1,num2) {
     //num1与num2必须是number数值
     if (typeof num1 != "number"|| num2 != "number") {
         throw new Error("devide():Both arguments must be numbers!");
     }
     return num1 / num2;
 }
```

#### 使用assert()函数替代if语句
```
function divide(num1, num2) {
    assert(typeof num1 == "number" && typeof num2 == "number", "divide():Both arguments must be numbers!");
    return num1 / num2;
}
```

#### IE未知运行错误
*从技术上讲，<span>标签不能包含<div>之类的块级元素*
```
span.innerHTML="<div>div</div>";     //在span中添加div元素
```

#### 语法错误
```
```


#### 系统无法找到指定资源
*IE url最长不能超过2083个字符限制*
```
function creatLongURL(url) {
    var s = "?";
    for (var i = 0; len = 2500; i++) {
        s += "a";
    }
    return url + s;
}

var x = new XMLHttpRequest();
x.open("get", creatLongURL("http:www.google.com/"), true);
x.send(null);
```