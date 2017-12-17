//onLoad.js
function onLoad(f) {
    if (onLoad.loaded) {
        window.setTimeout(f, 0);
    } else if (window.addEventListener) {
        window.addEventListener("load", f, false);
    } else if (window.attachEvent) {
        window.attachEvent("onload", f)
    }
}

// 给onLoad设置一个标志，用来指示文档是否载入完成
onLoad.loaded = false;
// 注册一个函数，当文档载入完成时设置这个标志
onLoad(function () {
    onLoad.loaded = true;
});
//优雅的图形翻转
onLoad(function () {
    for (var i = 0; i < document.images.length; i++) {
        var img = document.images[i];           //HTMLCollection对象
        var rollover = img.getAttribute("data-rollover");
        if (!rollover) continue;

        (new Image()).src = rollover;           //确保将翻转的图片缓存起来
        img.setAttribute("data-rollout", img.src);//定义一个属性来标识默认的图片URL
        //注册时间处理函数来创建翻转效果
        img.onmouseover = function () {
            this.src = this.getAttribute("data-rollover");
        };
        img.onmouseout = function () {
            this.src = this.getAttribute("data-rollout");
        }
    }
});