#### E4X
E4X(E4X = JavaScript for XML) 意为“支持 XML 的 ECMAScript”（ECMAScript For XML）。它是对 ECMAScript 的标准扩展。E4X意味着“支持XML的JavaScript”（JavaScript for XML）。

```js
// var x = new XML("<employee position=\"SoftWare Engineer\"><name>Nicholas" + "Zakas</name></employee>");

let x = new XML("<employee position=\"SoftWare Engineer\"><name>Nicholas" + "Zakas</name></employee>");

console.log(XML.name());

let x = new XML(xmldom);
let employee = <employee position="Software Engineer">
    <name>Nicholas Zakas</name>
</employee>;

console.log(employee.name());

let xml=<wrox:root xmlns:wrox="http://www.wrox.com/">
        <wrox:message>Hello World</wrox:message>
</wrox:root>;
```