// var a =['ant','Big','cat','Dog'];
// console.log(a);
// a.sort();
// console.log("区分大小写"+a);
// a.sort(function (s,t) {
//     var a = s.toLowerCase();
//     var b = t.toLowerCase();
//     if (a < b) return -1;
//     if (a > b) return 1;
//     return 0;
// })
// console.log("不区分大小写"+a);
 var a = [1,2,3,4,5];
// console.log(a);
// console.log(a.splice(4));
// console.log("a="+a);
// console.log(a.splice(1,2));
// console.log("a="+a);
// console.log(a.splice(1,1));
// console.log("a="+a);
console.log("a="+a);
console.log(a.splice(2,0,'a','b'));
console.log("a="+a);
console.log(a.splice(2,2,[1,2],3));
console.log("a="+a);