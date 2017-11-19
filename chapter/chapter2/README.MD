### Array数组
`push()`
```
var len = arr4.push("b5","b6");     //将元素添加到末尾，并返回新长度
console.log(arr4);                  //["b1", "b2", "b3", "b4", "b5", "b6"]
console.log(len);                   //6
```
`unshift()`
```
var len = arr4.unshift("b5","b6");  //将元素添加到开始，并返回新长度
console.log(arr4);                  //["b5", "b6", "b1", "b2", "b3", "b4"]
console.log(len);                   //6
```
`pop()`
```
var last = arr4.pop();//删除数最后一项，并返回删除的元素
console.log(arr4);                  //["b1", "b2", "b3"]
console.log(last);                  //b4
```
`shift()`
```
var first = arr4.shift();//删除数组第一项，并返回删除的元素
console.log(arr4);                  //["b2", "b3", "b4"]
console.log(first);                 //b1
```
`for`循环
```
 for (var i = 0; i < arr.length; i++) {
      document.write(arr[i]+",");
  }
    for (var i2 = 0; i2 < arr4.length; i2++) {
        document.write(arr4[i2]+",");//b1,b2,b3,b4,
    }
```
`for-in`循环遍历
```
 for (var item in arr) {
     document.write(arr[item] + ",");
 }
  for (var i3 in arr4) {
      document.write(arr4[i3] + ",");//b1,b2,b3,b4,
  }
for each
  var newarr4 = arr4.forEach(function (item,index) {
      document.write(item + ",");   //b1,b2,b3,b4,
  })
map
  var newarr5 = arr4.map(function (item2,index) {
      document.write(item2 + ",");  //b1,b2,b3,b4,
      return item2 + 2;
  })
  console.log(newarr5);             //["b12", "b22", "b32", "b42"]
```
#### 数组操作

`splice()`

*splice(1,2) 从1的位置开始（含1）向后删除2个元素，以数组形式返回所有移除的元素*
```
var newArray = arrsplice(1,2);
arr.splice(1,2,v1,v2);          //在删除元素的位置添加元素v1，v2
 var arr6 = ["a2","b2","c2","d2"];
var newarr6 = arr6.splice(1,2);
console.log(arr6);              //["a2", "d2"]
console.log(newarr6);           //["b2", "c2"]
 arr6.splice(0,3,"newa2","newb2","newc2");
 console.log(arr6);             //["newa2", "newb2", "newc2", "d2"]
```
`slice()`

*slice(start,end)以数组的形式返回数组的一部分，不包括end位置的元素，如果省略end将会复制start及以后的所有元素*
```
var newarr7 = arr4.slice(0,2);
console.log(newarr7);          //["b1", "b2"]
console.log(arr4);             //["b1", "b2", "b3", "b4"]原数组无变化
```
jion()

*join(‘分隔符’)用数组的元素组成字符串*
```
var str = arr.join('-');
 var str = arr4.join('-');
 console.log(str);              //b1-b2-b3-b4 string
```
`concat()`

*concat用于合并数组并返回一个新数组*
```
var newArray = arr.concat(arra1.array2,.....arrayN);
 var arrconcat = arr4.concat(arr6);
 console.log(arrconcat);        //["b1", "b2", "b3", "b4", "newa2", "newb2", "newc2", "d2"]
```
`reverse()`

*reverse将数组反转*
```
var newArray = arr.reverse();
 var arrreverse = arr4.reverse();
 console.log(arrreverse);       //["b4", "b3", "b2", "b1"]
```
`sort()`

*newArray = arr.sort() 对数组进行排序（ASCll码方式）*
```
 var arrsort = [5,23,6,9,42,63,78,91];
 console.log(arrsort.sort());       //[23, 42, 5, 6, 63, 78, 9, 91]
```
 *sort(function(a,b){return a-b})升序（冒泡排序方式）*
```
 console.log(arrsort.sort(function (a,b) {
     return a-b;
 }))                                //[5, 6, 9, 23, 42, 63, 78, 91]
```
*sort(function(a,b){return a-b})降序（冒泡排序方式）*
```
console.log(arrsort.sort(function (a,b) {
    return a+b;
}))                                 // [91, 9, 78, 63, 6, 5, 42, 23]
}());
```

### String字符串

*`indexOf()`,`lastindexOf()`*
```
var str1 = "aBcDeFC";
console.log(str1);
// console.log(str1.toLowerCase());//小写
// console.log(str1.toUpperCase());//大写
// indexOf()返回字符串第一处出现的索引，没有匹配的返回-1；
console.log(str1.indexOf("c"));//2 区分大小写
// lastindexOf() 返回字符串子串最后出现的索引，没有匹配的返回-1；
console.log(str1.lastIndexOf("C"));//6
var str2 = new String("abc");
console.log(str2+"123");//abc123
```
#### 字符串操作
*`slice()`从已有的字符串中提取部分字符串，返回新的字符串*
```
// var str = string.slice(start[,end]);
// slice返回的字符串包括start处的字符，但是不包括end处的字符；
var str3 = str1.slice(1,3);
console.log(str3);//Bc
```
*`split()`用于吧字符串分割成字符串数组；*
```
// var arr = string.split('分隔符'[.length]);
// 第一个参数必须，指定分隔符，第二个参数可选，为返回数组长度；
var str4 = 'a=bc=def=g';
var arr1 = str4.split("=");
var arr2 = str4.split("");
var arr3 = str4.split("",3);//3为length
console.log(arr1);                  //["a", "bc", "def", "g"]
console.log(arr2);                  //["a", "=", "b", "c", "=", "d", "e", "f", "=", "g"]
console.log(arr3);                  //["a", "=", "b"]
```
*`substr()`*
```
// var str = string.substr(start[,length]);
// start必需，字符串起始位置；length可选
var str5 = str1.substr(2,5);
console.log(str5);                  //cDeFC
```
*`substring()`返回介于两个指定下标之间的字符；*
```
// var str = string.substringr(start[,end]);
// 返回的字符串包括start处的字符，但不包括end处的字符；
var str6 = str1.substring(2,5);
console.log(str6);                  //cDe
```
*`concat()`将两个字符串文本组合起来并返回一个新的字符串；*
```
// var strconcat = str1.concat(str2);
var strconcat = str1.concat(str2);
console.log(strconcat);             //aBcDeFCabc
```
*`charAt()`返回指定的字符*
```
// var strcharAt = str.charAt(num);num为字符串中的下标；
var strcharAt = str1.charAt(2);
console.log(strcharAt);             //c

//parseInt(string)将字符串转换为整数返回
//parseFloat(string)将字符串转换为浮点数返回
//toString()用于将当前对象以字符串形式返回
//如果解析不到就返回NaN
var str6 = "200px";
var num1 = parseInt(str6);
console.log(num1);                  //200
var str6 = "a200px";
var num1 = parseInt(str6);
console.log(num1);                  //NaN
var str7 = "200.123";
var num2 = parseFloat(str7);
console.log(num2);                  //200.123
var num3 = 10;
var str8 = num3.toString();
console.log(str8);                  //10为字符串类型
var str = bool.toString();          //布尔型
```
*字符串拼接*
```
var a = "abc"+"xyz";                //abcxyz
var a = 10+10;                      //20
var a = "abc"+10;                   //abc10
var a = "abc"+10+20+"xyz";          //abc1020zyx
var a= 10+20+"abc"+"xyz"            //30abcxyz
console.log(a);
```