const express = require('express');

module.exports = function () {
    var router = express.Router();

    router.get('/index.html', function (req, res) {
        res.send('blog index.html').end();
    });
    router.get('/2.html', function (req, res) {
        res.send('blog 2.html').end();
    });

    return router;
};