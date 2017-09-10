// var name = "A";
// function text() {
//     var name = "B";
//     alert("名字是"+this.name);
// }
// text();//A
//
// var obj = {};
// var name2 = "window";
// obj.name = "obj";
// obj.text = function () {
//     alert("对象是"+this.name);
// }
// obj.text();//obj

// var tit = document.getElementById('title');
// var con = document.getElementById('con');
// var spans = tit.getElementsByTagName("span");
// var lis = con.getElementsByTagName("li");
// spans[0].style.backgroundColor = "#999";
// lis[0].style.display = "block";
// spans[1].onclick = function () {
//     spans[1].style.backgroundColor = "#999";
//     spans[0].style.backgroundColor = "#fff";
//     spans[2].style.backgroundColor = "#fff";
//     lis[1].style.display = "block";
//     lis[0].style.display = "none";
//     lis[2].style.display = "none";
// }
// spans[2].onclick = function () {
//     spans[2].style.backgroundColor = "#999";
//     spans[0].style.backgroundColor = "#fff";
//     spans[1].style.backgroundColor = "#fff";
//     lis[2].style.display = "block";
//     lis[0].style.display = "none";
//     lis[1].style.display = "none";
// }
// spans[0].onclick = function () {
//     spans[0].style.backgroundColor = "#999";
//     spans[2].style.backgroundColor = "#fff";
//     spans[1].style.backgroundColor = "#fff";
//     lis[0].style.display = "block";
//     lis[1].style.display = "none";
//     lis[2].style.display = "none";
// }

//for for if结构
var spans = document.getElementById('title').getElementsByTagName('span');
var lis = document.getElementById('con').getElementsByTagName('li');
for (var i = 0;i < spans.length;i++) {
    spans[i].onclick = function () {
        for (var i = 0;i < spans.length;i++){
            if (spans[i] == this) {
                spans[i].className = "select";
                lis[i].className = "show";
            }
            else {
                spans[i].className = "";
                lis[i].className = "";
            }
        }
    }
}

//for this
// var spans = document.getElementById('title').getElementsByTagName('span');
// var lis = document.getElementById('con').getElementsByTagName('li');
// for (var i = 0;i < spans.length;i++) {
//     spans[i].index = i;//==spans[0].index = 0;spans[1].index = 1;spans[2].index = 2;
//     spans[i].onclick = function () {
//         for (var i = 0;i < spans.length;i++) {
//             spans[i].className = "";
//             lis[i].className = "";
//         }
//         spans[this.index].className = "select";//this指向当前spans
//         lis[this.index].className = "show";
//     }
// }