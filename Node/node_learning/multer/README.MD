## Multer 文件上传

Multer 是一个 node.js 中间件，用于处理 `multipart/form-data` 类型的表单数据，它主要用于上传文件。它是写在 busboy 之上非常高效。

<b>注意:`Multer` 不会处理任何非 `multipart/form-data` 类型的表单数据。

##### API
方法 |描述 |
|:--------------------|:-------------------:|
|文件信息（file information)    |上传后的文件具有如下属性
|fieldname:                       |上传文件标签在表单中的name
|originalname：                   |文件在用户电脑上的文件名
|Encoding：                       |该文件的编码
|mimetype：                      |该文件的Mime type
|size：                           |该文件的字节数
|destination：                    |该文件要保存的文件夹
|filename：                       |在保存的文件夹下的文件名
|path：                           |文件上传后保存的完整路径
|buffer：                         |完整文件的buffer
|multer(opts) |multer可以传入一个可选参数，一般该参数为dest属性，规定上传文件存放的位置。如果该参数省略，上传的文件将一直保存在内存中，永远不会写进磁盘。默认情况下，Multer将会重命名上传的文件，以免文件名的冲突。重命名的方法可以根据需要个性化编写。
|multer                           可以传入一个可选参数，一般该参数为dest属性，规定上传文件存放的位置。如果该参数省略，上传的文件将一直保存在内存中，永远不会写进磁盘。

默认情况下，Multer将会重命名上传的文件，以免文件名的冲突。重命名的方法可以根据需要个性化编写。

Multer的可选参数

方法 |描述 |
|:--------------------|:-------------------:|
|dest or storage:               |上传的文件所存放的位置
|fileFilter：                    |过滤什么文件可以上传的方法
|limits：                        |限制上传文件的大小


##### 基本用法

```js
var express = require('express');
var multer = require('multer');
var upload = multer({dest: 'uploads/'});//设置文件上传后的保存路径
var app = express();
app.post('/profile', upload.single('avatar'), function (req, res, next) {

// req.body will hold the text fields, if there were any
})

app.post('/photos/upload', upload.array('photos', 12), function (req, res, next) {

    // req.body will contain the text fields, if there were any
})

var cpUpload = upload.fields([{name: 'avatar', maxCount: 1}, {name: 'gallery', maxCount: 8}])
app.post('/cool-profile', cpUpload, function (req, res, next) {
    // req.files is an object (String -> Array) where fieldname is the key, and the value is array of files
    //
// e.g.
//  req.files['avatar'][0] -> File
//  req.files['gallery'] -> Array
//
// req.body will contain the text fields, if there were any
})
```


https://github.com/expressjs/multer

https://github.com/expressjs/multer/blob/master/doc/README-zh-cn.md

##### fs写入并改名

```js
const fs = require('fs');

fs.rename('a.txt', 'b.txt', function (err){
    console.log(err);
});
```