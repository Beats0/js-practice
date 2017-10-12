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
//
// //继承
// SubType.prototype = new SuperType();
// SubType.prototype.getSuperValue = function () {
//     return this.subproperty;
// };
// var instance = new SubType();
// alert(instance.getSuperValue());//false
function SuperType(){
    this.property = true;
}

SuperType.prototype.getSuperValue = function(){
    console.log(this.property);
}

function SubType(){
    this.subproperty = false;
}

SubType.prototype = new SuperType();

SubType.prototype.getSubValue = function(){
    console.log(this.subproperty);
}

var instance = new SubType();

console.log(instance.getSuperValue());//true