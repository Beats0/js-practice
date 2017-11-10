//获取表单
//可以同时为表单指定id与name属性，但他们的值不一定相等
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

//提交表单
// <!--通用-->
// <input type="submit" value="Submit">
// <!--自定义-->
// <button type="submit">Submit</button>
// <!--图像按钮-->
// <input type="image" src="">
form1.submit();
//注意表单提交的重复性，解决方案有两个，在第一次提交后就禁用提交或者利用onsubmit事件处理
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

