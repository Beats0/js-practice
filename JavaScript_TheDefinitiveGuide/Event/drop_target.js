(function () {
    // 查找所有的<ul class="dnd">元素，并对其调用dnd()函数
    var lists = document.getElementsByTagName("ul");
    var regexp = /\bdnd\b/;
    for (var i = 0; i < lists.length; i++) {
        if (regexp.test(lists[i].className)) dnd(lists[i]);
    }

    // 为列表元素添加拖放事件处理程序
    function dnd(list) {
        var originalClass = list.className; // 保存元素CSS类
        var entered = 0;                    // 跟踪进入和离开
        /**
         * 拖放时调用这个处理程序，检测拖放时是否能处理
         * 如果能，就返回false可以，并用高亮方式拖动，让用户知道
         * **/
        list.ondragenter = function (e) {
            e = e || window.event;                  //标准或IE
            var from = e.relatedTarget;
            entered++;
            if (( from && !isChild(from, list) ) || entered == 1) {
                //所有的dnd信息都在dataTransfer对象上
                var dt = e.dataTransfer;

                //dt.types对象列出可以拖放数据的类型或格式，包含contains()方法，indexOf()方法，IE8及以前不支持
                var types = dt.types;               //可返回格式选项
                if (!types ||                       // IE
                    ( types.contains && types.contains("text/plain") ) || // HTML5
                    ( types.indexOf && types.indexOf("text/plain") != -1 ))// Webkit
                {
                    list.className = originalClass + " droppable";
                    return false;
                }
                //无法识别数据类型时不拖放
                return
            }
            return false;
        };
        list.ondragover = function (e) {        //鼠标移动上时返回false
            return false;
        };                                      //如果真正的离开列表(不仅仅是从一个列表到另外一个列表)，取消高亮显示
        list.ondragleave = function (e) {
            e = e || window.event;
            var to = e.relatedTarget;           //列表以外的元素或者打破离开和进入次数的平衡，取消高亮显示
            entered--;
            if (( to && !isChild(to, list) ) || entered <= 0) {
                list.className = originalClass;
                entered = 0;
            }
            return false;
        }
        //实际调用时，使用一下函数
        list.ondrop = function (e) {
            e = e || window.event;
            var dt = e.dataTransfer;
            var text = dt.getData("Text");      //获得Text
            if (text) {
                var item = document.createElement("li");
                item.draggable = true;
                item.appendChild(document.createTextNode(text));//添加文本
                list.appendChild(item);                         //添加到列表

                list.className = originalClass;                 //恢复列表原始样式并且重置进入次数
                entered = 0;
                return false;
            }
        };
        //使原始列表可拖动
        var items = list.getElementsByTagName("li");
        for (var i = 0; i < items.length; i++) {
            items[i].draggable = true;
        }
        list.ondragstart = function (e) {            //调用
            var e = e || window.event;
            var target = e.target || e.srcElement;
            if (target.tagName !== "LI") {
                return false;
            }
            var dt = e.dataTransfer;                //获得dataTransfer对象
            dt.setData("Text", target.innerText || target.textContent);
            dt.effectAllowed = "copyMove";          //允许移动复制这些数据类型
        };
        //成功后放置后调用
        list.ondragend = function (e) {
            e = e || window.event;
            var target = e.target || e.srcElement;
            if (e.dataTransfer.dropEffect === "move") {
                target.parentNode.removeChild(target);
            }
        };
        //a是b的子元素返回true
        function isChild(a, b) {
            for (; a; a = a.parentNode) {
                if (a === b) return true;
            }
            return false;
        }
    }
})();
