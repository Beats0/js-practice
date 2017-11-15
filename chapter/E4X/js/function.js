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
