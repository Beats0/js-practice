var getBlobURL = (window.URL && URL.createObjectURL.bind(URL)) || window.createObjectURL || (window.webkitURL && webkitURL.revokeObjectURL.bind(webkitURL));
var revokeBlobURL = (window.URL && URL.revokeObjectURL.bind(URL)) || (window.webkitURL && webkitURL.revokeObjectURL.bind(webkitURL)) || window.revokeBlobURL;
//拖放
window.onload = function () {
    var droptarget = document.getElementById('droptarget');
    droptarget.ondragenter = function (e) {
        var types = e.dataTransfer.types;
        if (!types || (types.contains && types.contains("Files")) || (types.indexOf && types.indexOf("Files") != -1)) { //是否为文件
            droptarget.classList.add("active");         //高亮显示
            return false;
        }
    };
    //移除时取消
    droptarget.ondragleave = function () {
        droptarget.classList.remove("active");
    };
    //通知浏览器继续发出提醒
    droptarget.ondragover = function (e) {
        return false;
    };
    //放下文件时获取url并显示对应缩略图
    droptarget.ondrop = function (e) {
        var files = e.dataTransfer.files;               //放下文件
        for (var i = 0; i < files.length; i++) {
            var type = files[i].type;
            if (type.substring(0, 6) !== "image/") continue;//不是图片的忽略
            var img = document.createElement('img');    //创建<img>元素
            img.src = getBlobURL(files[i]);             //使用Blob URL
            img.onload = function () {                  //图片载入时
                this.width = 200;                       //调整图片大小并合并
                document.body.appendChild(this);        //添加到文档
                revokeBlobURL(this.src);                //避免内存泄露
                console.log(this.src);                  //打印图片地址
            }
        }
        droptarget.classList.remove("active");
        return false;
    }
};
