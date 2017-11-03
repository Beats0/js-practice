#### this对象
```
var name = "The Window";
var object = {
    name: "The Object",
    getNameFunc: function () {
        return function () {
            return this.name
        };
    }
};
console.log(object.getNameFunc()());//The Window（在非严格模式下）
```
#### 闭包访问
```
var name = "The Window";
var object = {
    name: "My Object",
    getNameFunc: function () {
        var that=this;
        return function () {
            return that.name;
        };
    }
};
console.log(object.getNameFunc()());//My Object
```

#### 特殊情况
```
var name = "The Window";
var object = {
    name: "My Object",
    getName: function () {
            return this.name
    }
};
console.log(object.getName());                      //My Object
console.log((object.getName)());                    //My Object
console.log((object.getName = object.getName)());   //The window(非严格模式下)

function output(count) {
    (function () {
        for (var i = 0; i < count; i++) {
            alert(i);
        }
    })();
    console.log(i);//错误
}
```
#### 全局引入
```
(function (globalVariable) {

    // 在函数的作用域中下面的变量是私有的
    var privateFunction = function() {
        console.log('Shhhh, this is private!');
    }
    // 通过全局变量设置下列方法的外部访问接口
    // 与此同时这些方法又都在函数内部

    globalVariable.each = function(collection, iterator) {
        if (Array.isArray(collection)) {
            for (var i = 0; i < collection.length; i++) {
                iterator(collection[i], i, collection);
            }
        } else {
            for (var key in collection) {
                iterator(collection[key], key, collection);
            }
        }
    };
    globalVariable.filter = function(collection, test) {
        var filtered = [];
        globalVariable.each(collection, function(item) {
            if (test(item)) {
                filtered.push(item);
            }
        });
        return filtered;
    };
    globalVariable.map = function(collection, iterator) {
        var mapped = [];
        globalUtils.each(collection, function(value, key, collection) {
            mapped.push(iterator(value));
        });
        return mapped;
    };
    globalVariable.reduce = function(collection, iterator, accumulator) {
        var startingValueMissing = accumulator === undefined;
        globalVariable.each(collection, function(item) {
            if(startingValueMissing) {
                accumulator = item;
                startingValueMissing = false;
            } else {
                accumulator = iterator(accumulator, item);
            }
        });
        return accumulator;
    };
}(globalVariable));
```
#### 接口对象
```
var myGradesCalculate = (function () {
    // 在函数的作用域中下面的变量是私有的
    var myGrades = [93, 95, 88, 0, 55, 91];
    // 通过接口在外部访问下列方法
    // 与此同时这些方法又都在函数内部
    return {
        average: function() {
            var total = myGrades.reduce(function(accumulator, item) {
                return accumulator + item;
            }, 0);
            return'Your average grade is ' + total / myGrades.length + '.';
        },
        failing: function() {
            var failingGrades = myGrades.filter(function(item) {
                return item < 70;
            });
            return 'You failed ' + failingGrades.length + ' times.';
        }
    }
})();
myGradesCalculate.failing(); // 'You failed 2 times.'
myGradesCalculate.average(); // 'Your average grade is 70.33333333333333.'
```
