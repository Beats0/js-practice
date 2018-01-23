## mysql

数据库: mysql

数据库管理工具: navicat for mysql

相关包: mysql

```js
npm install mysql -save
```
example
```js
var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'me',
  password : 'secret',
  database : 'my_db'
});

connection.connect();

connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});

connection.end();
```

example
```js
const mysql = require('mysql');

var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '111111',
    database: 'nodesql'
});

db.query("select * from `user`;", (err, data) => {
    if (err) {
        console.log("查询失败", err)
    } else {
        console.log("查询成功");
        console.log(JSON.stringify(data));
    }
});

/*
* 查询成功
*  [{"ID":1,"UserName":"Beats0","Password":"111111"},{"ID":2,"UserName":"user2","Password":"222222"},{"ID":3,"UserName":"user3","Password":"333333"}]
*/
```