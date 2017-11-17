//Comet监听readystatechange事件或者检测readyState值是否为3
function crearteStreamingClient(url, progress, finished) {
    var xhr = new XMLHttpRequest(),
        received = 0;

    xhr.open("get", url, true);
    xhr.onreadystatechange = function () {
        var result;
        if (xhr.readyState == 3) {
            //只获得最新数据并调整计数器
            result = xhr.responseText.substring(received);
            received += result.length;

            //调用progress回调函数
            progress(result);
        } else if (xhr.readyState == 4) {
            finished(xhr.responseText);
        }
    };
    xhr.send(null);
    return xhr;
}

var client = crearteStreamingClient("streaming.php", function (data) {
    alert("Received:" + data);
}, function (data) {
    alert("Done!");
});