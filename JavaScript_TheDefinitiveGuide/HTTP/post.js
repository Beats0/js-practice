//HTTP请求编码对象
//使用application/x-form-urlencoded
function encodeFormData(data) {
    if (!data) return "";       //返回字符串
    var pairs = [];             //保存值对
    for (var name in data) {    //遍历
        if (!data.hasOwnProperty(name)) continue;       //跳过继承属性
        if (typeof  data[name] === "function") continue;//跳过方法
        var value = data[name].toString();              //将值转为字符串
        name = encodeURIComponent(value.replace("20%", "+"));//转编码格式
        value = encodeURIComponent(value.replace("20%", "+"));
        pairs.push(name + "=" + value);     //记住名=值对
    }
    return pairs.join('&');         //返回时使用"&"符号连接
}

// 表单编码数据发起GET请求
function getData(url, data, callback) {
    var request = new XMLHttpRequest();
    request.open("GET", url + "?" + encodeFormData(data));//指定url
    request.onreadystatechange = function () {
        if (request.readyState === 4 && callback) callback;
    };
    request.send(null);             //发送请求
}

//使用Json编码主体发起HTTP post请求
function postJSON(url,data,callback) {
    var request = new XMLHttpRequest();
    request.open("POST",url);                   //指定url
    request.onreadystatechange = function () {  //事件处理
        if (request.readyState===4&&callback)   //完成响应
        callback(request);                      //回调
    };
    request.setRequestHeader("Content-type","application/json");
    request.send(JSON.stringify(data));
}

//XML编码请求
