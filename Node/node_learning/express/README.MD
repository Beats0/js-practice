## Node.js开发入门—Express里的路由和中间件

#### 路由

通常HTTP URL的格式是这样的：

> http://host[:port][path]

`http`表示协议。

`host`表示主机。

`port`为端口，可选字段，不提供时默认为80。

path指定请求资源的URI(Uniform Resource Identifier，统一资源定位符)，如果URL中没有给出path，一般会默认成“/”（通常由浏览器或其它HTTP客户端完成补充上）。

所谓路由，就是如何处理HTTP请求中的路径部分。比如“`http://xxx.com/users/profile`”这个URL，路由将决定怎么处理/users/profile这个路径。

#### 中间件

Express里有个中间件`（middleware）`的概念。所谓中间件，就是在收到请求后和发送响应之前这个阶段执行的一些函数。

要在一条路由的处理链上插入中间件，可以使用express对象的use方法。该方法原型如下：

```js
app.use([path,] function [, function...])
```
当app.use没有提供path参数时，路径默认为`“/”`。当你为某个路径安装了中间件，则当以该路径为基础的路径被访问时，都会应用该中间件。比如你为`“/abcd”`设置了中间件，那么`“/abcd/xxx”`被访问时也会应用该中间件。

中间件函数的原型如下：

```js
function (req, res, next)
```

第一个参数是Request对象req。第二个参数是Response对象res。第三个则是用来驱动中间件调用链的函数next，如果你想让后面的中间件继续处理请求，就需要调用next方法。

给某个路径应用中间件函数的典型调用是这样的：
```js
app.use('/abcd', function (req, res, next) {
  console.log(req.baseUrl);
  next();
})
```

#### app.static中间件

Express提供了一个static中间件，可以用来处理网站里的静态文件的GET请求，可以通过`express.static`访问。
```js
express.static(root, [options])
```

第一个参数root，是要处理的静态资源的根目录，可以是绝对路径，也可以是相对路径。第二个可选参数用来指定一些选项，比如maxAge、lastModified等，更多选项的介绍看这里：http://expressjs.com/guide/using-middleware.html#middleware.built-in

```js
var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html'],
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now());
  }
}

app.use(express.static('public', options));
```

使用express创建的HelloExpress项目的app.js文件里有这样一行代码：
```js
app.use(express.static(path.join(__dirname, 'public')));
```
这行代码将HelloExpress目录下的public目录作为静态文件交给static中间件来处理，对应的HTTP URI为`“/”`。path是一个Node.js模块，`__dirname`是Node.js的全局变量，指向当前运行的js脚本所在的目录。path.join()则用来拼接目录。

有了上面的代码，你就可以在浏览器里访问`“http://localhost:3000/stylesheets/style.css”`。我们做一点改动，把上面的代码修改成下面这样：
```js
app.use('/static', express.static(path.join(__dirname, 'public')));
```
上面的代码呢，针对`/static`路径使用static中间件处理public目录。这时再用浏览器访问`“http://localhost:3000/stylesheets/”`就会看到一个404页面，将地址换成`“http://localhost:3000/static/stylesheets/style.css”`就可以了。

#### Router

Express还提供了一个叫做Router的对象，行为很像中间件，你可以把Router直接传递给app.use，像使用中间件那样使用Router。另外你还可以使用router来处理针对GET、POST等的路由，也可以用它来添加中间件，总之你可以将Router看作一个微缩版的app。

码创建一个Router实例：
```js
var router = express.Router([options]);
```
然后就可以像使用app一样使用router
```js
// invoked for any requests passed to this router
router.use(function(req, res, next) {
  // .. some logic here .. like any other middleware
  next();
});

// will handle any request that ends in /events
// depends on where the router is "use()'d"
router.get('/events', function(req, res, next) {
  // ..
});
```

定义了router后，也可以将其作为中间件传递给app.use：
```js
app.use('/events', router);
```
上面这种用法，会针对URL中的“/events”路径应用router，你在router对象上配置的各种路由策略和中间件，都会被在合适的时候应用。


#### 路由模块

express工具创建的应用，有一个routes目录，下面保存了应用到网站的`Router模块`，`index.js`和`user.js`。这两个模块基本一样

index.js
```js
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
```

app.js
```js
var routes = require('./routes/index');
...
app.use('/', routes);
```
第一处，`require(‘./routes/index’)`将其作为模块使用，这行代码导入了index.js，并且将index.js导出的router对象保存在变量routes里以供后续使用。注意，上面代码里的routes就是index.js里的router。

第二处代码，把routes作为一个中间件，挂载到了`“/”`路径上。

#### 模块
`module.exports`用来导出一个Node.js模块内的对象，调用者使用`require`加载模块时，就会获得导出的对象的实例。

module.exports还有一个辅助用法，即直接使用exports来导出。
```exports.signup = function(req, res){
     //some code
   }

   exports.login = function(req, res){
     //some code
   }js
```

使用users模块的代码可能是这样的：
```js
var express = require('express');
var app = express();
...
var users = require('./routes/users');
app.post('/signup', users.signup);
app.post('/login', users.login);
...
```

##### app.js
```js
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
```


更多参考:[阮一峰 JavaScript 标准参考教程（alpha） ](http://javascript.ruanyifeng.com/nodejs/express.html)

##### 渲染

<b>浏览器在完整展示一个页面前做了哪些工作：

① `加载：`

根据请求的URL进行域名解析，向服务器发起请求，接收文件（HTML、JS、CSS、图象等）

② `解析：`

从html解析出DOM tree，解析css产生css规则树（计算css样式），js，通过DOM api和Css api操作DOM tree和CSS ruletree。

③ `渲染：`

解析完成后，浏览器引擎会通过DOM tree和CSS RuleTree来构造`Rendering tree（渲染树）`（不包含Header等不需要显示的东西），也就是将CSS rule加到每一个DOM结点上（或者叫做Frame）。定位坐标和大小，是否换行等。

④ `绘制：`

最后调用操作系统的Native GUI的API绘制。

##### 前后端渲染

 - `前端渲染：`

指的是后端返回json数据，前端利用预先写的html模板，循环读取json数据，拼接字符串，并插入页面。

好处：网络传输数据量小。不占用服务端运算资源（解析模板），模板在前端（很有可能仅部分在前端），改结构变交互都前端自己来了，改完自己调就行。

坏处：前端耗时较多。占用（一部分、少部分）客户端运算资源（解析模板）。前端代码多点，毕竟包含模板代码了么。

 - `后端渲染：`

先前端请求，后端用后台模板引擎直接生成html，前端接受到数据之后，直接插入页面。

好处：前端耗时少，即减少了首屏时间，模板统一在后端。前端（相对）省事，不占用客户端运算资源（解析模板）

坏处：占用服务器资源。

更多参考: http://blog.csdn.net/qizhiqq/article/details/51822794