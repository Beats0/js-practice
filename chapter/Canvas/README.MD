#### 展示鼠标坐标
```js
function cnvs_getCoordinates(e) {
    x = e.clientX;
    y = e.clientY;
    document.getElementById("xycoordinates").innerHTML = "Coordinates: (" + x + "," + y + ")";
}
function cnvs_clearCoordinates() {
    document.getElementById("xycoordinates").innerHTML = "";
}
```
#### 绘制矩形
```js
//绘制矩形
var drawing = document.getElementById("drawing");
//是否支持
if (drawing.getContext) {
    var context = drawing.getContext("2d");
    //显示色块
    //绘制红色矩形
    context.fillStyle = "#ff0000";
    context.fillRect(10, 10, 50, 50);
    //绘制半透明蓝色矩形
    context.fillStyle = "rgba(0,0,255,0.5)";
    context.fillRect = (30, 30, 50, 50);

    //显示边框
    context.strokeStyle = "#ff0000";
    context.strokeRect(10, 10, 50, 50);
    context.strokeStyle = "rgba(0,0,255,0.5)";
    context.strokeRect(30, 30, 50, 50);
    //清除一个小矩形
    context.clearRect(40, 40, 10, 10);
}
```
*描边线的宽度有linewidth数值决定，还可通过lineCap决定线条末端平头(butt),圆头(round),方头(square),lineJoin控制线条相交方式：圆交(round),斜交(bevel),斜接(miter)*

#### 绘制表盘
```js
var drawing2 = document.getElementById("drawing2");
//是否支持
if (drawing2.getContext) {
    var context2 = drawing2.getContext("2d");
    //开始
    //圆心点位于(100,100)
    context2.beginPath();
    //外圆
    context2.arc(100, 100, 99, 0, 2 * Math.PI, false);
    //内圆
    context2.moveTo(194, 100);
    context2.arc(100, 100, 94, 0, 2 * Math.PI, false);

    //更换原点
    context2.translate(100,100);

    // //分针
    // context2.moveTo(100, 100);
    // context2.lineTo(100, 15);
    // //时针
    // context2.moveTo(100, 100);
    // context2.lineTo(35, 100);

    //旋转表针
    context2.rotate(1);

    //分针
    context2.moveTo(0, 0);
    context2.lineTo(0, -85);
    //时针
    context2.moveTo(0, 0);
    context2.lineTo(-65, 0);

    //描边路径
    context2.stroke();


    //绘制文本
    //fillText()与strokeText()
    context2.font = "blod 14px Arial";
    context2.textAlign = "center";
    context2.textBaseline = "middle";
    context2.fillText("12", 100, 20);
}
```

#### 绘制图像
```js
context2.drawImage(image,0,10,50,50,0,100,40,60);
```
*9个参数意为：要绘制的图像，原图像的x坐标，原图像的y坐标，原图像的宽度，原图像的高度，目标图像的x坐标，目标图像的y坐标，目标图像的宽度，目标图像的高度。*


#### 绘制科赫棉花
```js
var drawing6 = document.getElementById("drawing6");
var c=drawing6.getContext('2d');

var deg = Math.PI / 180;

function snowflake(c, n, x, y, len) {
    c.save();
    c.translate(x, y);
    c.moveTo(0, 0);
    leg(n);
    c.rotate(-120 * deg);
    leg(n);
    c.rotate(-120 * deg);
    leg(n);
    c.closePath();
    c.restore();

    function leg(n) {
        c.save();
        if (n == 0) {
            c.lineTo(len, 0);
        } else {
            c.scale(1 / 3, 1 / 3);
            leg(n - 1);
            c.rotate(60 * deg);
            leg(n - 1);
            c.rotate(-120 * deg);
            leg(n - 1);
            c.rotate(60 * deg);
            leg(n - 1);
        }
        c.restore();
        c.translate(len, 0);
    }
}

snowflake(c, 0, 5, 115, 125);
snowflake(c, 1, 145, 115, 125);
snowflake(c, 2, 285, 115, 125);
snowflake(c, 3, 425, 115, 125);
snowflake(c, 4, 565, 115, 125);
c.stroke();
```

