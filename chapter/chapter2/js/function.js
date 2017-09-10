var str1 = "aBcDeFC";
console.log(str1);
// console.log(str1.toLowerCase());//小写
// console.log(str1.toUpperCase());//大写
// indexOff()返回字符串第一处出现的索引，没有匹配的返回-1；
console.log(str1.indexOf("c"));//2 区分大小写
// lastindexOf() 返回字符串子串最后出现的索引，没有匹配的返回-1；
console.log(str1.lastIndexOf("C"));//6
var str2 = new String("abc");
console.log(str2+"123");//abc123

//slice()从已有的字符串中提取部分字符串，返回新的字符串
// var str = string.slice(start[,end]);
// slice返回的字符串包括start处的字符，但是不包括end处的字符；
var str3 = str1.slice(1,3);
console.log(str3);//Bc

//split()用于吧字符串分割成字符串数组；
// var arr = string.split('分隔符'[.length]);
// 第一个参数必须，指定分隔符，第二个参数可选，为返回数组长度；
var str4 = 'a=bc=def=g';
var arr1 = str4.split("=");
var arr2 = str4.split("");
var arr3 = str4.split("",3);//3为length
console.log(arr1);//["a", "bc", "def", "g"]
console.log(arr2);//["a", "=", "b", "c", "=", "d", "e", "f", "=", "g"]
console.log(arr3);//["a", "=", "b"]

//substr()
// var str = string.substr(start[,length]);
// start必需，字符串起始位置；length可选
var str5 = str1.substr(2,5);
console.log(str5);//cDeFC

//substring()返回介于两个指定下标之间的字符；
// var str = string.substringr(start[,end]);
// 返回的字符串包括start处的字符，但不包括end处的字符；
var str6 = str1.substring(2,5);
console.log(str6);//cDe

//concat()将两个字符串文本组合起来并返回一个新的字符串；
// var strconcat = str1.concat(str2);
var strconcat = str1.concat(str2);
console.log(strconcat);//aBcDeFCabc

//charAt()返回指定的字符
// var strcharAt = str.charAt(num);num为字符串中的下标；
var strcharAt = str1.charAt(2);
console.log(strcharAt);//c

//parseInt(string)将字符串转换为整数返回
//parseFloat(string)将字符串转换为浮点数返回
//toString()用于将当前对象以字符串形式返回
//如果解析不到就返回NaN
var str6 = "200px";
var num1 = parseInt(str6);
console.log(num1);//200
var str6 = "a200px";
var num1 = parseInt(str6);
console.log(num1);//NaN
var str7 = "200.123";
var num2 = parseFloat(str7);
console.log(num2);//200.123
var num3 = 10;
var str8 = num3.toString();
console.log(str8);//10为字符串类型
// var str = bool.toString();//布尔型

//字符串拼接
var a = "abc"+"xyz";//abcxyz
var a = 10+10;//20
var a = "abc"+10;//abc10
var a = "abc"+10+20+"xyz";//abc1020zyx
var a= 10+20+"abc"+"xyz"//30abcxyz
console.log(a);