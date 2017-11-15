//展示鼠标坐标
function cnvs_getCoordinates(e) {
    x = e.clientX;
    y = e.clientY;
    document.getElementById("xycoordinates").innerHTML = "Coordinates: (" + x + "," + y + ")";
}

function cnvs_clearCoordinates() {
    document.getElementById("xycoordinates").innerHTML = "";
}

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
//描边线的宽度有linewidth数值决定，还可通过lineCap决定线条末端平头(butt),圆头(round),方头(square),lineJoin控制线条相交方式：圆交(round),斜交(bevel),斜接(miter)

//绘制表盘
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
    context2.translate(100, 100);

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

//科赫棉花
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


//绘制图像
// context2.drawImage(image,0,10,50,50,0,100,40,60);
//9个参数意为：要绘制的图像，原图像的x坐标，原图像的y坐标，原图像的宽度，原图像的高度，目标图像的x坐标，目标图像的y坐标，目标图像的宽度，目标图像的高度。

//阴影
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

//渐变
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

//圆心渐变
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

//使用图像数据
var imageDate = context.getImageData(10, 5, 50, 50);
var date = imageDate.data,
    red = date[0],
    green = date[1],
    blue = date[2],
    alpha = date[3];
if (drawing.getContext) {
    var context = drawing.getContext("2d");
    image = document.images[0], imageDate, date, i, len, average, red, green, blue, alpha;

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








