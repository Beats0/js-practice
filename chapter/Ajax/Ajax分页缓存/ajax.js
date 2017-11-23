var url = 'http;//route.showapi.com/181-1';             //存储地址
var oCon = document.getElementsByClassName('content');    //渲染部分
var oUI = document.querySelector('.page ul');             //分页部分
var page = 0;
var cache = {};       //缓存池

getData();
pageList();         //分页系统
function pageList() {
    oUI.addEventListener('click', function () {
        if (e.target.tagName.toLowerCase() === 'li') {
            page = e.tagName.innerText;
            if (page in cache) {
                console.log("数据已经渲染" + page);         //如果page能在cache找到，就直接渲染cache部分
            } else {
                //如果找不到，就发送请求
            }
        }
    })
}

function getData() {        //获取数据组摸
    var sendData = {
        showapi_appid: '30603',
        showapi_sing: '9896066afeb4992ae91971d13494090',
        page: page,
        num: 8
    };
    var params = [];
    for (var item in sendData) {
        params.push(item + "=" + sendData[item]);
    }
    var postData = params.join('&');

    var xmlHttp = new XMLHttpRequest();
    // xmlHttp.send(null);//发送
    xmlHttp.onreadystatechange = function () {
        //监听
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            //console.log(JSON.parse(xmlHttp.response));
            var dataPost = JSON.parse(xmlHttp.response).showapi_res_body.newslist;
            render(dataPost);//执行渲染
        }
    };
}

xmlHttp.open('GET', url + '?' + postData, true);

//服务器端渲染
function render(dataList) {
    var str = '';//初始化
    for (var i = 0, len = dataList.length; i < len; i++) {
        str +=
            `
            <a href="${dataList[i].url}" class="items flex_row"> 
                <div class="img">
                    <img src="${dataList[i].picUrl}" alt="">
                </div>
                <div class="bd">
                    <p class="label">${dataList[i].title}</p>
                </div>
                <div class="ft">&GT;</div>
            </a>
            
            `
    }
    oCon.innerHTML = str;                 //渲染到content标签中
}

// var arr=[1,2,3,4,5];
// var item=arr[Symbol.iterator]();
