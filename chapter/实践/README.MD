### 算法优化
#### `Duff装置`
例如，如果数数组中有10个值，则startAt=2，那么第一次process()调用2次，在接下来的循环中，startAt重置为0，这样之后每次循环调用8次process()
```
假设values.lenth > 0
let values = 10;
let iterations = Math.ceil(values.length / 8);
let startAt = values.length % 8;
let i = 0;
do {
    switch (startAt) {
        case 0:
            processs(values[i++]);
        case 7:
            processs(values[i++]);
        case 6:
            processs(values[i++]);
        case 5:
            processs(values[i++]);
        case 4:
            processs(values[i++]);
        case 3:
            processs(values[i++]);
        case 2:
            processs(values[i++]);
        case 1:
            processs(values[i++]);
    }
    startAt = 0;
} while (--iterations > 0);
```

##### 更快的`do-while Duff装置`
每8次调用一次
```
//credit:Speed Up Your Site (New Riders, 2003)
let iteration = Math.floor(values.length / 8);
let leftover = values.length % 8;
let i = 0;
if (leftover > 0) {
    do {
        processs(values[i++]);
    } while (--leftover > 0);
}
do {
    processs(values[i++]);
    processs(values[i++]);
    processs(values[i++]);
    processs(values[i++]);
    processs(values[i++]);
    processs(values[i++]);
    processs(values[i++]);
    processs(values[i++]);
} while (--leftover > 0);
```
#### 避免双重解释
- 代码求值
```
//  eval("console.log('Hellow world!')");
    console.log('Hello world!');
```
- 创建新的函数
```
//  let sayHi = new Function("console.log(Hi)");
    let sayHi = function () {
    console.log(Hi);
    };
```
- 设置超时
```
//  setTimeout("alert('Hello world!')");
    setTimeout(function () {
        alert('Hello world!');
    }, 500);
```
#### 最小化语句数
1. 多个变量声明
```
let count = 5,
    color = "red",
    value = [1,2,3],
    now = new Date();
```
2. 插入迭代值
```
let name = values[i++];
```
3. 使用数组和对象字面符
不推荐：
```
let person = new Object();
    person.name = "Beats0";
    person.age = 19;
    person.sayName = function() {
        alert(this.name);
  }
```
推荐：
```
let person = {
    name: "Beats0",
    age: 19,
    sayName: function () {
        alert(this.name);
    }
};
```

### 优化DOM交互
1. 优化DOM，最小化现场更新
```
let list = document.getElementById("myList"),
    fragment = document.createDocumentFragment(),
    item,
    i;
for (i = 0; i < 10; i++) {
    item = document.createElement("li");
    fragment.appendChild(item);
    item.appendChild(document.createTextNode("Item" + i));
}
list.appendChild(fragment);
```
2. 使用innerHTML
```
let list = document.getElementById("myList"),
    html = "",
    i;
for (i = 0; i < 10; i++) {
    html += "<li>Item" + i + "</li>";
}
list.innerHTML = html;
```
3. 注意HTMLCollection
不推荐:
```
let images = document.getElementsByTagName("img"),
    i, len;
for (i = 0, len = images.length; i < len; i++) {
    //......
}
```
推荐：
```
let images = document.getElementsByTagName("img"),
    image,
    i, len;
for (i = 0, len = images.length; i < len; i++) {
    image = images[i];
    //......
}
```

### JS压缩


