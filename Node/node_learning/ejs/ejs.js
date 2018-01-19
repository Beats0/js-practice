const ejs =require('ejs');

ejs.renderFile('./ejs_view/1.ejs',{type:'admin',name:'Beats0'},function (err,data) {
    if (err)
        console.log('编译失败');
    else {
        console.log(data)
    }
});