(function () {
    var inputElts = document.getElementsByTagName("input");
    for (var i = 0; i < inputElts.length; i++) {
        var elt = inputElts[i];
        // 过滤掉不是文本域以及没有 data-allowed-chars属性的元素
        if (elt.type != "text" || !elt.getAttribute("data-allowed-chars")) {
            continue;
        }
        if (elt.addEventListener) {
            elt.addEventListener("keypress", filter, false);
            elt.addEventListener("textInput", filter, false);
            elt.addEventListener("textinput", filter, false);
        } else {                        //IE
            elt.attachEvent("onkeypress", filter);
        }
    }

    function filter(event) {
        var e = event || window.event;
        var target = e.target || e.srcElement;
        var text = null;
        if (e.type === "textinput" || e.type === "textInput") {
            text = e.data;
        } else {
            var code = e.charCode || e.keyCode;
            if (code < 32 // 控制字符
                || e.charCode == 0 // 功能键（仅指Firefox）
                || e.ctrlKey || e.altKey) /* 按下辅助键 */ {
                return;
            }
            // 将字符编码转换为字符串
            text = String.fromCharCode(code);
        }
        // 从input元素中提取所需要的信息
        var allowed = target.getAttribute("data-allowed-chars");
        var messageid = target.getAttribute("data-messageid");
        if (messageid) {
            var messageElement = document.getElementById(messageid);
        }

        // //遍历输入文字的字
        // for (var i = 0; i < text.length; i++) {
        //     var c = text.charArt(i);
        //     if (allowed.indexOf(c) == -1) {       //是否是不允许的字符
        //         //存在不合法字符时显示消息元素
        //         if (messageElement) messageElement.style.visibility = "visible";
        //
        //         //取消默认行为，不会插入文本
        //         if (e.preventDefault) e.preventDefault();
        //         if (e.returnValue) e.returnValue = false;
        //         return false;
        //     }
        // }
        // //如果所有字符都合法时，隐藏存在的消息元素
        // if (messageElement) messageElement.style.visibility="hidden";

        var value = target.value + text; // 已输入的值 + 待校验的值
        var regExp = new RegExp(allowed);
        if (!regExp.test(value)) { // 输入非法
            if (messageElement) {
                messageElement.style.visibility = "visible";
            }
            if (e.preventDefault) e.preventDefault();
            if (e.returnValue) e.returnValue = false;
            return false;
        }
        // 如果所有的字符都合法，则隐藏存在的消息元素
        if (messageElement) {
            messageElement.style.visibility = "hidden";
        }
    }
})();

//propertyToUpperCas事件探测文本输入
forceToUpperCase(uppercase);

function forceToUpperCase(element) {
    if (typeof element === "string") {
        element = document.getElementById(element);
    }
    element.oninput = upperCase;
    element.onpropertychange = upperCaseOnPropertyChange; // IE
    function upperCase(event) {
        this.value = this.value.toUpperCase();
    }

    function upperCaseOnPropertyChange(event) {
        var e = event || window.event;
        if (e.propertyName === "value") {
            // 移除 onpropertychange 处理程序，避免变大写的时候循环调用
            this.onpropertychange = null;
            // 把值都变为大写
            this.value = this.value.toUpperCase();
            // 恢复 onpropertychange 处理程序
            this.onpropertychange = upperCaseOnPropertyChange;
        }
    }
}