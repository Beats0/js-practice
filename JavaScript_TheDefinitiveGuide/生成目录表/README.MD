##### 使用innerHTML()实现insertAdjacentHTML()
```
var Insert = (function () {
    //如果元素有原生的insertAdjacentHTML()
    if (document.createElement("div").insertAdjacentHTML) {
        return {
            before: function (e, h) {
                e.insertAdjacentHTML("beforebegin", h);
            },
            after: function (e, h) {
                e.insertAdjacentHTML("afterend", h);
            },
            atStart: function (e, h) {
                e.insertAdjacentHTML("afterbegin", h);
            },
            atEnd: function (e, h) {
                e.insertAdjacentHTML("beforeend", h);
            }
        };
    }
    //如果没有原生的insertAdjacentHTML()
    //插入4个属性
    function fragment(html) {
        var elt = document.createElement("div");          //创建空元素
        var frag = document.createDocumentFragment();     //创建空白文档片段
        elt.innerHTML = html;                             //设置元素内容
        while (elt.firstChild)                            //移动所有节点
            frag.appendChild(elt.firstChild);             //从elt大frag
        return frag;                                      //返回frag
    }

    var Insert = {
        before: function (elt, html) {
            elt.parentNode.insertBefore(fragment(html), elt);
        },
        after: function (elt, html) {
            elt.parentNode.insertBefore(fragment(html), elt.nextSibling);
        },
        atStart: function (elt, html) {
            elt.parentNode.insertBefore(fargment(html), elt.firstChild);
        },
        atStart: function (elt, html) {
            elt.parentNode.insertBefore(fargment(html), elt.firstChild);
        },
        atEnd: function (elt, html) {
            elt.appendChild(fargment(html));
        }
    };
    //基于以上函数实现
    Element.prototype.insertAdjacentHTML = function (pos, html) {
        switch (pos.toLowerCase()) {
            case "beforebegin":
                return Insert.before(this, html);
            case "afterend":
                return Insert.after(this, html);
            case "afterbegin":
                return Insert.atStart(this, html);
            case "beforeend":
                return Insert.atEnd(this, html);
        }
    };
    return Insert;
}());
```

##### 生成目录表
生成的Toc目录文档应该具有自己的css样式，目录区域样式className为"TOCEntry"

`<h1>`的className为"TOCLevel1",`<h2>`的className为"TOCLevel2"并以此类推段编号为"TOCSectNum"

*CSS:*
```
 #TOC {
            border: 1px solid black;
            margin: 10px;
            padding: 10px;
        }

 .TOCEntry {
            font-family: sans-serif;
        }

 .TOCEntry a {
            text-decoration: none;
        }

 .TOCLevel1 {
            font-size: 16pt;
            font-weight: bold;
        }

 .TOCLevel2 {
            font-size: 12pt;
            margin-left: .5in;
        }

 .TOCSectNum:after {
            content: '';
        }

 .TOCSectNum {
            display: none;
        }
```
*JavaScript:*
```
onload(function () {
    var toc = document.getElementById("TOC");
    if (!toc) {
        toc = document.createElement("div");
        toc.id = "TOC";
        document.body.insertBefore(toc, document.body.firstChild);
    }
    //查找所有的标题元素
    var headings;
    if (document.querySelectorAll)
        headings = document.querySelectorAll("h1,h2,h3,h4,h5,h6");
    else
        headings = findHeadings(document.body, []);

    //遍历document的body，查找标题
    function findHeadings(root, sects) {
        for (var c = root.firstChild; c !== null; c = c.nextSibling) {
            if (c.nodeType !== 1)
                continue;
            if (c.tagName.length == 2 && c.tagName.charAt(0) == "H")
                sects.push(c);
            else
                findHeadings(c, sects);
        }
        return sects;
    }

    //初始化一个数组保持跟踪章节号
    var sectionNumbers = [0, 0, 0, 0, 0, 0];
    //找到标题元素
    for (var h = 0; h < headings.length; h++) {
        var heading = headings[h];
        //跳过TOC容器的标题元素
        if (heading.parentNode == toc)
            continue;
        //判定级别
        var level = parseInt(heading.tagName.charAt(1));
        if (isNaN(level) || level > 6)
            continue;
        //增加sectionNumbers对应的数字
        //重置所有标题比他级别低的数字为零
        sectionNumbers[level - 1]++;
        for (var i = level; i < 6; i++) {
            sectionNumbers[i] = 0;
        }
        //将所有的标题级别的章节号组合产生一个章节号如2.3.1
        var sectionNumber = sectionNumbers.slice(0, level).join(".");
        //把数字放在<span>中
        var span = document.createElement("span");
        span.className = "TOCSectNum";
        span.innerHTML = sectionNumber;
        heading.insertBefore(span, heading.firstChild);
        //命名锚点将标题包起来，以便增加链接
        var anchor = document.createElement("a");
        anchor.name = "TOCSectNum";
        heading.name = "TOC" + sectionNumber;
        heading.parentNode.insertBefore(anchor, heading);
        anchor.appendChild(heading);
        //为该节点创建一个链接
        var link = document.createElement("a");
        link.href = "#TOC" + sectionNumber;     //链接的目标地址
        link.innerHTML = heading.innerHTML;   //链接文本与实际标题一直
        //将链接放在一个div中，div基于级别名字的样式修改
        var entry = document.createElement("div");
        entry.className = "TOCEntry TOCLevel" + level;
        entry.appendChild(link);
        //将div添加到TOC容器中
        toc.appendChild(entry);
    }
});
```