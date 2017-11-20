## 离线应用
#### 离线检测
`navigator.onLine`,`navigator.offonLine`

#### 应用缓存
`<html lang="en" manifest="/appcache">`


## 客户端存储
##### Cookie
##### web存储机制
 - `sessionStorage`对象

sessionStorage存储
```
//使用方法存储
sessionStorage.setItem("name", "Beats0");
//使用属性存储
sessionStorage.book = "JavaScript";

//sessionStorage读取
//使用方法读取
var name = sessionStorage.getItem("name");
//使用属性读取
var book = sessionStorage.book;
```
使用for,length结合Key()方法迭代
```
for (var i = 0, len = sessionStorage.length; i < len; i++) {
    var key = sessionStorage.key(i);
    var value = sessionStorage.getItem(key);
    console.log(key + "=" + value);
}
```
使用for-in迭代
```
for (var key in sessionStorage) {
    var value = sessionStorage.getItem(key);
    console.log(key + "=" + value);
}
```
sessionStorage删除
```
sessionStorage.removeItem("book");
```

 - `globalStorage`对象
```
//保存数据
globalStorage["www.github.com"].name = "Beats0";
//获取数据
var name = globalStorage["www.github.com"].name;
```
 - `localStorage`对象
```
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
var storage = getLocalStorage();
```

 - storage事件

### IndexedDB
##### 1. 数据库(感觉还是使用API算了= =)
```
let request, database;
request = IndexedDB.open("admin");
request.onerror = function (event) {
    console.log("Bad happened while trying to open:" + event.target.errorCode);
};
request.onerror = function (event) {
    database = event.target.result;
};
```
##### 2. 对象存储空间
```
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
```
##### 3. 事务

##### 4. 游标查询
`IDBCurSor`实例

属性 | 描述 |
-----|-----|
direction   |数值
key         |对象的键
value       |实际对象
primaryKey  |游标使用的键

##### 5. 键范围

##### 6. 索引

##### 7. 并发

##### 8. 限制


