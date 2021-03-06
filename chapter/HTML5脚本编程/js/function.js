var EventUtil = {
    addHanler: function (element, type, handler) {
        //......
    },
    getEvent: function (event) {
        return event ? event : window.event;
    },
    getTarget: function (event) {
        return event.target || event.srcElement;
    },
    praventDefault: function (event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },

    removeHandler: function (element, type, hanlder) {
        //......
    },

    stopPropagation: function (event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    }
};
var palyer = document.getElementById("player"),
    btn = document.getElementById("video-btn"),
    curtime = document.getElementById("curtime"),
    duration = document.getElementById("duration");
duration.innerHTML = player.duration;
EventUtil.addHanler(btn, "click", function (event) {
    if (player.paused) {
        player.play();
        btn.value = "Pause";
    } else {
        player.paused();
        btn.value = "Play";
    }
});
setInterval(function () {
    curtime.innerHTML = palyer.currentTime;
}, 250);

//使用http post请求上传文件
//查找data-uploadto属性的全部<input type="file">元素
//注册onchange事件
//文件会自动通过post方法发送到指定的“uploadto”url
//服务器响应忽略
whenReady(function () {
    var elts = document.getElementsByTagName("input");
    for (var i = 0; i < elts.length; i++) {
        var input = elts[i];
        if (input.type !== "file") continue;                  //跳过非文件
        var url = input.getAttribute("date-uploadto");        //获取url
        if (!url) continue;                                 //跳过没有url的

        input.addEventListener("change", function () {       //选择文件时
            var file = this.files[0];                         //单个文件
            if (!file) return;                              //如果没有文件，不执行
            var xhr = new XMLHttpRequest();                   //创建新的请求
            xhr.open("POST", url);                           //向这个POST发送新的请求
            xhr.send(file);                                 //将文件作为主体发送
        }, false)
    }
});