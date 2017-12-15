var clock = document.getElementById("clock"); // 时钟
var icon = new Image(); // 用于拖动的图片
icon.src = "https://beats0.github.io/js-practice/JavaScript_TheDefinitiveGuide/img/clock.png";

// 让时钟每秒更新一次
function displayTime() {
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;
    clock.innerHTML = hours + ":" + minutes + ":" + seconds;
    setTimeout(displayTime, 1000);
}

displayTime();
// 使时钟能够拖动，使用<span draggable="true">也行
clock.draggable = true;
// 设置拖动事件处理程序
clock.ondragstart = function (event) {
    var event = event || window.event;
    // DataTransfer对象是拖放API的关键
    var dt = event.dataTransfer;
    // 告诉浏览器正则拖动的数据类型及数据（这里的数据是时间戳）
    dt.setData("Text", clock.innerHTML + "\n");
    // 用图标来表示正在被拖动的时间戳
    if (dt.setDragImage) {
        dt.setDragImage(icon, 0, 0);
    }
};