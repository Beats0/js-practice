const express = require('express');
const expressStatic = require('express-static');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const multer = require('multer');
const ejs = require('ejs');
const mysql = require('mysql');
const consolidate = require('consolidate');

// 添加时间解析模块
const common = require('./libs/common');

const server = express();

var db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '111111',
    database: 'blog'
});


server.engine('html', consolidate.ejs);

server.get('/', (req, res, next) => {
    //查询banners
    db.query("select * from `banner_table`;", (err, data) => {
        if (err) {
            res.status(500).send('database error').end();
        } else {
            console.log("data");
            // res.render('index.ejs', {banners: data});
            res.banners = data;
            next();
        }
    });
});

server.get('/', (req, res, next) => {
    //查询articles
    db.query("select * from `article_table`;", (err, data) => {
        if (err) {
            res.status(500).send('database error').end();
        } else {
            // res.render('index.ejs', {banners: data});
            res.articles = data;
            next();
        }
    });
});

server.get('/article', (req, res) => {

    if (req.query.id) {
        //     if (req.query.act=="like") {
        //         db.query(`UPDATE article_table SET n_like=n_like+1  WHERE ID=${req.query.id}`, (err, data) => {
        //             if (err) {
        //                 res.send("点赞失败咯");
        //             } else {
        //
        //             }
        //         }
        //     }

        db.query(`SELECT * FROM article_table WHERE ID=${req.query.id}`, (err, data) => {
            if (err) {
                res.status(500).send("数据错误").end();
            } else {
                if (data.length == 0) {
                    res.status(404).send("文章找不到了").end();
                } else {
                    var articleData = data[0];
                    // var articleDate = new Date();
                    // articleDate.setTime(articleData.post_time*1000);

                    articleData.sDate = common.time2date(articleData.post_time);
                    articleData.content = articleData.content.replace(/^/gm, '<p>').replace(/$/gm, '</p>');

                    res.render('article.ejs', {
                        article_data: articleData
                    });
                }
            }
        });
    } else {
        res.status(404).send("文章找不到了").end();
    }

    // res.render('article.ejs', {articles: res.articles});
});

server.get('/', (req, res) => {
    res.render('index.ejs', {banners: res.banners, articles: res.articles})
});

server.get('/', (req, res) => {

});

server.use(expressStatic('./www'));

server.listen(8080, function () {
    console.log("listen 8080")
});
