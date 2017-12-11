#### 表单
获取表单:

可以同时为表单指定id与name属性，但他们的值不一定相等
```js
var form1=document.getElementById("form1");
var firstForm=document.forms[0];
var secondForm=document.forms["form2"];//不推荐

//重置表单
form.reset();

//表单字段
//获得
var field1=form1.elements[0];
//获得名为“textbox1”的字段
var field2=form1.elements["textbox1"];
//获得表单中包含的字段的数量
var fieldCount=form1.elements.length;

var myForm = document.getElementById("myForm");
var colorFields = myForm.elements["color"];
console.log(colorFields.length);    //3

var firstColorFields = colorFields[0];
var firstFormField = myForm.elements[0];    //<input type="radio" name="color" value="red">
console.log(firstColorFields === firstFormField);   //true
```
#### 提交表单
```js
<!--通用-->
<input type="submit" value="Submit">
<!--自定义-->
<button type="submit">Submit</button>
<!--图像按钮-->
<input type="image" src="">
form1.submit();
```
#### 注意表单提交的重复性，解决方案有两个，在第一次提交后就禁用提交或者利用onsubmit事件处理
```js
//依然使用 EventUtil方法
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

EventUtil.addHanler(myForm, "submit", function (event) {
    event = EventUtil.getEvent(event);
    var target = EventUtil.getEvent(event);
    //获得提交按钮
    var btn = target.elements["submit-btn"];
    //禁用
    btn.disabled = true;
});
```
#### 表单字段脚本化
```js
var textbox = document.getElementById('input1');
EventUtil.addHanler(textbox, "focus", function (event) {
    event = EventUtil.getEvent(event);
    var taget = EventUtil.getTarget(event);
    if (target.style.backgroundColor != "red") {
        taget.style.backgroundColor = "yellow";
    }
});
EventUtil.addHanler(textbox, "blur", function (event) {
    event = EventUtil.getTarget(event);
    var target = EventUtil.getTarget(event);

    if (/[^\d]/.test(target.value)) {       //非数字字符
        target.style.backgroundColor = "red";
    } else {
        target.style.backgroundColor = "";
    }
});
```
#### 文本框脚本化
直接使用value方法，不要使用DOM方法
```js
var input3 = document.getElementById('input3');
console.log(input3.value);
input3.value = "new value";
console.log(input3.value);

// input3.select();
EventUtil.addHanler(input3, "focus", function (event) {
    var target = EventUtil.getTarget(event);

    target.select();
});

//跨浏览器
function selectText(textbox, startIndex, stopIndex) {
    if (textbox.setSelectionRange) {
        textbox.setSelectionRange(startIndex, stopIndex);
    } else if (textbox.createTextRange()) {
        var range = textbox.createTextRange();
        range.collapse(true);
        range.moveStart("character", startIndex);
        range.moveStart("character", stopIndex - startIndex);
        range.select();
    }
    textbox.focus();
}
```
#### 字符屏蔽
```js
EventUtil.addHanler(textbox, "keypress", function (event) {
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);
    var charCode = EventUtil.getCharCode(event);

    if (!/\d/.test(String.fromCharCode(charCode)) && charCode > 9 && !event.ctrlKey) {      //匹配为数字键，不可使用ctrl粘贴
        EventUtil.preventDefault(event);
    }
});
```
#### 表单序列化
```js
function serialize(form) {
    var parts = [],
        field = null,
        i,
        len,
        j,
        optLen,
        option,
        optValue;

    for (i = 0, len = form.elements.length; i < len; i++) {
        field = form.elements[i];
        switch (field.type) {
            case "select-one":
            case "select-multiple":
                if (field.name.length) {
                    for (i = 0, optLen = field.options.length; j < optLen; j++) {
                        option = field.options[j];
                        if (option.selected) {
                            optValue = "";
                            if (option.hasAttribute) {
                                optValue = (option.hasAttribute("value") ? option.value : option.text);
                            } else {
                                optValue = (option.attributes["value"].specified ? option.value : option.text);
                            }
                            parts.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(optValue));
                        }
                    }
                }
                break;
            case undefined:     //字段集
            case "file":        //文件输入
            case "submit":      //提交按钮
            case "reset":       //重置按钮
            case "button":      //自定义按钮
                break;
            case "radio":       //点选框按钮
            case "checkbox":    //多选框按钮
                if (!field.checked) {
                    break;
                }
            /*执行默认操作*/
            default:
                //不包含没有名字的
                if (field.name.length) {
                    parts.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value));
                }
        }
    }
    return parts.join("&");
}
```
#### 富文本编辑
```js
//exeCoommand()
//转为粗体
frames["richedit"].document.execCommand("blod",false,null);
//转为斜体
frames["richedit"].document.execCommand("italic",false,null);
//格式化为一级标题
frames["richedit"].document.execCommand("formablock",false,"<h1>");
```
#### 表单事件

属性 | 描述 |
-----|-----|
onblur          |当元素失去焦点时运行脚本
onchange        |当元素改变时运行脚本
oncontextmenu   |当触发上下文菜单时运行脚本
onfocus         |当元素获得焦点时运行脚本
onformchange    |当表单改变时运行脚本
onforminput     |当表单获得用户输入时运行脚本
oninput         |当元素获得用户输入时运行脚本
oninvalid       |当元素无效时运行脚本
onreset         |当表单重置时运行脚本。HTML 5 不支持。
onselect        |当选取元素时运行脚本
onsubmit        |当提交表单时运行脚本

