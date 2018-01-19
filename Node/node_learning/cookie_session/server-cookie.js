const express = require('express');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
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


// cookie签名
server.use(cookieParser('asdfghjkl'));      //校验
server.use('/', function (req, res) {
    req.secret = 'asdfghjkl';                 //密钥
    res.cookie('user', 'Beats0', {signed: true});

    console.log(req.signedCookies);         //已签名的cookie
    console.log(req.cookies);               //未签名的cookie

    res.clearCookie('user');                //删除cookie

    res.send('ok')
});

// session
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