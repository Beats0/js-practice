`This`指向：

```js
    var name = "Jay";
    var person = {
        name: "KKK",
        pro: {
            name: "Micheal",
            getName: function () {
                console.log(this);      //{name: "Micheal", getName: ƒ}
                return this.name;
            }
        }
    };
    console.log(person.pro.getName());  //Micheal
    var people = person.pro.getName;
    console.log(people());              //Jay this指向undefined，在非严格模式下自动转为全局window对象

    var a = 20;
    function getA() {
        return this.a;
    }
    var foo = {
        a: 10,
        getA: getA
    };
    console.log(foo.getA);              //ƒ getA() { return this.a;}
    console.log(foo.getA());            //10
```
例：
```js
    function foo() {
        console.log(this.a)
    }

    function active() {
        fn();           //真实调用，为独立调用
    }

    var a = 20;
    var obj = {
        a: 10,
        getA: foo
    };
    active(obj.getA);
```