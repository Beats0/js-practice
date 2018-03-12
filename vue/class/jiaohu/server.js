const express = require('express');
const app = express();

app.get('/', function (req, res) {
    res.send('Hello World')
});

app.listen(8081, function () {
    console.log('Server running at http://127.0.0.1:8081/\n')
});