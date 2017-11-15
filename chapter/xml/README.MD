#### 跨浏览器处理xml
```
function parseXml(xml) {
    var xmldom = null;

    if (typeof DOMParser != "undfind") {
        xmldom = (new DOMParser()).parseFromString(xml, "text/xml");
        var errors = xmldom.getElementsByTagName("parseerror");
        if (errors.length) {
            throw new Error("XML parsing error:" + errors[0].textContent);
        }
    } else if (typeof ActiveXObject != "undefind") {
        xmldom = CreateDocument();
        xmldom.loadXML(xml);
        if (xmldom.parseError != 0) {
            throw new Error("XML parsing error:" + xmldom.parseError.reason);
        }
    } else {
        throw new Error("No XML parser available!");
    }
    return xmldom;
}
```
parseXml()函数只接收一个参数即可解析xml字符串，使用这个函数解析时应该放在try-catch语句中：


#### 序列化XML处理
```
function serializer(xmldom) {
    if (typeof XMLSerializer != "undefined") {
        return (new XMLSerializer()).serializeToString(xmldom);
    } else if (typeof xmldom.xml != "undefined") {
        return xmldom.xml;
    } else {
        throw new Error("Counld not serialize XML DOM!");
    }
}

//调用
var xml = serialize(xmldom);
```

#### 跨浏览器使用Xpath
*保证DOM3级XPath对象浏览器中,可以使用`selecSingleNode()函数`或`selectNodes()函数`*
##### 使用`selecSingleNode()`函数
```
XML
{
  prefix1:"uri1",
  prefix2:"uri2",
  prefix3:"uri3",
}
```
js
```
function selectSingleNode(context, expression, namespaces) {
    var doc = (context.nodeType != 9 ? context.ownerDocument : context);
    if (typeof doc.evaluate != "undefined") {
        var nsresolver = null;
        if (namespaces instanceof Object) {
            nsresolver = function (prefix) {
                return namespaces[prefix];
            };
        }

        var result = doc.evaluate(express, context, nsresolver, XPathResult, FIRST_ORDERED_NODE_TYPE, null);
        return (result !== null ? result.singleNodeValue : null);
    } else if (typeof context.selectSingleNode != "undefined") {
        //创建命名空间字符串
        if (namespaces instanceof Object) {
            var ns = "";
            for (var prefix in namespaces) {
                if (namespaces.hasOwnProperty(prefix)) {
                    ns += "xmlns:" + prefix + "=" + namespaces[prefix] + "'";
                }
            }
            doc.setProperty("SelectionNamespaces", ns);
        }
        return context.selectSingleNode(expression);
    } else {
        throw new Error("No Xpath engine found!");
    }
}

//调用
var result = selectSingleNode(xmldom.documentElement, "wrox:boook/wrox:author", {wrox: "http://www.wrox.com/"});
alert(serializeXML(result));
```

##### 使用`selectNodes()`函数
```
function selectNodes(context, expression, namespaces) {
    var doc = (context.nodeType != 9 ? context.ownerDocument : context);

    if (typeof doc.evaluate != "undefined") {
        var nsresolver = null;
        if (namespaces instanceof Object) {
            nsresolver = function (prefix) {
                return namespaces[prefix];
            };
        }
        var result = doc.evaluate(expression, context, nsresolver, XPathResult, ORDERED_NODE_SNAPSHOT_TYPE, null);
        var nodes = new Array();
        if (result !== null) {
            for (vari = 0, len = result.snapshotLength; i < len; i++) {
                nodes.push(result.snapshotItem(i));
            }
        }
        return nodes;
    } else if (typeof context.selectSingleNode != "undefined") {
        //创建命名空间字符串
        if (namespaces instanceof Object) {
            var na = "";
            for (var prefix in namespaces) {
                if (namespaces.hasOwnProperty(prefix)) {
                    ns += "xmlns:" + prefix + "=" + namespaces[prefix] + "'";
                }
            }
            doc.setProperty("SelectionNamespaces", ns);
        }
        var result = context.selectSingleNode(expression);
        var nodes = new Array();
        for (var i = 0, len = result.length; i < len; i++) {
            nodes.push(result[i]);
        }
        return nodes;
    } else {
        throw new Error("No Xpath engine found!");
    }
}

//调用
var result = selectNodes(xmldom.documentElement, "wrox:book/wrox:author", {wrox: "http://ww.wrox.com/"});
alert(result.length);
```


