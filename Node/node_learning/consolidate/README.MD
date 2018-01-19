##### express 模板引擎


##### consolidate-适配

-------------------------------------------------------------------------------------------------------------------------

模板引擎：适配
```js
consolidate=require

server.set('view engine', 'html');
server.set('views', '模板文件目录');
server.engine('html', consolidate.ejs);

server.get('/', function (req, res){
	res.render('模板文件', 数据);
});
```
-------------------------------------------------------------------------------------------------------------------------

##### router 路由：

把不同的目录，对应到不同的模块,由router处理不同的模块
```js
/user/....		mod_user
/item/....		mod_item

//1.创建router
var router=express.Router();

//2.把router添加到server
server.use('/user', router);

//3.router内部
router.get('/1.html')
router.post('/2.html')
```
-------------------------------------------------------------------------------------------------------------------------
只有当请求 `"/calendar/"`将会被发送到"router"
```js
app.use('/calendar', router);
```

```js
1 app.use(express.static(__dirname + '/public'));
2 app.use(express.static(__dirname + '/files'));
3 app.use(express.static(__dirname + '/uploads'));
```


rooter实例
```js
// const fs=require('fs');
//
// fs.rename('a.txt', 'b.txt', function (err){
//     console.log(err);
// });

var router = express.Router();

router.param('user_id', function (req, res, next, id) {
    //以下是示例用户，可以从数据库....等中获取
    req.user = {
        id: id,
        name: 'TJ'
    };
    next();
});

router.route('/user/:user_id')
    .all(function (req, res, next) {
        //运行在说有http动态请求
        //可以认为它是特定的路由中间件
    })
    .get(function (req, res, next) {
        res.json(req.user);
    })
    .put(function (req, res, next) {
        //仅仅是一个例子，可以是更新用户
        req.user.name = req.params.name;
        //保存用户....等
        res.json(req.user);
    })
    .post(function (req, res, next) {
        next(new Error('not implemented'));
    })
    .delete(function (req, res, next) {
        next(new Error('not implemented'));
    });
```