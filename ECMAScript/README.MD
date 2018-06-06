## ES6

* [let const](#let-const)
* [解构赋值](#解构赋值destructuring)
* [字符串拓展](#字符串拓展string)
* [数组拓展](#数组拓展array)
* [对象拓展](#对象拓展object)
* [正则拓展](#正则拓展regexp)
* [字符串模板](#字符串模板template-strings)
* [箭头函数](#箭头函数arrow-function)
* [Symbol](#symbol)
* [Set Map](#set-map)
* [Proxy](#proxy)
* [Class](#class)
* [Promise](#promise)
* [Iterator](#iterator)
* [Generator](#generator)
* [Async Await](#async-await)


### let const

var 版(错误)
```js
  var data = [];
  for (var i = 0; i < 3; i++) {
    data[i] = function () {
      console.log(i);
    };
  }

  data[0]();    // 3
  data[1]();    // 3
  data[2]();    // 3
```

闭包版
```js
var data = [];
for (var i = 0; i < 3; i++) {
    data[i] = (function (i) {
        return function() {
            console.log(i);
        }
    })(i);
}

data[0]();    // 0
data[1]();    // 1
data[2]();    // 2
```

ES6 let for
```js
  let data = [];
  for (let i = 0; i < 3; i++) {
    data[i] = function () {
      console.log(i)
    }
  }
  data[0]();    // 0
  data[1]();    // 1
  data[2]();    // 2
```

ES6 let for in
```js
var funcs = [], object = {a: 1, b: 1, c: 1};
for (let key in object) {
    funcs.push(function(){
        console.log(key)
    });
}

funcs[0]()      // a
funcs[1]()      // b
funcs[2]()      // c
```


1. 不会被提升
```js
if (false) {
    let value = 1;
}
console.log(value); // Uncaught ReferenceError: value is not defined
```

2. 重复声明报错

```js
var value = 1;
let value = 2; // Uncaught SyntaxError: Identifier 'value' has already been declared
```

3. 不绑定全局作用域

当在全局作用域中使用 var 声明的时候，会创建一个新的全局变量作为全局对象的属性。

```js
var value = 1;
console.log(window.value); // 1
```

然而 let 和 const 不会：

```js
let value = 1;
console.log(window.value); // undefined
```
4. 临时死区

let 和 const 声明的变量不会被提升到作用域顶部，如果在声明之前访问这些变量，会导致报错：

```js
console.log(typeof value); // Uncaught ReferenceError: value is not defined
let value = 1; 
```

---------------------------------------------------------------------------------------

### 解构赋值Destructuring

```js
let [a, b, c] = [1, 2, 3];

let [foo, [[bar], baz]] = [1, [[2], 3]];
foo // 1
bar // 2
baz // 3

let [ , , third] = ["foo", "bar", "baz"];
third // "baz"

let [x, , y] = [1, 2, 3];
x // 1
y // 3

let [head, ...tail] = [1, 2, 3, 4];
head // 1
tail // [2, 3, 4]

let [x, y, ...z] = ['a'];
x // "a"
y // undefined
z // []

// 解构赋值允许指定默认值。

let [foo = true] = [];
foo // true

let [x, y = 'b'] = ['a']; // x='a', y='b'
let [x, y = 'b'] = ['a', undefined]; // x='a', y='b'
```
数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。

```js
let { bar, foo } = { foo: "aaa", bar: "bbb" };
foo // "aaa"
bar // "bbb"

let { baz } = { foo: "aaa", bar: "bbb" };
baz // undefined

// 中心思想
let { foo: foo, bar: bar } = { foo: "aaa", bar: "bbb" };
```

对象解构
```js
const node = {
  loc: {
    start: {
      line: 1,
      column: 5
    }
  }
};

let { loc, loc: { start }, loc: { start: { line }} } = node;
line // 1
loc  // Object {start: Object}
start // Object {line: 1, column: 5}
```

指定默认值
```js
var {x = 3} = {};
x // 3

var {x, y = 5} = {x: 1};
x // 1
y // 5

var {x: y = 3} = {};
y // 3

var {x: y = 3} = {x: 5};
y // 5

var { message: msg = 'Something went wrong' } = {};
msg // "Something went wrong"
```

函数返回多个值
```js
// 返回一个数组

function example() {
  return [1, 2, 3];
}
let [a, b, c] = example();

// 返回一个对象

function example() {
  return {
    foo: 1,
    bar: 2
  };
}
let { foo, bar } = example();
```

#### 区别

```js
function m1({x = 0, y = 0} = {}) {
  return [x, y];
}

// 写法二
function m2({x, y} = { x: 0, y: 0 }) {
  return [x, y];
}
```
上面两种写法都对函数的参数设定了默认值，区别是写法一函数参数的默认值是空对象，但是设置了对象解构赋值的默认值；写法二函数参数的默认值是一个有具体属性的对象，但是没有设置对象解构赋值的默认值。

```js
// x 有值，y 无值的情况
m1({x: 3}) // [3, 0]
m2({x: 3}) // [3, undefined]

// x 和 y 都无值的情况
m1({}) // [0, 0];
m2({}) // [undefined, undefined]

m1({z: 3}) // [0, 0]
m2({z: 3}) // [undefined, undefined]
```

eg

```js
var x = 1;
function foo(x, y = function() { x = 2; }) {
  var x = 3;
  y();
  console.log(x);
}

foo() // 3
x // 1
```

---------------------------------------------------------------------------------------

### 字符串拓展string
```ts
includes(searchString: string, position?: number): boolean;
endsWith(searchString: string, endPosition?: number): 
startsWith(searchString: string, position?: number): boolean;
repeat(count: number): string;

padStart(maxLength: number, fillString?: string): string;
padEnd(maxLength: number, fillString?: string): string;
```

### 数组拓展Array

#### `Array.of()` 方法创建一个具有可变数量参数的新数组实例，而不考虑参数的数量或类型。
```js
Array.of(element0[, element1[, ...[, elementN]]])
```

```js
Array(7);          // [ , , , , , , ]
Array(1, 2, 3);    // [1, 2, 3]

// ES
Array.of(7);       // [7] 
Array.of(1, 2, 3); // [1, 2, 3]
```
兼容
```js
if (!Array.of) {
  Array.of = function() {
    return Array.prototype.slice.call(arguments);
  };
}
```

#### `Array.from()` 方法从一个类似数组或可迭代对象中创建一个新的数组实例。

```js
Array.of(element0[, element1[, ...[, elementN]]])
```
eg
```js
Array.from('foo'); 
// ["f", "o", "o"]

let m = new Map([[1, 2], [2, 4], [4, 8]]);
Array.from(m); 
// [[1, 2], [2, 4], [4, 8]]

// 数组去重合并
function combine(){ 
    let arr = [].concat.apply([], arguments);  //没有去重复的新数组 
    return Array.from(new Set(arr));
} 

let m = [1, 2, 2], n = [2,3,3]; 
console.log(combine(m,n));                     // [1, 2, 3]
```
新增拓展 TypeScript
```ts
copyWithin(target: number, start: number, end?: number): this;  // 查找替换，原length不变，超出部分省略

fill(value: T, start?: number, end?: number): this;         // 填充

filter(callbackfn: (value: number, index: number, array: Int8Array) => any, thisArg?: any): Int8Array;      // 过滤，if(true)返回新数组

find(predicate: (value: T, index: number, obj: T[]) => boolean, thisArg?: any): T | undefined;      // 一旦找到一个就返回当前项

findIndex(predicate: (value: T, index: number, obj: T[]) => boolean, thisArg?: any): number;    // 一旦找到一个就返回当前索引

includes(searchElement: T, fromIndex?: number): boolean;       // 是否包括

every(callbackfn: (value: T, index: number, array: T[]) => boolean, thisArg?: any): boolean;        // 必需每一项都是true，返回true
    
some(callbackfn: (value: T, index: number, array: T[]) => boolean, thisArg?: any): boolean;         // 只要有一项为true，返回true

reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T, initialValue: T): T;

reduceRight(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T, initialValue: T): T;

keys(): IterableIterator<number>;

entries(): IterableIterator<[number, T]>;
```
eg

```js
  for (let index of myArr.keys()) {
    // index
  }
  for (let item of myArr) {
    // item
  }
  for (let [index, item] of myArr.entries()) {
    // return: Array
    console.log(index, item)
  }
```

#### 数组扁平化

1. 二维数组
```js
const arr = [[1, 2], 3];
[].concat.apply([], arr);
// [1, 2, 3]

// Es6
[].concat(...arr);
```

#### 多维数组
自 https://github.com/shiyangzhaoa/easy-tips/blob/master/tips/flatten.md

```js
const arr = [[1, 2], 3, [4, 3, [8, 9, [10, [11, [12, [13, [14, [15, [16, [17, [18]]]]]]]]]]]];
const flatten = (arr) => arr.reduce((a, b) => {
  if (Array.isArray(b)) {
    return a.concat(flatten(b));
  }
  return a.concat(b);
}, []);
const new_arr = flatten(arr);
// console.log(new_arr);
// [1, 2, 3, 4, 3, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
```

改进，添加扁平化深度控制，默认为1，参考MDN Flatten 参数

```js
const flatten = (arr, depth = 1)  => arr.reduce((a, b) => {
  if (Array.isArray(b) && depth - 1) {
    return a.concat(flatten(b, depth - 1));
  }
  return a.concat(b);
}, []);
// flatten([1, [2, 3, [4, 5], 6], 7])
// [1, 2, 3, [4, 5], 6, 7]
// flatten([1, [2, 3, [4, 5], 6], 7], 5)
// [1, 2, 3, 4, 5, 6, 7]
```

或者这样(老大版本)
```js
function flatten(arr) {
  return Array.isArray(arr) ? [].concat(...arr.map(flatten)) : arr;
}
```

带有 depth 版本(老大)
```js
function flatten(arr, deep = Infinity) {
  return deep && Array.isArray(arr) ? [].concat(...arr.map(x => flatten(x, deep - 1))) : arr;
}
```

#### 创建Array 100 不许用for + push

自 https://github.com/shiyangzhaoa/easy-tips/blob/master/tips/create_arr.md

误区

```js
new Array(100).map((v, i) => i);
// [empty × 100]
// 跳过undefined
```

正确的姿势

```js
Array.from({length: 100}, (v, i) => i);

new Array(100).fill(undefined).map((v, i) => i);

new Array.apply(null, {length}).map((v, i) => i);

[...new Array(100)].map((v, i) => i);

(function fill(i, arr) {
  return i > 99 ? arr : fill(i + 1, arr.concat(i));
})(0, []);

// 骚操作版本，来自知乎大佬
(function (excited) {
   return function (f) {
      return f(f);
   }(function (f) {
      return excited(function (x) { return (f(f))(x); });
   });
})(function (excited) {
   return function(i) {
       return (i < 0) ? [] : excited(i - 1).concat(i);
   }
})(99);
```
#### destructuringArray([1, [2, 3], 4], '[a, [b], c]') => {a: 1, b: 2, c: 3}

首先就是把 '[a, [b ], c]' 转换成由key组成的数组 ['a', ['b'], 'c'] 的形式

```js
const destructuringArray = function(arr, keyStr) {
  const keyArr = JSON.parse(keyStr.replace(/(\w+)/g, '"$1"'));
  return (function resolveKey(keyA, valueA) {
    return keyA.reduce((accObj, curObj, i) => {
      if (Array.isArray(curObj)) {
        return {...accObj, ...resolveKey(curObj, valueA[i])};
      } else {
        accObj[curObj] = valueA[i];
        return accObj;
      }
    }, {})
  })(keyArr, arr);
};
destructuringArray([1,[2,4],3], '[a,[b],c]');

// {a: 1, b: 2, c: 3}
```
---------------------------------------------------------------------------------------

### 对象拓展Object

```js
// ES
function f(x, y) {
  return {x, y};
}

// 等同于
// js
function f(x, y) {
  return {x: x, y: y};
}

f(1, 2) // Object {x: 1, y: 2}
```
方法写简

```js
const o = {
  method() {
    return "Hello!";
  }
};

// 等同于

const o = {
  method: function() {
    return "Hello!";
  }
};
```

typescript

```ts
assign<T, U, V>(target: T, source1: U, source2: V): T & U & V;    // 将两个对象合并，注意相同key时会被覆盖 

assign(target: object, ...sources: any[]): any;     // 将多个对象合并，注意相同key时会被覆盖  

keys(o: {}): string[];      // 返回数组 keys

values<T>(o: { [s: string]: T } |  ArrayLike<T>): T[];  //返回数组 values
values(o: {}): any[];

entries<T>(o: { [s: string]: T } | ArrayLike<T>): [string, T][];
entries(o: {}): [string, any][];      // 返回多维数组 [[k1,v1],[k2,v2]]
```
eg

```js
  let obj1 = {name: "aaa"};
  let obj2 = {value: "bbb"};
  let obj3 = {}
  // obj3 = {...obj1, ...obj2};
  console.log(Object.assign(obj3, obj1, obj2));   // {name: "aaa", value: "bbb"}
  obj3 // {name: "aaa", value: "bbb"}


    let Person = {
    _name: 'aaa',
    _age: 10,
    get name() {
      console.log(this._name)
      return "get something"
    },
    set age(value) {
      this._age = value
      console.log("set something")
    }
  }
  Person.name;        // 触发get name: aaa get something
  Person.age = 20;    // 触发set age: Person:{_name: "aaa", _age: 20}
```

---------------------------------------------------------------------------------------

### 正则拓展RegExp

| 类型  | 规则 | 说明 | 
| - | :-: | -: | 
| 先行断言        |  /x(?=y)/     |   x只有在y前面才匹配 |
| 先行否定断言    |   /x(?!y)/      |  x只有不在y前面才匹配   |
| 后行断言        |   /(?<=y)x/    |   x只有在y后面才匹配    |
| 后行否定断言    |  /(?<\!y)x/     |   x只有不在y后面才匹配    |

先行断言
```js
/\d+(?=%)/.exec('100% of US presidents have been male')  // ["100"] 匹配百分号之前的数字
/\d+(?!%)/.exec('that’s all 44 of them')                 // ["44"] 匹配不在百分号之前的数字
```

后行断言
```js
/(?<=\$)\d+/.exec('Benjamin Franklin is on the $100 bill')  // ["100"] 匹配美元符号之后的数字
/(?<!\$)\d+/.exec('it’s is worth about €90')                // ["90"] 匹配不在美元符号后面的数字
```


---------------------------------------------------------------------------------------

### 字符串模板TemplateStrings

```js
let arr = [{value: 1}, {value: 2}];
let message = `
	<ul>
		${arr.map((item) => {
			return `
				<li>${item.value}</li>
			`
		}).join('')}
	</ul>
`;
console.log(message);
```

```html
<ul>
    <li>1</li>
    <li>2</li>
</ul>
```

---------------------------------------------------------------------------------------


### 箭头函数Arrow Function

```js
var f = v => v;

// 等同于
var f = function (v) {
  return v;
};
```

rest 参数与箭头函数结合的例子

```js
const numbers = (...nums) => nums;

numbers(1, 2, 3, 4, 5)
// [1,2,3,4,5]

const headAndTail = (head, ...tail) => [head, tail];

headAndTail(1, 2, 3, 4, 5)
// [1,[2,3,4,5]]
```

箭头函数有几个使用注意点。

1. 函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。

2. 不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。

3. 不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。

4. 不可以使用yield命令，因此箭头函数不能用作 Generator 函数。

上面四点中，第一点尤其值得注意。this对象的指向是可变的，但是在箭头函数中，它是固定的。

```js
function foo() {
  setTimeout(() => {
    console.log('id:', this.id);
  }, 100);
}

var id = 21;

foo.call({ id: 42 });
// id: 42
```

eg
```js
function foo() {
  return () => {
    return () => {
      return () => {
        console.log('id:', this.id);
      };
    };
  };
}

var f = foo.call({id: 1});

var t1 = f.call({id: 2})()(); // id: 1
var t2 = f().call({id: 3})(); // id: 1
var t3 = f()().call({id: 4}); // id: 1
```
上面代码之中，只有一个this，就是函数foo的this，所以t1、t2、t3都输出同样的结果。因为所有的内层函数都是箭头函数，都没有自己的this，它们的this其实都是最外层foo函数的this。

---------------------------------------------------------------------------------------


### Symbol

保证每个属性的名字都是独一无二的，这样就从根本上防止属性名的冲突。这就是 ES6 引入Symbol的原因

```js
const sym = Symbol();
console.log(typeof sym);
// symbol

let s1 = Symbol.for('foo');
let s2 = Symbol.for('foo');

s1 === s2 // true


Symbol.for("bar") === Symbol.for("bar")
// true
Symbol("bar") === Symbol("bar")
// false

// Symbol.keyFor方法返回一个已登记的 Symbol 类型值的key。
let s1 = Symbol.for("foo");
Symbol.keyFor(s1) // "foo"

let s2 = Symbol("foo");
Symbol.keyFor(s2) // undefined
```

---------------------------------------------------------------------------------------

### Set Map

ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。

Set 本身是一个构造函数，用来生成 Set 数据结构。

eg
```js
// 例一
const set = new Set([1, 2, 3, 4, 4]);
[...set]
// [1, 2, 3, 4]

// 例二
const items = new Set([1, 2, 3, 4, 5, 5, 5, 5]);
items.size // 5

// 例三
const set = new Set(document.querySelectorAll('div'));
set.size // 56

// 类似于
const set = new Set();
document
 .querySelectorAll('div')
 .forEach(div => set.add(div));
set.size // 56

// 数组去重
unique = arr => [...new Set(arr)]
```

使用 Set 可以很容易地实现并集（Union）、交集（Intersect）和差集（Difference）。

```js
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);

// 并集
let union = new Set([...a, ...b]);
func:union = (arr1, arr2) => new Set([...arr1, ...arr2]);
// Set {1, 2, 3, 4}

// 交集
let intersect = new Set([...a].filter(x => b.has(x)));

// set {2, 3}

// 差集
let difference = new Set([...a].filter(x => !b.has(x)));
// Set {1}

// 原生使用Underscore
// union,intersection,difference,uniq: 并集，交集，差集，取唯一
console.log(_.union([1, 2, 3], [101, 2, 1, 10], [2, 1]));
console.log(_.intersection([1, 2, 3], [101, 2, 1, 10], [2, 1]));
console.log(_.difference([1, 2, 3, 4, 5], [5, 2, 10]));
console.log(_.uniq([1, 2, 1, 3, 1, 2]));
```

#### Map
ES6 提供了 Map 数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。也就是说，Object 结构提供了“字符串—值”的对应，Map 结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现

eg

```js
const map = new Map([
  ['name', '张三'],
  ['title', 'Author']
]);

map.size // 2
map.has('name') // true
map.get('name') // "张三"
map.has('title') // true
map.get('title') // "Author"
```

实例的属性和操作方法
```js
.size               // Map 结构的成员总数
.set(key, value)    // 如果key已经有值，则键值会被更新，否则就新生成该键
.get(key)           // 如果找不到key，返回undefined。
.has(key)
.delete(key)
.clear()            // 清除所有成员，没有返回值。
```

---------------------------------------------------------------------------------------

### Proxy

Proxy 用于修改某些操作的默认行为

Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。Proxy 这个词的原意是代理，用在这里表示由它来“代理”某些操作，可以译为“代理器”。

eg

```js
var proxy = new Proxy(target, handler);

var proxy = new Proxy({}, {
  get: function(target, property) {
    return 35;
  }
});

proxy.time  // 35
proxy.name  // 35
proxy.title // 35
```
一个技巧是将 Proxy 对象，设置到object.proxy属性，从而可以在object对象上调用。

```js
let object = { proxy: new Proxy(target, handler) };

let obj = {name: 'aaa'}
let proxy = new Proxy(obj, {
  get(target, propKey, receiver) {
    return target[propKey];
  },
  set(target, propKey, value, receiver) {
    target[propKey] = value;
    return true;
  }
})
obj.name          // aaa
obj.name = 'bbb'  // bbb
```

call
```js
    obj.name = 'bbb'  // bbb
    function getObj() {
      console.log(this);
      return {name: 'aaa'}
    }
    const proxy = new Proxy(getObj, {
      apply(target, object, args) {
        if (object) {
          object.__proto__.fn = target;
          object.fn();
          delete object.__proto__.fn;
        } else {
          target(...args);
        }
      }
    })
    proxy.call(obj, 1, 2, 3)    // {name: "bbb"}
```
#### proxy的作用

1. 拦截和监视外部对对象的访问

2. 降低函数或类的复杂度

3. 在复杂操作前对操作进行校验或对所需资源进行管理

自 https://www.w3cplus.com/javascript/use-cases-for-es6-proxies.html

#### 追踪对象和数组
对象和数组也加一层 Proxy 来处理，我们把所有的改变都转发到原对象上，在修改或删除之后添加一个函数当做监听器

自 https://github.com/ccforward/cc/issues/63
```js
function track(obj, fn){
  const handler = {
    set(obj, prop, val) {
      const oldVal = obj[prop]
      Reflect.set(obj, prop, val)
      fn(obj, prop, oldVal, val)
    },
    deleteProperty(obj, prop) {
      const oldVal = obj[prop]
      Reflect.deleteProperty(obj, prop)
      fn(obj, prop, oldVal, undefined)
    }
  }

  return new Proxy(obj, handler)
}
```

1. 监听对象的变化

```js
const obj = track({a: 'a1', b: 'b1'}, (obj, prop, oldVal, newVal) => {
  console.log(`obj.${prop} changed from ${oldVal} to ${newVal}`)
})
obj.a = 'a2222'  // obj.a changed from a1 to a2222
obj.a = 'xxxxx'  // obj.a changed from a2222 to xxxxx
delete obj.b     // obj.b changed from undefined to undefined
obj.c = 'c1'     // obj.c changed from undefined to c1
```
2. 监听数组的变化

```js
const arr = track([1, 2, 3, 4, 5], (obj, prop, oldVal, newVal) => {
  let val = isNaN(parseInt(prop)) ? `.${prop}` : `[${prop}]`
  const sum = arr.reduce( (p,n) => p + n)

  console.log(`arr${val} changed from ${oldVal} to ${newVal}`)
  console.log(`sum [${arr}] is ${sum}`)
})

arr[4] = 0 
// arr[4] changed from 5 to 0
// sum [1,2,3,4,0] is 10

delete arr[3]
// arr[3] changed from 4 to undefined
// sum [1,2,3,,0] is 6

arr.length = 2
// arr.length changed from 5 to 2
// sum [1,2] is 3
```

#### 双向绑定的实现

https://juejin.im/post/5acd0c8a6fb9a028da7cdfaf

剖析Vue原理&实现双向绑定MVVM 
https://segmentfault.com/a/1190000006599500

### Class

在类的实例上面调用方法，其实就是调用原型上的方法。

```js
class B {}
let b = new B();

b.constructor === B.prototype.constructor // true
```

Object.assign方法可以很方便地一次向类添加多个方法。

```js
class Point {
  constructor(){
    // ...
  }
}

Object.assign(Point.prototype, {
  toString(){},
  toValue(){}
});
```
静态方法

类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。

```js
 class Parent {
            // 公有
            constructor(name, age) {
                this.name = name;
                this.age = age
            }
            //公有
            getName() {
                console.log(this.name);
            }
            getAge() {
                console.log(this.age)
            }
            // 私有 (不保险)
            _bar(baz) {
                return this.snaf = baz;
            }
            // 私有(call外层的bar方法)
            foo(baz) {
                bar.call(this, baz);
            }
            // 静态
            static returnMsg() {
                return 'some message'
            }
        }
        function bar(baz) {
            return this.snaf = baz;
        }

        class Child extends Parent {
            constructor(name) {
                /*
                * super()为父类的constructor
                * 子类没有this，this继承自父类
                */
                super(name)
                this.age = 10;
            }
            getName() {
                super.getName()
            }
            static returnMsg() {
                super.returnMsg()
            }
        }
        let parent = new Parent('parent', 100);
        parent.getName();
        parent.getAge();
        Parent.returnMsg();
        let child = new Child('child');
        child.getName()
```

class中的this
```js
class Logger {
  constructor() {
    this.printName = (name = 'there') => {
      this.print(`Hello ${name}`);
    };
  }

  // ...
}
```
---------------------------------------------------------------------------------------

### Promise

romise对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）。

eg

promise ajax

```js
const getJSON = function(url) {
  const promise = new Promise(function(resolve, reject){
    const handler = function() {
      if (this.readyState !== 4) {
        return;
      }
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    };
    const client = new XMLHttpRequest();
    client.open("GET", url);
    client.onreadystatechange = handler;
    client.responseType = "json";
    client.setRequestHeader("Accept", "application/json");
    client.send();

  });

  return promise;
};

getJSON("/posts.json").then(function(json) {
  console.log('Contents: ' + json);
}, function(error) {
  console.error('出错了', error);
});
```

promise状态

```js
  let p1 = new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error("something error")), 3000)
  })

  let p2 = new Promise((resolve, reject) => {
    setTimeout(() => resolve(p1), 1000)     // 由于p2返回的是另一个 Promise,导致p2自己的状态无效了，由p1的状态决定p2的状态
  })

  p2
    .then(res => console.log(res))
    .catch(err => console.log(err))   // Error: something error
```

promise 链式调用
```js
getJSON("/post/1.json").then(
  post => getJSON(post.commentURL)
).then(
  comments => console.log("resolved: ", comments),
  err => console.log("rejected: ", err)
);
```
Promise.all()

Promise.all方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。

```js
const p = Promise.all([p1, p2, p3]);
```
（1）只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。

（2）只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。

Generator 函数与 Promise 的结合

```js
function getFoo () {
  return new Promise(function (resolve, reject){
    resolve('foo');
  });
}

const g = function* () {
  try {
    const foo = yield getFoo();
    console.log(foo);
  } catch (e) {
    console.log(e);
  }
};

function run (generator) {
  const it = generator();

  function go(result) {
    if (result.done) return result.value;

    return result.value.then(function (value) {
      return go(it.next(value));
    }, function (error) {
      return go(it.throw(error));
    });
  }

  go(it.next());
}

run(g);
```
Promise.try()

实际开发中，经常遇到一种情况：不知道或者不想区分，函数f是同步函数还是异步操作，但是想用 Promise 来处理它。因为这样就可以不管f是否包含异步操作，都用then方法指定下一步流程，用catch方法处理f抛出的错误。一般就会采用下面的写法。

1. 使用async

```js
const f = () => console.log('now');
(async () => f())();
console.log('next');
// now
// next
```
2. 使用new Promise

```js
const f = () => console.log('now');
(
  () => new Promise(
    resolve => resolve(f())
  )
)();
console.log('next');
// now
// next
```
---------------------------------------------------------------------------------------


### Iterator

每一次调用next方法，都会返回数据结构的当前成员的信息。具体来说，就是返回一个包含value和done两个属性的对象。其中，value属性是当前成员的值，done属性是一个布尔值，表示遍历是否结束。

eg

```js
var it = makeIterator(['a', 'b']);

it.next() // { value: "a", done: false }
it.next() // { value: "b", done: false }
it.next() // { value: undefined, done: true }

function makeIterator(array) {
  var nextIndex = 0;
  return {
    next: function() {
      return nextIndex < array.length ?
        {value: array[nextIndex++]} :
        {done: true};
    }
  };
}
```
---------------------------------------------------------------------------------------


### Generator

形式上，Generator 函数是一个普通函数，但是有两个特征。一是，function关键字与函数名之间有一个星号；二是，函数体内部使用yield表达式，定义不同的内部状态（yield在英语里的意思就是“产出”）。

eg

```js
function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}

var hw = helloWorldGenerator();

hw.next()   // { value: 'hello', done: false }
hw.next()   // { value: 'world', done: false }
hw.next()   // { value: 'ending', done: true }
hw.next()   // { value: undefined, done: true }
```

eg: 不使用闭包生成一个自增的ID yield的实现

```js
'use strict';
  function* next_id() {
    for (let i = 1; ; i++) {
      yield i;
    }
  }

  let
    x,
    pass = true,
    g = next_id();
  for (x = 1; x < 100; x++) {
    if (g.next().value !== x) {
      pass = false;
      console.log('测试失败!');
      break;
    }
  }
  if (pass) {
    console.log('测试通过!');
  }
```

eg: 利用 Generator 函数和`for...of`循环，实现斐波那契数列的例子

```js
function* fibonacci() {
  let [prev, curr] = [0, 1];
  for (;;) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

for (let n of fibonacci()) {
  if (n > 1000) break;
  console.log(n);
}
```

#### yield* 表达式
eg 在 Generator 函数内部，调用另一个 Generator 函数

```js
function* bar() {
  yield 'x';
  yield* foo();
  yield 'y';
}

// 等同于
function* bar() {
  yield 'x';
  yield 'a';
  yield 'b';
  yield 'y';
}

// 等同于
function* bar() {
  yield 'x';
  for (let v of foo()) {
    yield v;
  }
  yield 'y';
}

for (let v of bar()){
  console.log(v);
}
// "x"
// "a"
// "b"
// "y"
```

eg `yield*` 命令可以很方便地取出嵌套数组的所有成员

```js
function* iterTree(tree) {
  if (Array.isArray(tree)) {
    for(let i=0; i < tree.length; i++) {
      yield* iterTree(tree[i]);
    }
  } else {
    yield tree;
  }
}

const tree = [ 'a', ['b', 'c'], ['d', 'e'] ];

for(let x of iterTree(tree)) {
  console.log(x);
}
// a
// b
// c
// d
// e
```

eg 使用yield*语句遍历完全二叉树

```js
// 下面是二叉树的构造函数，
// 三个参数分别是左树、当前节点和右树
function Tree(left, label, right) {
  this.left = left;
  this.label = label;
  this.right = right;
}

// 下面是中序（inorder）遍历函数。
// 由于返回的是一个遍历器，所以要用generator函数。
// 函数体内采用递归算法，所以左树和右树要用yield*遍历
function* inorder(t) {
  if (t) {
    yield* inorder(t.left);
    yield t.label;
    yield* inorder(t.right);
  }
}

// 下面生成二叉树
function make(array) {
  // 判断是否为叶节点
  if (array.length == 1) return new Tree(null, array[0], null);
  return new Tree(make(array[0]), array[1], make(array[2]));
}
let tree = make([[['a'], 'b', ['c']], 'd', [['e'], 'f', ['g']]]);

// 遍历二叉树
var result = [];
for (let node of inorder(tree)) {
  result.push(node);
}

result
// ['a', 'b', 'c', 'd', 'e', 'f', 'g']
```
Thunk 函数
```js
// ES5
var Thunk = function(fn){
  return function (){
    var args = Array.prototype.slice.call(arguments);
    return function (callback){
      args.push(callback);
      return fn.apply(this, args);
    }
  };
};

// ES6
const Thunk = function(fn) {
  return function (...args) {
    return function (callback) {
      return fn.call(this, ...args, callback);
    }
  };
};

function f(a, cb) {
  cb(a);
}
const ft = Thunk(f);

ft(1)(console.log) // 1
```
co 模块generator自执行

https://github.com/tj/co

---------------------------------------------------------------------------------------

### Async Await

1、什么是 Async/Await？

```js
Async - 定义异步函数(async function someName(){...})
```
 - 自动把函数转换为 Promise
 - 当调用异步函数时，函数返回值会被 resolve 处理
 - 异步函数内部可以使用 await

```js
Await - 暂停异步函数的执行 (var result = await someAsyncCall();)
```
 - 当使用在 Promise 前面时，await 等待 Promise 完成，并返回 Promise 的结果
 - await 只能和 Promise 一起使用，不能和 callback 一起使用
 - await 只能用在 async 函数中

2、Async/Await 是否会取代 Promise

不会。

- Async/Await 底层依然使用了 Promise。
- 多个异步函数同时执行时，需要借助 Promise.all
```js
async function getABC() {
  let A = await getValueA(); // getValueA 花费 2 秒
  let B = await getValueB(); // getValueA 花费 4 秒
  let C = await getValueC(); // getValueA 花费 3 秒

  return A*B*C;
}
```

每次遇到 await 关键字时，Promise 都会停下在，一直到运行结束，所以总共花费是 2+4+3 = 9 秒。await 把异步变成了同步。
```js
async function getABC() {
  // Promise.all() 允许同时执行所有的异步函数
  let results = await Promise.all([ getValueA, getValueB, getValueC ]); 

  return results.reduce((total,value) => total * value);
}
// 函数总耗时为 4 秒（getValueB 的耗时）。
```

eg 依次读取两个文件

```js
const fs = require('fs');

const readFile = function (fileName) {
  return new Promise(function (resolve, reject) {
    fs.readFile(fileName, function(error, data) {
      if (error) return reject(error);
      resolve(data);
    });
  });
};

// yield
const gen = function* () {
  const f1 = yield readFile('/etc/fstab');
  const f2 = yield readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};

// async
const asyncReadFile = async function () {
  const f1 = await readFile('/etc/fstab');
  const f2 = await readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};
```
eg 指定时间输出

```js
async function timeout(ms) {
  await new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function asyncPrint(value, ms) {
  await timeout(ms);
  console.log(value);
}

asyncPrint('hello world', 3000);
```

多种形式构造

```js
// 函数声明
async function foo() {}

// 函数表达式
const foo = async function () {};

// 对象的方法
let obj = { async foo() {} };
obj.foo().then(...)

// Class 的方法
class Storage {
  constructor() {
    this.cachePromise = caches.open('avatars');
  }

  async getAvatar(name) {
    const cache = await this.cachePromise;
    return cache.match(`/avatars/${name}.jpg`);
  }
}

const storage = new Storage();
storage.getAvatar('jake').then(…);

// 箭头函数
const foo = async () => {};
```

---------------------------------------------------------------------------------------

### Module 

1. export
```js
// 值类
// 写法一
export var m = 1;

// 写法二
var m = 1;
export {m};

// 写法三
var n = 1;
export {n as m};

// 函数类
// 报错
function f() {}
export f;

// 正确
export function f() {};

// 正确
function f() {}
export {f};
```

2. import

```js
// 直接使用
import {firstName, lastName, year} from './profile.js';
function setName(element) {
  element.textContent = firstName + ' ' + lastName;
}

// 改名使用
import { lastName as surname } from './profile.js';
```

3. default
```js
export default function () {
  console.log('foo');
}

import customName from './export-default';
customName(); // 'foo'
```
4. 按需加载
```js
// Promise
Promise.all([
  import('./module1.js'),
  import('./module2.js'),
  import('./module3.js'),
])
.then(([module1, module2, module3]) => {
   ···
});

// async
async function main() {
  const myModule = await import('./myModule.js');
  const {export1, export2} = await import('./myModule.js');
  const [module1, module2, module3] =
    await Promise.all([
      import('./module1.js'),
      import('./module2.js'),
      import('./module3.js'),
    ]);
}
main();
```
