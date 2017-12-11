#### 闭包
```js
function counter(n) {
    return{
     get count() {return n++;},
        set count(m) {
      if (m>=n) n=m;
      else throw Error("set to a lager value");
        }
    };
}
var c = counter(1000);
console.log(c.count);//1000
console.log(c.count);//1001
c.count = 2000;
console.log(c.count);//2000
// c.count = 2000;//Error
console.log(c.count);//2001
console.log(c.count);//2002
```
#### apply()
```js
function trace(o,m) {
    var org = o[m];//闭包原始方法
    o[m] = function () {//定义新的方法
        console.log(new Date(),"Entering:",m);
        var result = org.apply(this,arguments);
        console.log(new Date(),"Exiting",m);
        return result;
    };
}
```
#### bind()
```js
// function f(y) {
//     return this.x+y;
// }
// var o = {x:1};//绑定的对象
// var g = f.bind(o);//通过调用g(x)来调用o.f(x)
// console.log(g(2));//3

function bind(f,o) {
    if (f.bind) return f.bind(o);
    else return function () {
        return f.apply(o,arguments);
    };
}
```
#### 柯里化(crring)
```js
var sum = function (x,y) {
    return x+y;
}
var succ = sum.bind(null,1);
succ(2)//3
function f(y,z) {
    return this.x+y+z;
};
var g = f.bind({x:1},2);
console.log(g(3));//6
//this.x=1,y=2,z=3
```