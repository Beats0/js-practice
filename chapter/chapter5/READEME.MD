#### scroll系列属性：scrollLeft | scrollTop | scrollHeight | scrollWidth
```
var outer = document.getElementById('outer');
var con = document.getElementById('con');
var btn = document.getElementById('btn');
btn.onclick = function () {
    // alert(outer.scrollLeft);
    outer.scrollLeft = 1000;
}
```
#### offset系列属性：
```
// | offsetLeft | offsetTop| 获取与父级之间的距离（默认窗口）
// | offsetHeight | offsetWidth | 获取元素自身的（包含边框）
var con2 = document.getElementById('con2');
var mid = document.getElementById('mid');
var outer2 = document.getElementById('outer2');
console.log(con2.offsetLeft);//105
console.log(con2.offsetTop);//55
console.log(con2.offsetWidth);//800
console.log(con2.offsetHeight);//800
```
#### client系列属性：
```
// | clientLeft | clientTop| 获取与元素到边框的距离，少使用
// | clientHeight | clientWidth | 获取元素自身的（不包含边框）
console.log(mid.clientLeft);//5
console.log(mid.clientTop);//5
console.log(mid.clientWidth);//390
console.log(mid.clientHeight);//290
```