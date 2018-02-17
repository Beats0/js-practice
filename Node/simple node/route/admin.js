const express = require('express');
const mysql = require('mysql');
const common = require('../libs/common');

var db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '111111',
    database: 'nodesql'
});

db.query(`SELECT * FROM admin_table`, (err, data) => {
    if (err) {
        console.log(err);
        // res.status(500).send('database error').end();
    }
    else {
        console.log(data)
    }
});

module.exports = function () {
    let router = express.Router();


    router.use((req, res, next) => {
        if (!req.session['admin_id'] && req.url != '/login') {
            res.redirect('/admin/login')
        } else {
            next();
        }
    });


    router.get('/login', (req, res) => {
        res.render('admin/login.ejs', {})
    });


    router.post('/login', (req, res) => {
        console.log(req.body);
        let username = req.body.username;
        let password = common.md5(req.body.password + common.md5_suffix);

        db.query(`SELECT * FROM admin_table WHERE username='${username}'`, (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).send('database error').end();
            }
            else {
                if (data.lenth == 0) {
                    res.status(400).send('No this administrator name').end();
                }
                else {
                    if (data[0].password == password) {
                        console.log(data[0].password);
                        req.session['admin_id'] = data[0].ID;
                        res.redirect('/admin/');
                    }
                    else {
                        res.status(400).send('this password is incorrect').end();
                    }

                }
            }
        });

    });

    router.get('/', (req, res) => {
        res.render('admin/index.ejs', {});
    });

    router.get('/banners', (req, res) => {

        // 操作
        switch (req.query.act) {
            case 'mod':
                break;

            case 'del':
                db.query(`DELETE FROM \`banners_table\` WHERE ID = ${req.query.id}`, (err, data) => {
                    if (err) {
                        console.log(err);
                        res.status(500).send('database err').end();
                    } else {
                        res.redirect('/admin/banners');
                    }
                });
                break;
            default:
                db.query(`SELECT * FROM \`banners_table\``, (err, banners_data) => {
                    if (err) {
                        console.log(err);
                        res.status(500).send('database err').end();
                    } else {
                        res.render('admin/banners.ejs', {banners_data});
                    }
                });
                break;
        }


    });
    router.get('/blog', (req, res) => {
        db.query(`select * from blog_table`, (err, blog_data) => {
            if (err) {
                res.status(500).send('database err').end();
            } else {
                res.render('admin/blog.ejs', {blog_data});
            }
        });
    });
    router.get('/contact', (req, res) => {
        res.render('admin/contact.ejs', {});
    });
    router.get('/custom', (req, res) => {
        res.render('admin/custom.ejs', {});
    });
    router.get('/intro', (req, res) => {
        res.render('admin/intro.ejs', {});
    });
    router.get('/msg', (req, res) => {
        res.render('admin/msg.ejs', {});
    });
    router.get('/news', (req, res) => {
        res.render('admin/news.ejs', {});
    });

    router.post('/banners', (req, res) => {
        var title = req.body.title, description = req.body.description, href = req.body.href;
        if (!title || !description || !href) {
            res.status(400).send('arr error').end();
        }
        else {
            db.query(`insert into banners_table(title,description,href) value ('${title}','${description}','${href}')`, (err, data) => {
                if (err) {
                    console.log(err);
                    res.status(400).send('database err').end();
                } else {
                    res.redirect('/admin/banners');
                }

            })
        }
    });

    return router;
};
