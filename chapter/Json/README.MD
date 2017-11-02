#### JS-JSON
```
var json = {
    "name": "AAA", "sex": "girl", "age": 20
};
alert(json.name);
var json2 = eval(json);
alert(json2.sex);
for (var i in json2) {
    console.log(i+":"+json2[i]);
}
```

#### JSON-JSON
```
{
  "name":"AAA",
  "sex":"girl",
  "age":20,
  "a":null,
  "b":true,
  "c":false,
  "add":{
    "local":"Beijing",
    "live":"Shanghai"
  }
  "score":[12,23,34,45]
}
```