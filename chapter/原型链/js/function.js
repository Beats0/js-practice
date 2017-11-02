//1.原型链
// function SuperType() {
//     this.property = true
// }
//
// SuperType.prototype.getSuperValue = function () {
//     return this.property
// };
//
// function SubType() {
//     this.subproperty = false
// }


//2.添加方法
// SubType.prototype = new SuperType();
// SubType.prototype.getSuperValue = function () {
//     return this.subproperty;
// };
// var instance = new SubType();
// console.log(instance.getSuperValue());//true --> false

//
// function SuperType() {
//     this.property = true
// }
//
// SuperType.prototype.getSuperValue = function () {
//     return this.property
// }
//
// function SubType() {
//     this.subproperty = new SuperType()
// }
//
// //添加新的方法
// SubType.prototype.getSubValue() = function () {
//     return this.subproperty
// }
// //重写
// SubType.prototype.getSuperValue() = function () {
//     return false
// }
// var instance = new SubType();
// console.log(instance.getSuperValue()); //false -->Error

//3.使用字面添加方法（错误）
// function SuperType() {
//     this.property=true
// }
// SuperType.prototype.getSuperValue=function () {
//     return this.property
// }
// function  SubType() {
//     this.subproperty=false
// }
// //继承Supertype
// SubType.prototype=new SuperType();
// //使用字面上的添加会导致上一行代码无效
// SubType.prototype={
//     getSubValue:function () {
//         return this.subproperty;
//     },
//     someotherMathhd:function () {
//         return false;
//     }
// };
// var instance=new SubType();
// console.log(instance.getSubValue()); //error  -->  false