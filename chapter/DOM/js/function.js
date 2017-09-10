//节点关系
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
//or
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

//创建节点
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

//插入节点
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