#### XML
```
<!DOCTYPE html>

<!--<html>-->
<!--<body>-->

<!--<script type="text/javascript">-->
    <!--if (window.XMLHttpRequest)-->
    <!--{// code for IE7+, Firefox, Chrome, Opera, Safari-->
        <!--xmlhttp=new XMLHttpRequest();-->
    <!--}-->
    <!--else-->
    <!--{// code for IE6, IE5-->
        <!--xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");-->
    <!--}-->
    <!--xmlhttp.open("GET","/example/xmle/cd_catalog.xml",false);-->
    <!--xmlhttp.send();-->
    <!--xmlDoc=xmlhttp.responseXML;-->

    <!--document.write("<table border='1'>");-->
    <!--var x=xmlDoc.getElementsByTagName("CD");-->
    <!--for (i=0;i<x.length;i++)-->
    <!--{-->
        <!--document.write("<tr><td>");-->
        <!--document.write(x[i].getElementsByTagName("ARTIST")[0].childNodes[0].nodeValue);-->
        <!--document.write("</td><td>");-->
        <!--document.write(x[i].getElementsByTagName("TITLE")[0].childNodes[0].nodeValue);-->
        <!--document.write("</td></tr>");-->
    <!--}-->
    <!--document.write("</table>");-->
<!--</script>-->

<!--</body>-->
<!--</html>-->

<html>
<body>

<script type="text/javascript">
    var xmlDoc=null;
    if (window.ActiveXObject)
    {// code for IE
        xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
    }
    else if (document.implementation.createDocument)
    {// code for Mozilla, Firefox, Opera, etc.
        xmlDoc=document.implementation.createDocument("","",null);
    }
    else
    {
        alert('Your browser cannot handle this script');
    }
    if (xmlDoc!=null)
    {
        xmlDoc.async=false;
        xmlDoc.load("http://www.w3school.com.cn/example/xmle/cd_catalog.xml"/*tpa=http://www.w3school.com.cn/example/xmle/cd_catalog.xml*/);
        var x=xmlDoc.getElementsByTagName("CD");

        document.write("<table border='1'>");
        document.write("<thead>");
        document.write("<tr><th>Artist</th><th>Title</th></tr>");
        document.write("</thead>");

        document.write("<tfoot>");
        document.write("<tr><th colspan='2'>This is my CD collection</th></tr>");
        document.write("</tfoot>");

        for (var i=0;i<x.length;i++)
        {
            document.write("<tr>");
            document.write("<td>");
            document.write(x[i].getElementsByTagName("ARTIST")[0].childNodes[0].nodeValue);
            document.write("</td>");

            document.write("<td>");
            document.write(x[i].getElementsByTagName("TITLE")[0].childNodes[0].nodeValue);
            document.write("</td>");
            document.write("</tr>");
        }
        document.write("</table>");
    }
</script>

</body>
</html>



<!--遍历 XML 节点树 -->
<!--<html>-->
<!--<body>-->
<!--<script type="text/javascript">-->
    <!--var xmlDoc;-->
    <!--// code for IE-->
    <!--if (window.ActiveXObject)-->
    <!--{-->
        <!--xmlDoc=new ActiveXObject("Microsoft.XMLDOM");-->
    <!--}-->
<!--// code for Mozilla, Firefox, Opera, etc.-->
    <!--else if (document.implementation.createDocument)-->
    <!--{-->
        <!--xmlDoc=document.implementation.createDocument("","",null);-->
    <!--}-->
    <!--else-->
    <!--{-->
        <!--alert('Your browser cannot handle this script');-->
    <!--}-->
    <!--xmlDoc.async=false;-->
    <!--xmlDoc.load("../example/xmle/note.xml.htm"/*tpa=http://www.w3school.com.cn/example/xmle/note.xml*/);-->

    <!--var x=xmlDoc.documentElement.childNodes;-->

    <!--for (var i=0;i<x.length;i++)-->
    <!--{-->
        <!--if (x[i].nodeType==1)-->
        <!--{-->
            <!--//Process only element (nodeType 1) nodes-->
            <!--document.write(x[i].nodeName + ": ");-->
            <!--document.write(x[i].childNodes[0].nodeValue);-->
            <!--document.write("<br />");-->
        <!--}-->
    <!--}-->
<!--</script>-->
<!--</body>-->
<!--</html>-->

```

#### XSLT
XSL模板与XSL处理器

```
<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:output method="html"/>
    <xsl:param name="massage"/>

    <xsl:template match="/">
        <ul>
            <xsl:apply-templates select="*"/>
        </ul>
        <p>Messge:<xsl:value-of select="$massage"/></p>
    </xsl:template>

    <xsl:template match="employee">
        <li>
            <xsl:value-of select="name"/>

            <em><xsl:value-of select="@title"/></em>
        </li>
    </xsl:template>


</xsl:stylesheet>
```
*=>调用*
```
processor.input = xmldom.documentElement;
processor.addParameter("message","Hello World!");
processor.transform();
```

#### 跨浏览器使用XSLT
```
function transform(context, xslt) {
    if (typeof XSLTProcessor != "undefined") {
        var processor = new XSLTProcessor();
        processor.importStylesheet(xslt);
        var result = processor.transformToDocument(context);
        return (new XMLSerializer()).serializeToString(result);
    } else if (typeof context.transformNode != "undefined") {
        return context.transformNode(xslt);
    } else {
        throw new Error("No XSLT processor available!");
    }
}

//调用,会在处理无效的情况下报错
var result = transform(xmldom, xsltdom);
```

