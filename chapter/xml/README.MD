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
