//RegExp正则表达式
//new RegExp(pattern/*字符串，正则*/,attributes/*可选字符串包含属性g（全局匹配）i（区分大小写）*/)
//var pattern = new RegExp("n+","g")
var reg = "abc";
var reg1 = new RegExp("reg", "gi");
var reg2 = /abc/gi;
// \d:匹配任意一个0-9数字
// \s:匹配任意空字符
// \b:匹配一个单词边界，不匹配字符
// \w:匹配任意一个字符(字母。数字。下划线)
// \n:查找换行符
// . :匹配任意一个字符，除(\n)

//参数reg.test()是否有ture or false | reg.exec返回结果第一个值 | reg.compile()编辑正则表达式
var reg3 = /[0-9a-z]{4,7}/gi;
var string = "aasdfghjkl112233";
console.log(reg3.test(string));//ture 4-7个连续的
console.log(reg3.exec(string));//["jkl1122", index: 7, input: "aasdfghjkl112233"]