#### 阴影
```js
var drawing3 = document.getElementById("drawing3");
var drawing3_con = drawing3.getContext("2d");
drawing3_con.shadowOffsetX = 5;
drawing3_con.shadowOffsetY = 5;
drawing3_con.shadowBlur = 4;
drawing3_con.shadowColor = "rgba(0,0,0,5.0)";

drawing3_con.fillStyle = "#ff0000";
drawing3_con.fillRect(10, 10, 50, 50);
//绘制半透明蓝色矩形
drawing3_con.fillStyle = "rgba(0,0,255,1)";
drawing3_con.fillRect = (30, 30, 50, 50);
```
#### 渐变
```js
var drawing4 = document.getElementById("drawing4");
var drawing4_con = drawing4.getContext("2d");

var gradient = drawing4_con.createLinearGradient(30, 30, 70, 70);
gradient.addColorStop(0, "white");
gradient.addColorStop(1, "red");

drawing4_con.fillStyle = gradient;
drawing4_con.fillRect(10, 10, 50, 50);
//绘制半透明蓝色矩形
drawing4_con.fillStyle = gradient;
drawing4_con.fillRect = (30, 30, 50, 50);
```
#### 圆心渐变
```js
var drawing5 = document.getElementById("drawing5");
var drawing5_con = drawing5.getContext("2d");

var gradient_arc = drawing5_con.createLinearGradient(55, 55, 10, 55, 55, 30);
gradient_arc.addColorStop(0, "white");
gradient_arc.addColorStop(1, "red");

drawing5_con.fillStyle = gradient_arc;
drawing5_con.fillRect(10, 10, 50, 50);
//绘制半透明蓝色矩形
drawing5_con.fillStyle = gradient_arc;
drawing5_con.fillRect = (30, 30, 50, 50);
```
#### 使用图像数据
```js
var imageDate = context.getImageData(10, 5, 50, 50);
var date = imageDate.data,
    red = date[0],
    green = date[1],
    blue = date[2],
    alpha = date[3];
if (drawing.getContext) {
    var context = drawing.getContext("2d");
    image = document.images[0],imageDate, date, i, len, average, red, green, blue, alpha;

    //复制原始图像
    context.drawImage(image, 0, 0);

    //获得图像数据
    imageDate = context.getImageData(0, 0, image.width, image.height);

    for (i = 0, len = date.length; i < len; i += 4) {
        red = date[i];
        green = date[i + 1];
        blue = date[i + 2];
        alpha = date[i + 3];

        //求rab平均值
        average = Math.floor((red + green + blue) / 3);

        //设置颜色键，透明度不变
        date[i] = average;
        date[i + 1] = average;
        date[i + 2] = average;
    }
    //回写图像数据并显示结果
    imageDate.data = date;
    context.putImageData(imageDate, 0, 0);
}
```

#### globalAlpha
*指定在画布上绘制的内容的不透明度。这个值的范围在 0.0（完全透明）和 1.0（完全不透明）之间。默认值为 1.0。*

#### WebGL
*WebGL (Web图形库) 是一种JavaScript API，用于在任何兼容的Web浏览器中呈现交互式3D和2D图形，而无需使用插件。WebGL通过引入一个与OpenGL ES 2.0紧密相符合的API，可以在HTML5 `<canvas>` 元素中使用。*
##### 初级教程
<ul>
<li><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/WebGL_API/Tutorial">WebGL教程</a>学习WebGL核心概念的入门指南。WebGL初学者很好的起点。</li>
<li><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/WebGL_API/WebGL_best_practices">WebGL最佳实践</a> 大量技巧和建议来提高你的WebGL的知识。</li>
<li><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/WebGL_API/Using_Extensions">使用扩展</a> 在WebGL如何进行有用的扩展。</li>
</ul>

##### 高级教程

<ul>
 <li><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/WebGL_API/WebGL_model_view_projection">WebGL模型、视图、投影</a>详述了常用于显示3D物体视图的三种核心矩阵：模型，视图和投影矩阵。</li>
 <li><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/WebGL_API/Matrix_math_for_the_web">web中的矩阵运算</a>讲述3D变换矩阵工作原理的指南，这也能在WebGL计算和CSS3变换中派上用场。</li>
</ul>

##### Demo

