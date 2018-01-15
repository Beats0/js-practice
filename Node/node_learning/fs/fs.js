const fs = require('Node/node_learning/fs/fs');

//readFile()
fs.readFile('fs_read.txt', function (err, data) {
    if (err) console.log("读取失败");
    console.log(data.toString());
});

//writeFile()
fs.writeFile("fs_write.txt", "fs_writefs_writefs_writefs_write", function (err) {
    if (err) {
        console.log("写入失败");
    } else {
        console.log("写入文件成功");
    }
});