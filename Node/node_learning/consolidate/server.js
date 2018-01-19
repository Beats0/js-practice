const express = require('express');
const static = require('express-static');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const multer = require('multer');
const consolidate = require('consolidate');

var server = express();

server.listen(8080);

// post数据
server.use(bodyParser.urlencoded({extended: false}));
server.use(multer({dest: './www/upload'}).any());

// 配置模板引擎
//输出
server.set('view engine', 'html');
//模板文件
server.set('views', './views');
//模板引擎
server.engine('html', consolidate.ejs);

//接收用户请求
server.get('/index', function (req, res) {
    res.render('1.ejs', {name: 'blue'});
});

//static数据
server.use(static('./www'));