1. [Aquarium](http://webglsamples.org/aquarium/aquarium.html)
2. [3Dreams of Black](http://www.ro.me/)
3. [WebGL Image Filter](http://evanw.github.io/webgl-filter/)
4. [3Dtin](http://www.3dtin.com/)
5. [WebGL Bookcase](http://workshop.chromeexperiments.com/bookcase/)

#### 资源

<ul>
 <li><a href="https://www.youtube.com/embed/H4c8t6myAWU/?feature=player_detailpage" class="external external-icon">Raw WebGL: WebGL入门</a>&nbsp;Nick Desaulniers 主讲的WebGL 基础知识。如果你从未接触过底层的图形编程，这是一个开始学习初级图形编程的好地方。</li>
 <li><a href="http://www.khronos.org/webgl/" class="external external-icon" title="http://www.khronos.org/webgl/">WebGL官网</a>&nbsp;Khronos Group 的WebGL官方站点。</li>
 <li><a href="http://learningwebgl.com/blog/?page_id=1217" class="external external-icon" title="http://learningwebgl.com/blog/">学习WebGL</a> 一个关于如何使用WebGL的教程站点。</li>
 <li><a href="http://www.html5rocks.com/en/tutorials/webgl/webgl_fundamentals/" class="external external-icon" title="http://www.html5rocks.com/en/tutorials/webgl/webgl_fundamentals/">WebGL基础</a> 一个关于WebGL的基础教程。</li>
 <li><a href="http://webglplayground.net" class="external external-icon" title="http://webglplayground.net">WebGL试炼</a> 一个在线创建和分享WebGL的工具站点，非常适合快速创建一个原型或者体验一个成品。</li>
 <li><a href="http://www.webglacademy.com" class="external external-icon" title="http://www.webglacademy.com">WebGL Academy</a> 通过一个 HTML/JavaScript 编辑器来学习一个基础的WebGl基础知识。</li>
 <li><a href="http://webglstats.com/" class="external external-icon">WebGL Stats</a>&nbsp;一个统计WebGL在不同平台上能力表现的网站。</li>
</ul>

#### 库类

<ul>
 <li><a href="https://github.com/toji/gl-matrix" class="external link-https external-icon" title="https://github.com/toji/gl-matrix">glMatrix</a>&nbsp;创建高性能WebGL应用的JavaScript矩阵矢量库。</li>
 <li><a href="http://sylvester.jcoglan.com/" class="external external-icon" title="http://sylvester.jcoglan.com/">Sylvester</a>&nbsp;一个开源的 JavaScript矩阵矢量库，不仅为WebGL优化过，而且很健壮。</li>
</ul>

#### CanvasRenderingContext2D 对象的方法

属性 | 描述 |
-----|-----|
arc()                   |arc(x,y,radius,startAngel,counterclockwise),即以(x,y)为圆心制作一条弧线，弧半径为radius，起始和结束角度(用弧度表示)分别为弧度startAngel,endAngel,最后一个参数表示是否按你是做方向计算，值为false表示为按顺时针方向计算
arcTo()                 |arcto(x1,y1,x2,y2,radius):从上一点开始绘制一条弧线，到(x2,y2)为为止，并且以给定的半径radius穿过(x1,y1)
beginPath()             |开始一个画布中的一条新路径（或者子路径的一个集合）。
bezierCurveTo()         |为当前的子路径添加一个三次贝塞尔曲线。bezierCurveTo(c1x,c1y,c2x,c2y,x,y):从上一点开始绘制一条曲线，到(x,y)为止，并且以(c1x,c1y)和c2x,c2y)为控制点
clearRect()             |在一个画布的一个矩形区域中清除掉像素。
clip()                  |使用当前路径作为连续绘制操作的剪切区域。
closePath()             |如果当前子路径是打开的，就关闭它。
createLinearGradient()  |返回代表线性颜色渐变的一个 CanvasGradient 对象。
createPattern()         |返回代表贴图图像的一个 CanvasPattern 对象。
createRadialGradient()  |返回代表放射颜色渐变的一个 CanvasGradient 对象。
drawImage()             |绘制一幅图像。
fill()                  |使用指定颜色、渐变或模式来绘制或填充当前路径的内部。
fillRect()              |绘制或填充一个矩形。
lineTo()                |lineTo(x,y):从上一点开始绘制一条直线，到(x,y)为止
moveTo()                |moveTo(x,y):将绘图游标移动到(x,y),不画线
quadraticCurveTo()      |quadraticCurveTo(cx,cy,x,y) 为当前路径添加一条贝塞尔曲线,到(x,y)为止，并以(cx,cy)为控制点
rect()                  |rect(x,y,width,height)为当前路径添加一条矩形子路径，而不是形状
restore()               |为画布重置为最近保存的图像状态。
rotate()                |旋转画布。
save()                  |保存 CanvasRenderingContext2D 对象的属性、剪切区域和变换矩阵。
scale()                 |标注画布的用户坐标系统。
stroke()                |沿着当前路径绘制或画一条直线。
strokeRect()            |绘制（但不填充）一个矩形。


#### 附录 Canvas库及工具

<li><a href="https://github.com/Ziv-Barber/officegen">d3.js</a>  Bring data to life with SVG, Canvas and HTML. https://d3js.org</li>
<li><a href="https://github.com/mrdoob/three.js">three.js</a>  JavaScript 3D library. https://threejs.org</li>
<li><a href="https://github.com/chartjs/Chart.js">Chart.js</a>  Simple HTML5 Charts using the <canvas> tag http://www.chartjs.org</li>
<li><a href="https://github.com/pixijs/pixi.js">pixi.js</a>  The HTML5 Creation Engine: Create beautiful digital content with the fastest, most flexible 2D WebGL renderer. http://pixijs.com</li>
<li><a href="https://github.com/Flipboard/react-canvas">react-canvas</a>  High performance <canvas> rendering for React components</li>
<li><a href="https://github.com/kangax/fabric.js">fabric.js</a>  Javascript Canvas Library, SVG-to-Canvas (& canvas-to-SVG) Parser http://fabricjs.com</li>
<li><a href="https://github.com/paperjs/paper.js">paper.js</a> The Swiss Army Knife of Vector Graphics Scripting – Scriptographer ported to JavaScript and the browser, using HTML5 Canvas. Created by @lehni & @puckey http://paperjs.org</li>
<li><a href="https://github.com/CreateJS/EaselJS">EaselJS</a> The Easel Javascript library provides a full, hierarchical display list, a core interaction model, and helper classes to make working with the HTML5 Canvas element much easier. http://createjs.com/</li>
<li><a href="https://github.com/supperjet/H5-Animation">H5-Animation</a>  每周一点canvas动画代码文件</li>


