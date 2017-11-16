## DOM
#### 节点关系
```
var outer = document.getElementById("outer");
var inner = document.getElementById("inner");
var lis = document.getElementsByTagName("li");
//parentNode 每一个节点都有的，指向文档树的父节点 UL
console.log(lis[0].parentNode.nodeName);
console.log(lis[0].parentNode.parentNode.nodeName);//DIV
//children 所有子节点，只包含元素节点，IE8前children属性中会包含注释节点，注意避免子元素有注释
//var lis = inner.children;
//previousSibling同一节点列表中的前一个节点（IE8以下支持，其他浏览器意义不同）
//previousElementSibling
//同一节点列表中的前一个元素节点（IE8以下不支持，其他支持）
if (lis[1].previousElementSibling) {//浏览器先判断
    console.log(lis[1].previousElementSibling.innerHTML);
} else {
    console.log(lis[1].previousSibling);
}
//1
```

#### 或者
```
function prenode(obj) {
    if (obj.previousElementSibling) {//浏览器先判断
        return obj.previousElementSibling.innerHTML;
    } else {
        return obj.previousSibling.innerHTML;
    }
}
console.log(prenode(lis[1]));//1
//nextSibling 同一节点列表中的后一个节点（IE8以下支持，其他浏览器意义不同）
//nextElementSibling 同一节点列表中的后一个元素节点（IE8以下不支持，其他支持）
function prenode2(obj) {
    if (obj.nextElementSibling) {
        return obj.nextElementSibling.innerHTML;
    } else {
        return obj.nextSibling.innerHTML;
    }
}
console.log(prenode2(lis[1]));//3
// firstChild 节点列表中的第一个节点（IE8以下支持，其他浏览器意义不同）
// firstElementChild 节点列表中的第一个元素（IE8以下不支持，其他浏览器支持）
function prenode3(obj) {
    if (obj.firstElementChild) {
        return obj.firstElementChild.innerHTML;
    } else {
        return obj.firstChild.innerHTML;
    }
}
console.log(prenode3(inner));//3
//lastChild 节点列表中的最后一个节点（IE8以下支持，其他浏览器意义不同）
//lastElementChild 节点最后一个元素（IE8以下不支持，其他浏览器支持）
function prenode4(obj) {
    if (obj.lastElementChild) {
        return obj.lastElementChild.innerHTML;
    } else {
        return obj.lastChild.innerHTML;
    }
}
console.log(prenode4(inner));//3
```
#### 可正常执行的inner元素方法
```
//错误
div.innerHTML = "<script defer>alert('Hi');<\/script>";

//正确
div.innerHTML = "_<script defer>alert('Hi');<\/script>";
div.innerHTML = "<div>&nbsp;</div><script defer>alert('Hi');<\/script>";
div.innerHTML = "<input type=\"hidden\"><script defer>alert('Hi);<\/script>";
//最直观的方法
div.innerHTML = "<style type=\"text/css\">body {background-color: red;}</style>";
```

#### 创建节点
```
//createElement() 创建一个元素节点，但不会自动被添加到文档document中
var outer2 = document.getElementById("outer2");
var inner2 = document.getElementById("inner2");
var lis2 = inner2.children;
var newli = document.createElement("li");
console.log(newli.nodeName);//LI
//createTextNode() 创建一个文本节点，用来将元素节点里添加内容，但不会自动被添加到文档document中
var newtext = document.createTextNode("createTextNode");
console.log(newtext.nodeName);//#text
//Node.setAttribute("title","abc") 设置node节点中的title属性值为abc
newli.setAttribute("title","abc");
console.log(newli);//<li title="abc"></li>
```
#### 插入节点
```
//appendChild() 节点插入到最后，文档上面两个创建的节点不会自动添加到文档中时使用
newli.appendChild(newtext);
console.log(newli);//<li title="abc">createTextNode</li>
inner2.appendChild(newli);//在li最后添加createTextNode
//InserBefor() 插入节点到目标节点的前面
inner2.insertBefore(newli,lis2[0]);//在li[0]前添加createTextNode

//删除节点
//node.removeChild(lis[0]) 把lis[0]从node节点中删除
inner2.removeChild(lis2[0]);
// node.parentNode.removeChild(node) 不知道父节点时使用：
lis2[0].parentNode.removeChild(lis2[0]);

//替换节点
//parentNode。repalaceChild(newNode,oldNode) 把oldNode替换为NewNode，必须是parentNode的子节点
inner2.replaceChild(newli,lis2[0]);

//复制节点
//node.cloneNode(boolean) 复制整个节点和里面的内容，参数true(深复制),参数false（潜复制）只复制节点不复制内容
var newul = inner2.cloneNode(true);
outer2.appendChild(newul);//深复制
var newul2 = inner2.cloneNode(false);
outer2.appendChild(newul);//潜复制
```
#### 查询字符串参数
```
function getQueryStringArgs() {
    //取得并去掉问号
    var qs = (location.search.length > 0 ? location.search.substring(1) : ""),
        //保存数据对象
        args = {},
        //获取每一项
        items = qs.length ? qs.split("&") : [],
        item = null,
        name=null,
        value = null,
        //for
        i = 0,
        len = items.length;
    for (i = 0; i < len; i++) {
        item = items[i].split("=");
        name = decodeURIComponent(item[0]);
        value = decodeURIComponent(item[1]);

        if (name.length) {
            args[name] = value;
        }
    }
    return args;
}
var args=getQueryStringArgs();
var qs="?q=javascript&num=10";
console.log(args["q"]);
console.log(args["num"]);
```
#### 遍历元素特性
```
function outputAttributes(element) {
    var pairs = new Array(),
        attrName,
        attrValue,
        i,
        len;
    for (i = 0, len = element.attributes.length; i < len; i++) {
        attrName = element.attributes[i].nodeName;
        attrValue = element.attributes[i].nodeValue;
        paras.push(attrName + "=\"" + attrValue + "\"";
    }
    return pairs.join("");
}
```
#### 遍历元素特性兼容
```
function outputAttributes(element) {
    var pairs = new Array(),
        attrName,
        attrValue,
        i,
        len;

    for (i = 0, len = element.attributes.length; i < len; i++) {
        attrName = element.attributes[i].nodeName;
        attrValue = element.attributes[i].nodeValue;
        if (element.attributes[i].specified) {
            paras.push(attrName + "=\"" + attrValue + "\"");
        }
    }
    return pairs.join("");
}
```
#### 标准的DOM文本节点样式
```
function loadScriptString(code) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    try {
        script.appendChild(document.createTextNode(code));
    } catch (e) {
        script.text = code;
    }
    document.body.appendChild(script);
}

loadScriptString("function sayHi(){alert('Hi');}");
```


