#### 简单值

#### 对象

##### JS-JSON
```js
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

##### JSON-JSON
```js
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
#### 数组

Json数组没有赋值语句和分号
JavaScript中：
```js
var values = [12,"Hi",true];
```
Json中：
```js
{25,"Hi",true}
```
#### 解析与序列化
1. stringify()

```js
    let book = {
        title: "JavaScript",
        autor: [
            "Nicjolas"
        ],
        edition: 3,
        year: 2012
    };

    let JsonText = JSON.stringify(book);
    console.log(JsonText);
```
解析后：
```js
{"title":"JavaScript","autor":["Nicjolas"],"edition":3,"year":2012}
```

序列化为数组后：
```js
let JsonTextArray = JSON.stringify(book,["title","edition"]);
```
解析后：
```js
console.log(JsonTextArray);     //{"title":"JavaScript","edition":3}
```

2. parse()
```js
    let NewBook = {
        title: "JavaScript",
        autor: [
            "Nicjolas"
        ],
        edition: 3,
        year: 2012,
        releaseDate: new Date(2017, 11, 16)
    };
    let NewJsonText = JSON.stringify(NewBook);
    let bookCopy = JSON.parse(NewJsonText, function (key, value) {
        if (key == "releaseDate") {
            return new Date(value);
        } else {
            return value;
        }
    });
```
解析后：
```js
console.log(bookCopy.releaseDate.getFullYear());        //2017
```