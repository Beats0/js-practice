'use strict';

var fs = require('fs');
var http = require('http');
var url = require('url');
var path = require('path');

var root = path.resolve(process.argv[2] || '.');
console.log("static root dir:" + root);

var server = http.createServer(function (request, response) {
    var pathname = url.parse(request.url).pathname;
    var filepath = path.join(root, pathname);
    var filename1 = path.join(root, pathname, 'index.html');
    var filename2 = path.join(root, pathname, 'default.html');
    fs.stat(filepath, function (err, stats) {
        if (!err && stats.isFile()) {
            console.log("200" + request.url);
            response.writeHead(200);
            fs.createReadStream(filepath).pipe(response);
        } else if (!err && stats.isDirectory()) {
            fs.stat(filename1, function (err, stats) {
                if (!err && stats.isFile()) {
                    console.log("200" + request.url);
                    response.writeHead(200);
                    fs.createReadStream(filename1).pipe(response);
                } else if (err) {
                    fs.stat(filename2, function (err, stats) {
                        if (!err && stats.isFile()) {
                            console.log("200" + request.url);
                            response.writeHead(200);
                            fs.createReadStream(filename2).pipe(response);
                        } else if (err) {
                            console.log('404' + request.url);
                            response.writeHead(404);
                            response.end("404 not found");
                        }
                    });

                }

            });
        } else {
            console.log('404' + request.url);
            response.writeHead(404);
            response.end("404 not found");
        }

    });
});
server.listen(8080);