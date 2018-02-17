const express = require('express');

module.exports = function () {
    var router = express.Router();

    router.get('/index.html', function (req, res) {
        // res.send('article1').end();
        res.render('./index.ejs',{title:'this is article index.html'})
    });
    router.get('/2.html', function (req, res) {
        res.send('article2').end();
    });

    return router;
};
