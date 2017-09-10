var btn = document.getElementById("btn");
var outer = document.getElementById("outer");
var inner = document.getElementById("inner");
var con = document.getElementById("con");
var body = document.getElementsByTagName("body")[0];
con.onclick = function () {
    alert("click con use onclick");
}
document.onclick = function () {
    alert("document");
}
// btn.onclick = function () {
//     con.onclick = null;//只能实行一次，只能删除document以下的alert
// }
//事件捕获冒泡处理程序
//ele.addEventListener('click',doSomething,true) true采用事件捕获，false为采用事件冒泡（兼容性好）
function EventListener() {//尽量在外部声明变量
    alert("click con use EventListener")
}
con.addEventListener("click",EventListener,false)//可以实行多次
btn.onclick = function () {
    con.removeEventListener("click",EventListener,false);//移除EventListener
}
//事件处理程序冒泡IE
// ele.attachEvent("onclick",doSomething)添加
// ele.detaEvent("onclick",doSomething)移除
//阻止冒泡传播
//Event.stopPropagation() //w3c
//Event.cancelBubble=true //IE
document.addEventListener("click",function (e) {
    alert("document6666");
    if (e.stopPropagation()) {
        e.stopPropagation();
        console.log("can't");
    } else {
        e.cancelBubble = true;
    }
},false);
//事件委托
var btn2 = document.getElementById("btn2");
var outer2 = document.getElementById("outer2");
var box = document.getElementById("box");
var lis = box.children;
// for (var i = 0;i < lis.length; i++) {
//     lis[i].onclick = function () {
//         alert(this.innerHTML);
//     }
// }
btn2.onclick = function () {
    var newli = document.createElement("li");
    newli.innerHTML = "create newli";
    box.appendChild(newli);
}

box.onclick = function (e) {
    var target = e.target || target.srcElement;
    alert(target.innerHTML);
}

//reatedTarget返回与事件的目标节点相关的节点
//当发生mouseover与mouseout时，还会涉及更多元素，这两个事件会涉及把鼠标指针从一个元素的边界之内移动到你一个元素边界之内
//mouseover移到目标节点上时离开的那个节点，mouseout离开目标时鼠标指针进入的节点
var outer3 = document.getElementById("outer3");
var inner3 = document.getElementById("inner3");
var box3 = document.getElementById("box3");
outer3.onmouseover = function (e) {
    console.log(e.relatedTarget.parentNode);
}
//定义存储器属性
//var o {
// data_prop:value,
// get accessor_prop() {函数},
// set accessor_prop(value) {函数}
// }
var p = {
    x:1.0,
    y:1.0,
    //r为可读写的存储器属性，有getter和setter属性
    get r() {return Math.sqrt(this.x*this.x + this.y*this.y)},
    set r(newvalue) {
        var oldvalue = Math.sqrt(this.x*this.x +this.y*this.y);
        var ratio = newvalue/oldvalue;
        this.x *= ratio;
        this.y *= ratio;
    },
    //theta只读存储属性，只有gstter属性
    get theta() {return Math.atan2(this.y,this.x);}
};
console.log(p);
console.log("p.r="+p.r);
console.log("p.theta="+p.theta);

var serialnum = {
    $n: 0,
    get next() {return this.$n++;},
    set next(n) {
        if (n >= this.$n) this.$n = n;
        else throw "序列号的值不能比当前小";
    }
};



// var table = new Array(10);