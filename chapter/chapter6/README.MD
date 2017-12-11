#### scroller属性相关
```js
var outer = document.getElementById('outer');
var inner = document.getElementById('inner');
var btns = document.getElementsByTagName('button');
var imgs = inner.getElementsByTagName('img')[0];
console.log(imgs.offsetWidth);
var show_timer = null;
btns[0].onclick = function () {
    clearInterval(show_timer);//清除
    show_timer = setInterval(function () {
        outer.scrollLeft++;
        console.log(outer.scrollLeft);
        if (outer.scrollLeft >= imgs.offsetWidth*10) {
            outer.scrollLeft = 0;
        }
    },1)
}
btns[1].onclick = function () {
    clearInterval(show_timer);
}
outer.onmouseover = function () {
    clearInterval(show_timer);
}
outer.onmouseout = function () {
    show_timer = setInterval(function () {
        outer.scrollLeft++;
        console.log(outer.scrollLeft);
        if (outer.scrollLeft >= imgs.offsetWidth*10) {
            outer.scrollLeft = 0;
        }
    },1)
}

var speed = 10;
var tab = document.getElementById("demo");
var tab1 = document.getElementById("demo1");
var tab2 = document.getElementById("demo2");
tab2.innerHTML = tab1.innerHTML;
function Marquee() {
    if (tab.scrollLeft <= 0) {
        tab.scrollLeft += tab2.offsetWidth;
    } else {
        tab.scrollLeft--;
    }
}
var MyMar = setInterval(Marquee.speed);
tab.onmouseover = function () {
    clearInterval(MyMar);
}
tab.onmouseout = function () {
    MyMar = setInterval(Marquee.speed)
}
```


```js
// console.log(document.getElementById("post").clientWidth);
// console.log(document.getElementById("post").clientHeight);
// console.log((document.documentElement.offsetHeight));
// console.log((document.documentElement.offsetWidth));

// console.log(document.documentElement.scrollTop || document.body.scrollTop);//获取滚动条距离，考虑兼容性
// var gotop_timer = null;
// var zan_totop = document.getElementById("zan-gotop");
// zan_totop.onclick = function () {
//     var goto_valve = document.documentElement.scrollTop || document.body.scrollTop;
//     gotop_timer = setInterval(function () {
//         zan_totop -= 1;
//         document.documentElement.scrollTop = zan_totop;
//         document.body.scrollTop = zan_totop;
//         if (zan_totop <= 0) {
//             clearInterval(gotop_timer);
//             document.documentElement.scrollTop = 0;
//             document.body.scrollTop = 0;
//         }
//     },1)
// }

//////////////////////////back to top////////////////////////////
(function() {
    var backToTop = document.querySelector('.back-to-top')
    var backToTopA = document.querySelector('.back-to-top a')
    // console.log(backToTop);
    window.addEventListener('scroll', function() {
        // 页面顶部滚进去的距离
        var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
        if (scrollTop > 200) {
            backToTop.classList.add('back-to-top-show')
        } else {
            backToTop.classList.remove('back-to-top-show')
        }
    })

    // backToTopA.addEventListener('click',function (e) {
    //     e.preventDefault()
    //     window.scrollTo(0,0)
    // })
}());
```