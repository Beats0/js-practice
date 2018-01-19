## Cookie Session
会话（Session）跟踪是Web程序中常用的技术，用来跟踪用户的整个会话。常用的会话跟踪技术是`Cookie`与`Session`。

`Cookie`通过在客户端记录信息确定用户身份，`Session`通过在服务器端记录信息确定用户身份。

详见: http://blog.csdn.net/fangaoxin/article/details/6952954

## cookie

```js
const express = require('express');
const cookieParser = require('cookie-parser');
const server = express();

// 种植cookie
server.use('/', function (req, res) {
    res.cookie('user', 'Beats0', {path: '/', maxAge: 30 * 24 * 3600 * 1000});
    res.send('ok')
});

// 读取cookie
// cookie可向下读取，同级不可
server.use(cookieParser());
server.use('/', function (req, res) {
    console.log(req.cookies);
    res.send('ok')
});
```


## session

```js
const express = require('express');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const server = express();

// 利用session记录访问次数
// session key更换
var cookieSessionArr = [];
for (var i = 0; i < 999; i++) {
    cookieSessionArr.push('sign' + Math.random())
}

server.use(cookieParser());
server.use(cookieSession({
    keys: cookieSessionArr,
    maxAge: 2 * 3600 * 1000
}));
server.use('/', function (req, res) {
    if (req.session['count'] == null) {
        req.session['count'] = 1;
    } else {
        req.session['count']++;
    }
    console.log(req.session['count']);
    res.send('ok')
});

server.listen(8080, function () {
    console.log('listen 8080')
});
```
##### Extending the session expiration
```js
var cookieSession = require('cookie-session')
var express = require('express')

var app = express()

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}))

// Update a value in the cookie so that the set-cookie will be sent.
// Only changes every minute so that it's not sent with every request.
app.use(function (req, res, next) {
  req.session.nowInMinutes = Math.floor(Date.now() / 60e3)
  next()
})

// ... your logic here ...
```

#### 相关中间件

##### cookie-parser
##### cookie-encrypter
##### cookie-session