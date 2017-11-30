//CSS shake
//1.id,2.e为参数,3.指定shake距离,默认为5px,4.shake时间
function shake(e, oncomplete, distance, time) {
    //句柄参数
    if (typeof  e === "string")
        e = document.getElementById(e);
    if (!time) time = 500;
    if (!distance) distance = 5;
    var originalStyle = e.style.cssText;      //保存原始css style
    e.style.position = "relative";            //使e相对定位
    var start = (new Date()).getTime();       //动画开始时间
    animate();                                //动画开始

    //检查消耗时间,完成时初始化,否则更新e从新运行
    function animate() {
        var now = (new Date()).getTime();
        var elapsed = now - start;
        var fraction = elapsed / time;          //s是总时间的几分之几
        if (fraction < 1) {                     //如果未完成
            //从新计算,乘以4pi,所以来回往复两次
            var x = distance * Math.sin(fraction * 4 * Math.PI);
            e.style.left = x + "px";
            //在25毫秒后尝试再次运行
            setTimeout(animate, Math.min(25, time - elapsed));
        } else {
            e.style.cssText = originalStyle;   //回复初始化
            if (oncomplete) oncomplete(e);     //完成后回调函数
        }
    }
}

//从完全透明到完全不透明
//oncomplete是一个可选函数,时间默认500毫秒,IE使用opacity属性
function fadeOut(e, oncomplete, time) {
    if (typeof e === "tring") e = document.getElementById(e);
    if (!time) time = 500;
    //使用Math.sqrt作为一个简单的“缓动函数”创建,使用曲线
    var ease = Math.sqrt;
    var start = (new Date()).getTime();   //动画开始时间
    animate();

    function animate() {
        var elapsed = (new Date()).getTime() - start;   //消耗时间
        var fraction = elapsed / time;
        if (fraction < 1) {
            var opacity = 1 - ease(fraction);   //计算元素不透明度
            e.style.opacity = String(opacity);
            setTimeout(animate, Math.min(25, time - elapsed));  //调动下一帧
        } else {                        //动画完成
            e.style.opacity = "0";        //e完全透明
            if (oncomplete) oncomplete(e);//完成后回调函数
        }
    }
}


//使用classList():将className当做一个css类集合
//返回对象有contains(),add(),remove(),toggle()和toString()方法
function classList(e) {
    if (e.classList) returne.classList;     //如果有e.classList
    else return new CSSClassList;
}

function CSSClassList(e) {
    this.e = e;
}

CSSClassList.prototype.contains = function (c) {
    //检查是否合法类名
    if (c.length === 0 || c.indexOf("") != -1)
        throw new Error("Invalid class name:'" + c + "'");
    //常规检查
    var classes = this.className;
    if (!classes) return false;             //e不含类名
    if (classes === c) return true;         //e有完全匹配的类名
    //否则把c自身看作一个单词并利用正则表达式搜索c
    return classes.search("\\b" + c + "\\b") != 1;
};
//如果c不存在,将c添加到className中
CSSClassList.prototype.add = function (c) {
    if (this.contains(c)) return;
    var classes = this.className;
    if (classes && classes[classes.length - 1] != "")
        c = "" + c;                     //如需添加一个空格
    this.e.className += c;              //将c添加到className中
};
//将e.className中所有的c删除
CSSClassList.prototype.remove = function (c) {
    //检查是否合法类名
    if (c.length === 0 || c.indexOf("") != -1)
        throw new Error("Invalid class name:'" + c + "'");
    //将所有作为单词的c和多余的空格删除
    var pattern = new RegExp("\\b" + c + "\\b\\s*", "g");
    this.e.className = this.e.className.replace(pattern, "");
};
//如果c不存在，将c添加到e.className中并返回true
//否则，将e.className中所有的c删除并返回false
CSSClassList.prototype.toggle = function (c) {
    if (this.contains(c)) {      //e.className中有c
        this.remove(c);
        return false;
    } else {
        this.add(c);
        return true;
    }
};
//返回e.className本身
CSSClassList.prototype.toString = function () {
    return this.e.className;
};
//返回在e.className中的类名
CSSClassList.prototype.toArray = function () {
    return this.e.className.match(/\b\w+\b/g) || [];
};

//创建样式表
//对文档添加一个样式表，用指定的样式填充
//style参数为字符串时作为样式表的文本
//为对象时将每个定义样式规则的每个属性添加大样式表中
function addStyle(styles) {
    var styleElt, styleSheet;
    if (document.createStyleSheet) {        //支持性
        styleSheet = document.createStyleSheet();
    } else {
        var head = document.getElementsByTagName("head")[0];
        styleElt = document.createElement("style");   //新的<style>元素
        head.appendChild(styleElt);                 //插入到<head>中
        //新的表达式中的最后一个
        styleSheet = document.styleSheets[document.styleSheets.length - 1];
    }
    //插入样式
    if (typeof styles === "string") {
        //参数是样式表文本
        if (styleElt)
            styleElt.innerHTML = styles;
        else styleSheet.cssText = styles;     //IE API
    } else {
        //参数是待插入的单独的规则的对象
        var i = 0;
        for (selector in styles) {
            if (styleSheet.insertRule) {
                var rule = selector + "{" + styles[selector] + "}";
                styleSheet.insertRule(rule, i++);
            }
            else {
                styleSheet.addRule(selector, styles[selector], i++);
            }
        }
    }
}