#### 动态样式
```
function loadStyle(url) {
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = "style.css";
    var head = document.getElementsByTagName("head")[0];
    head.appendChild(link);
}
loadStyle("styles.css");
```

#### 表格操作
```
var table=document.createElement("table");
table.border=1;
table.width="100%";

var tbody=document.createElement("tbody");
table.appendChild(tbody);

//创建第一行
tbody.insertRow(0);
tbody.rows[0].insertCell(0);
tbody.rows[0].cells[0].appendChild(document.createTextNode("cell 1,1"));
tbody.rows[0].insertCell(1);
tbody.rows[0].cells[1].appendChild(document.createTextNode("cell 2,1"));
//创建二行
tbody.insertRow(1);
tbody.rows[1].insertCell(0);
tbody.rows[1].cells[0].appendChild(document.createTextNode("cell 1,2"));
tbody.rows[1].insertCell(1);
tbody.rows[1].cells[1].appendChild(document.createTextNode("cell 2,2"));

document.body.appendChild(table);
```
#### 跨浏览器遍历元素
```
var i,
    len,
    child = element.firstElementChild;
while (child != element.lastElementChild) {
    processChild(child);
    child = child.nextElementSibling;
}
```
#### classList方法
```
// <div class="bd user disable"></div>
div.classList.remove("disable")
div.classList.add("current")
div.classList.toggle("user")

//确定元素中是否包含既定的类名
if (div.classList.contains("bd") && !div.classList.contains("disable")) {
    //......
}
```

#### 迭代类名
for (var i = 0, len = div.classList.length; i < len; i++) {
    //......
}

自定义数据属性,如：<div id="myDiv" data-appid="123" data-myname="Nicholas"></div>
```
var div=document.getElementById("myDiv");
var appId=div.dataset.appId;
var myName=div.dataset.myName;
//设置值
div.dataset.appId=123;
div.dataset.myName="Nicholas";
//检测
if (div.dataset.myName) {
    console.log("hello,"+ div.dataset.myName);
}
```
#### DOM循环
```
//不要这样使用，会占用资源
for (var i = 0, len = values.length; i < len; i++) {
    ul.innerHTML += "<li>" + values[i] + "</li>";
}
//应该这用使用
var itemsHtml = "";
for (var i = 0, len = values.length; i < len; i++) {
    itemsHtml += "<li>" + values[i] + "</li>";
}
ul.innerHTML = itemsHtml;
//这样效率高很多，因为它只执行了一次赋值操作
```
#### 跨浏览器向样式表中插入规则
```
function insertRule(sheet, sellectorText, cssText, position) {
    if (sheet.innerRule) {
        sheet.innerRule(sellectorText + "(" + cssText + ")", position);
    } else if (sheet.addRule) {
        sheet.addRule(sellectorText, cssText, position);
    }
}

//调用
insertRule(document.styleSheets[0],"body","background-color:red",0);
```
#### 用DOM范围实现复杂选择
```
var rang1 = document.createRange();
rang2 = document.createRang();
p1 = document.getElementById("p1");
p1Index = -1;
i, len;
for (i = 0, len = p1.parentNode.childNodes.length; i < len; i++) {
    if (p1.parentNode.childNodes[i] == p1) {
        p1Index = i;
        break;
    }
}

range1.setStart(p1.parentNode, p1Index);
range1.setEnd(p1.parentNode, p1Index + 1);
range2.setStart(p1, 0);
range2.setEnd(p1, p1.childNodes.length);
```

#### 附录 DOM

<li><a href="https://github.com/oneuijs/You-Dont-Need-jQuery">You-Dont-Need-jQuery</a>  Examples of how to do query, style, dom, ajax, event etc like jQuery with plain javascript.(前端发展很快，现代浏览器原生 API 已经足够好用。我们并不需要为了操作 DOM、Event 等再学习一下 jQuery 的 API。同时由于 React、Angular、Vue 等框架的流行，直接操作 DOM 不再是好的模式，jQuery 使用场景大大减少。本项目总结了大部分 jQuery API 替代的方法，暂时只支持 IE10 以上浏览器。)</li>
