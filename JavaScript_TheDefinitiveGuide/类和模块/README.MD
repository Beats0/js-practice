#### 继承
`inherit()`

通过原型链创建一个新的对象
```
function inherit(p) {
    if (p == null) throw TypeError();
    if (Object.create)          //Object.create()存在
        return Object.create(p);//直接使用
    var t = typeof p;           //进一步检测
    if (t !== "Object" && t !== "function") throw TypeError;
    function f() {};            //定义一个空构造函数
    f.prototype = p;            //将其原型设置为p
    return new f();             //使用f()创建p的继承对象
}
```