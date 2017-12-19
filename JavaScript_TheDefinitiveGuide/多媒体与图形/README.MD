## 图形编程
* [动态修改img-src属性](#动态修改img-src属性)
* [媒体事件](#媒体事件)
* [Canvas](#canvas)
 > 绘制<br>
颜色<br>
透明度<br>
渐变<br>
图案<br>
赛贝尔曲线<br>
绘制<br>
图片操作<br>
* 裁剪 参考
 > [fengyuanchen/cropper](https://github.com/fengyuanchen/cropper)<br>
 [tapmodo/Jcrop](https://github.com/tapmodo/Jcrop)
 - 放大缩小 参考
> [fengyuanchen/viewerjs](https://github.com/fengyuanchen/viewerjs)<br>
合成<br>
像素操作<br>
图片识别<br>

## WebGL
3D绘图协议
* [WebGL](webgl)
##### 动态修改img-src属性
html:添加data-rollover属性
```html
<img src="../img/clock.png" data-rollover="./github.PNG" alt="">
```
js:添加rollover.js
```js
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
//优雅的图形变换
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
```
[Demo](https://beats0.github.io/js-practice/JavaScript_TheDefinitiveGuide/Event/rollover.html)




## 媒体事件
在处理用 `<audio>`和 `<video>` 标签嵌入到HTML文档中的媒体时，会触发多种事件。本章列出这些事件，并给出一些使用方法。

[Media_events](https://developer.mozilla.org/zh-CN/docs/Web/Guide/Events/Media_events)


|事件名称	|描述|
------|------|
abort	        |在播放被终止时触发,例如, 当播放中的视频重新开始播放时会触发这个事件。
canplay	        |在媒体数据已经有足够的数据（至少播放数帧）可供播放时触发。这个事件对应CAN_PLAY的readyState。
canplaythrough	|在媒体的readyState变为CAN_PLAY_THROUGH时触发，表明媒体可以在保持当前的下载速度的情况下不被中断地播放完毕。注意：手动设置currentTime会使得firefox触发一次canplaythrough事件，其他浏览器或许不会如此。
durationchange	|元信息已载入或已改变，表明媒体的长度发生了改变。例如，在媒体已被加载足够的长度从而得知总长度时会触发这个事件。
emptied	        |媒体被清空（初始化）时触发。
ended	        |播放结束时触发。
error	        |在发生错误时触发。元素的error属性会包含更多信息。参阅Error handling获得详细信息。
loadeddata	    |媒体的第一帧已经加载完毕。
loadedmetadata	|媒体的元数据已经加载完毕，现在所有的属性包含了它们应有的有效信息。
loadstart	    |在媒体开始加载时触发。
mozaudioavailable	|当音频数据缓存并交给音频层处理时
pause	        |播放暂停时触发。
play	        |在媒体回放被暂停后再次开始时触发。即，在一次暂停事件后恢复媒体回放。
playing	        |在媒体开始播放时触发（不论是初次播放、在暂停后恢复、或是在结束后重新开始）。
progress	    |告知媒体相关部分的下载进度时周期性地触发。有关媒体当前已下载总计的信息可以在元素的buffered属性中获取到。
ratechange	    |在回放速率变化时触发。
seeked	        |在跳跃操作完成时触发。
seeking	        |在跳跃操作开始时触发。
stalled	        |在尝试获取媒体数据，但数据不可用时触发。
suspend	        |在媒体资源加载终止时触发，这可能是因为下载已完成或因为其他原因暂停。
timeupdate	    |元素的currentTime属性表示的时间已经改变。
volumechange	|在音频音量改变时触发（既可以是volume属性改变，也可以是muted属性改变）.。
waiting	        |在一个待执行的操作（如回放）因等待另一个操作（如跳跃或下载）被延迟时触发。

```js
var v = document.getElementsByTagName("video")[0];
v.addEventListener("seeked", function() { document.getElementsByTagName("video")[0].play(); }, true);
v.currentTime = 10.0;
```

这个例子获取了文档中第一个video元素，并在video元素上监听了一个`seeked`事件，该事件会在跳跃操作完成后触发。监听器的处理函数就是简单的调用元素的play()方法，该方法会开始视频的播放。

接下来来看例子的第三行，这里设置了元素的`crruentTime`特性值为10.0，这会初始化一个在媒体中跳跃(快进)到10s位置的操作。操作开始时会引起一个seeking事件，随后当跳跃操作完成时会触发seeked事件。

换句话，本例中只要在媒体中跳跃到10s位置的操作完成，视频就会马上播放。

[Demo svg Pie Chart Test](https://beats0.github.io/js-practice/JavaScript_TheDefinitiveGuide/%E5%A4%9A%E5%AA%92%E4%BD%93%E4%B8%8E%E5%9B%BE%E5%BD%A2/svg.html)

[Demo svg Analog Clock](https://beats0.github.io/js-practice/JavaScript_TheDefinitiveGuide/%E5%A4%9A%E5%AA%92%E4%BD%93%E4%B8%8E%E5%9B%BE%E5%BD%A2/svg_clock.html)

[Demo js_clock](https://beats0.github.io/js-practice/JavaScript_TheDefinitiveGuide/%E5%A4%9A%E5%AA%92%E4%BD%93%E4%B8%8E%E5%9B%BE%E5%BD%A2/js_clock.html)



## Canvas
```js
    var offscreen = document.getElementById("canvas");
    var c = canvas.getContext('2d');                        //创建屏幕
    offscreen.width = offscreen.height = 100;               //canvas大小同比
    offscreen.getContext("2d").strokeRect(0, 0, 6, 6);
    var pattern = c.createPattern(offscreen, "repeat");

    //线性渐变
    var bgfade=c.createLinearGradient(0,0,canvas.width,canvas.height);
    bgfade.addColorStop(0.0,"#88f");
    bgfade.addColorStop(1.0,"#fff");

    //同心圆渐变
    var peekhole=c.createLinearGradient(300,300,100,300,300,300);
    peekhole.addColorStop(0.0,"transparent");           //透明
    peekhole.addColorStop(0.7,"rgba(100,100,100,.9)");  //灰度半透明
    peekhole.addColorStop(1.0,"rgba(0,0,0,0)");         //再次透明

    c.fillStyle=bgfade;
    c.fillStyle=(0,0,600,600);
    c.strokeStyle=pattern;
    c.lineWidth=100;
    c.strokeStyle=peekhole;
    c.fillRect(0,0,600,600);
```
[Demo canvas](https://beats0.github.io/js-practice/JavaScript_TheDefinitiveGuide/%E5%A4%9A%E5%AA%92%E4%BD%93%E4%B8%8E%E5%9B%BE%E5%BD%A2/canvas.html)


##### 绘制
 * 颜色
 - 透明度
 * 渐变
 - 图案
 * 赛贝尔曲线
 - 绘制

##### 图片操作
* 裁剪 参考
 > [fengyuanchen/cropper](https://github.com/fengyuanchen/cropper)<br>
 [tapmodo/Jcrop](https://github.com/tapmodo/Jcrop)
 - 放大缩小 参考
> [fengyuanchen/viewerjs](https://github.com/fengyuanchen/viewerjs)
 * 合成
 - 像素操作
 * 图片识别

## WebGL
3D绘图协议

