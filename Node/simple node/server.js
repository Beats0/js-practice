const express = require('express');
const expressStatic = require('express-static');
const bodyParser = require('body-parser');
const multer = require('multer');
const multerObj = multer({dest: './static/upload'});
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const consolidate = require('consolidate');
// const expressRoute =require('express-route');
const mysql = require('mysql');


var server = express();

server.use(multerObj.any());
server.use(bodyParser.urlencoded({ extended: false}));

// cookie
server.use(cookieParser());
(function () {
    var keys = [];
    for (var i = 0; i < 100; i++) {
        keys[i] = 'key' + Math.random();
    }
    server.use(cookieSession({
        name: 'sess_id',
        keys: keys,
        maxAge: 20 * 60 * 1000      //20min一次
    }));
}());

// template

server.engine('html', consolidate.ejs);
server.set('views', 'template');
server.set('view engine', 'html');


// router

server.use('/admin/',require('./route/admin')());

server.use('/article/', require('./route/R1')());

server.use('/blog/',require('./route/R2')());


// default static
// server.use(expressStatic('./static/'));

server.listen(8080, function () {
    console.log("Port on 8080")
});