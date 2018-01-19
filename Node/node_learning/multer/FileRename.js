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