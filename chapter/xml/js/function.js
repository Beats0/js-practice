//跨浏览器处理xml
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

//parseXml()函数只接收一个参数即可解析xml字符串，使用这个函数解析时应该放在try-catch语句中：
var xmldom = null;
try {
    xmldom = parseXml("<root></root>");
} catch (ex) {
    alert(ex.message);
}
//进行处理


//序列化XML处理
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


//Xpath

//跨浏览器使用Xpath
//*保证DOM3级XPath对象浏览器中,可以使用selecSingleNode()函数或selectNodes()函数*
//使用selecSingleNode()函数
//XML
/*{
    prefix1:"uri1",
    prefix2:"uri2",
    prefix3:"uri3",
}
*/
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


//使用selectNodes()函数
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


//跨浏览器使用XSLT
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