## JQuery归纳
## Dom：


`Attribute：`

方法 |描述 |
-----|-----|
$("p").addClass                                         |(css中定义的样式类型); 给某个元素添加样式
$("img").attr({src:"test.jpg",alt:"test Image"});       |给某个元素添加属性/值，参数是map
$("img").attr("src","test.jpg");                        |给某个元素添加属性/值
$("img").attr("title", function() { return this.src }); |给某个元素添加属性/值
$("元素名称").html();                                    |获得该元素内的内容（元素，文本等）
$("元素名称").html("`<b>`new stuff`</b>`");                  |给某元素设置内容
$("元素名称").removeAttr("属性名称")                       |给某元素删除指定的属性以及该属性的值
$("元素名称").removeClass("class")                       | 给某元素删除指定的样式
$("元素名称").text();                                    |获得该元素的文本
$("元素名称").text(value);                               |设置该元素的文本值为value
$("元素名称").toggleClass(class)                         |当元素存在参数中的样式的时候取消,如果不存在就设置此样式
$("input元素名称").val();                                |获取input元素的值
$("input元素名称").val(value);                           |设置input元素的值为value


`Manipulation：`

方法 |描述 |
-----|-----|
$("元素名称").after(content);                       |在匹配元素后面添加内容
$("元素名称").append(content);                      |将content作为元素的内容插入到该元素的后面
$("元素名称").appendTo(content);                    |在content后接元素
$("元素名称").before(content);                      |与after方法相反
$("元素名称").clone(布尔表达式)                      |当布尔表达式为真时，克隆元素（无参时，当作true处理）
$("元素名称").empty()                               |将该元素的内容设置为空
$("元素名称").insertAfter(content);                 |将该元素插入到content之后
$("元素名称").insertBefore(content);                |将该元素插入到content之前
$("元素").prepend(content);                       |  将content作为该元素的一部分，放到该元素的最前面
$("元素").prependTo(content);                     |将该元素作为content的一部分，放content的最前面
$("元素").remove();                               |删除所有的指定元素
$("元素").remove("exp");                          | 删除所有含有exp的元素
$("元素").wrap("html");                           |用html来包围该元素
$("元素").wrap(element);                          |用element来包围该元素


`Traversing：`

方法 |描述 |
-----|-----|
add(expr) |
add(html)  |
add(elements)   |
children(expr)  |
contains(str)   |
end()   |
filter(expression)  |
filter(filter)  |
find(expr)  |
is(expr)    |
next(expr)  |
nextAll() | 用于搜索紧跟在每个匹配元素之后的所有同辈元素，根据需要还可以指定一个选择器对同辈元素进行筛选
nextUtil() | 用于获取紧跟在每个匹配元素后面的同辈元素，直至匹配给定选择器的元素(但不包括该元素)
not(el) |
not(expr) |
not(elems) |
parent(expr) |
parents(expr) |
prev(expr) |
prevAll()  |用于搜索当前元素之前的所有同辈元素，也可以指定一个选择器对同辈元素进行筛选
prevUtil()  |用于搜索当前元素之前的所有同辈元素，直到遇到匹配的那个元素为止
siblings(expr) |


`Core：`

方法 |描述 |
-----|-----|
$(html).appendTo("body")                |相当于在body中写了一段html代码
$(elems)                                |获得DOM上的某个元素
$(function(){……..});                    |执行一个函数
$("div > p").css("border", "1px solid gray"); |查找所有div的子节点p，添加样式
$("input:radio", document.forms[0])     |在当前页面的第一个表单中查找所有的单选按钮
$.extend(prop)                          |prop是一个jQuery对象，
each( callback )                        |以每一个匹配的元素作为上下文来执行一个函数


###### 举例：
```
jQuery.extend({
min: function(a, b) { return a < b ? a : b; },
max: function(a, b) { return a > b ? a : b; }
});
jQuery( expression, [context] ) ---$( expression, [context]); 在默认情况下，$()查询的是当前HTML文档中的DOM元素。
```
##### 举例：
```
$("span").click(function){
$("li").each(function(){
$(this).toggleClass("example");
});
});
```
##### 举例：
```
$("button").click(function () {
$("div").each(function (index, domEle) {
// domEle == this
$(domEle).css("backgroundColor", "yellow");
if ($(this).is("#stop")) {
$("span").text("Stopped at div index #" + index);
return false;
}
});
});
```


## jQuery Event:

方法 |描述 |
-----|-----|
ready(fn); $(document).ready()                         |注意在body中没有onload事件，否则该函数不能执行。在每个页面中可以有很多个函数被加载执行，按照fn的顺序来执行。
bind( type, [data], fn )                               |为每一个匹配元素的特定事件（像click）绑定一个或多个事件处理器函数。可能的事件属性有：blur, focus, load, resize, scroll, unload, click, dblclick, mousedown, mouseup, mousemove,mouseover, mouseout, mouseenter, mouseleave, change, select, submit, keydown, keypress,keyup, error
one( type, [data], fn )                                |为每一个匹配元素的特定事件（像click）绑定一个或多个事件处理器函数。在每个对象上，这个事件处理函数只会被执行一次。其他规则与bind()函数相同。
trigger( type, [data] )                                |在每一个匹配的元素上触发某类事件。
triggerHandler( type, [data] )                         |这一特定方法会触发一个元素上特定的事件(指定一个事件类型)，同时取消浏览器对此事件的默认行动
unbind( [type], [data] )                               |反绑定，从每一个匹配的元素中删除绑定的事件。
$("p").unbind()                                        |移除所有段落上的所有绑定的事件
$("p").unbind( "click" )                               |移除所有段落上的click事件

over,out都是方法, 当鼠标移动到一个匹配的元素上面时，会触发指定的第一个函数。当鼠标移出这个元素时，会触发指定的第二个函数。
```
hover( over, out )
$("p").hover(function(){
$(this).addClass("over");
},
function(){
$(this).addClass("out");
}
);
```
如果点击了一个匹配的元素，则触发指定的第一个函数，当再次点击同一元素时，则触发指定的第二个函数。
```
toggle( fn, fn )
$("p").toggle(function(){
$(this).addClass("selected");
},
function(){
$(this).removeClass("selected");
}
);
```


##### 元素事件列表说明
注：不带参数的函数，其参数为可选的 fn。jQuery不支持form元素的reset事件。

事件 |描述 |支持元素或对象|
-----|-----|-----|
blur( )            |元素失去焦点                            |a, input, textarea, button, select, label, map, area
change( )          |用户改变域的内容                    |    input, textarea, select
click( )           |鼠标点击某个对象                    |    几乎所有元素
dblclick( )        |鼠标双击某个对象                    |    几乎所有元素
error( )           |当加载文档或图像时发生某个错误            w|indow, img
focus( )           |元素获得焦点                      |        a, input, textarea, button, select, label, map, area
keydown( )         |某个键盘的键被按下                   |    几乎所有元素
keypress( )        |某个键盘的键被按下或按住                |    几乎所有元素
keyup( )           |某个键盘的键被松开                   |    几乎所有元素
load( fn )         |某个页面或图像被完成加载                |window, img
mousedown( fn )    |某个鼠标按键被按下                   |    几乎所有元素
mousemove( fn )    |鼠标被移动                       |        几乎所有元素
mouseout( fn )     |鼠标从某元素移开                    |    几乎所有元素
mouseover( fn )    |鼠标被移到某元素之上                  |几乎所有元素
mouseup( fn )      |某个鼠标按键被松开                   |几乎所有元素
resize( fn )       |窗口或框架被调整尺寸                  |window, iframe, frame
scroll( fn )       |滚动文档的可视部分时                  |window
select( )          |文本被选定                       |    document, input, textarea
submit( )          |提交按钮被点击                     |    form
unload( fn )       |用户退出页面                      |    window


## JQuery Ajax

方法 |描述 |
-----|-----|
load( url, [data], [callback] )                     |装入一个远程HTML内容到一个DOM结点。
$("#feeds").load("feeds.html");                     |将feeds.html文件载入到id为feeds的div中
```
$("#feeds").load("feeds.php", {limit: 25}, function(){
alert("The last 25 entries in the feed have been loaded");
});
```
<br><br>


方法 |描述 |
-----|-----|
jQuery.get( url, [data], [callback] )               |使用GET请求一个页面。
```
$.get("test.cgi", { name: "John", time: "2pm" }, function(data){
alert("Data Loaded: " + data);
});
```
<br><br>



方法 |描述 |
-----|-----|
jQuery.getJSON( url, [data], [callback] )            |使用GET请求JSON数据。
```
$.getJSON("test.js", { name: "John", time: "2pm" }, function(json){
alert("JSON Data: " + json.users[3].name);
});
```
<br><br>


方法 |描述 |
-----|-----|
jQuery.getScript( url, [callback] )                 |使用GET请求JavaScript文件并执行。
```
$.getScript("test.js", function(){
alert("Script loaded and executed.");
});
jQuery.post( url, [data], [callback], [type] ) 使用POST请求一个页面。
```
<br><br>


方法 |描述 |
-----|-----|
ajaxComplete( callback )                            |当一个AJAX请求结束后，执行一个函数。这是一个Ajax事件
```
$("#msg").ajaxComplete(function(request, settings){
$(this).append("<li>Request Complete.</li>");
});
```
<br><br>


方法 |描述 |
-----|-----|
ajaxError( callback )                               |当一个AJAX请求失败后，执行一个函数。这是一个Ajax事件
```
$("#msg").ajaxError(function(request, settings){
$(this).append("<li>Error requesting page " + settings.url + "</li>");
});
```
<br><br>


方法 |描述 |
-----|-----|
ajaxSend( callback )                                |在一个AJAX请求发送时，执行一个函数。这是一个Ajax事件
```
$("#msg").ajaxSend(function(evt, request, settings){
$(this).append("<li<Starting request at " + settings.url
+ "</li<");
});
```
<br><br>


方法 |描述 |
-----|-----|
ajaxStart( callback )                               |在一个AJAX请求开始但还没有激活时，执行一个函数。这是一个Ajax事件当AJAX请求开始(并还没有激活时)显示loading信息
```
$("#loading").ajaxStart(function(){
$(this).show();
});
```
<br><br>


方法 |描述 |
-----|-----|
ajaxStop( callback )                                |当所有的AJAX都停止时，执行一个函数。这是一个Ajax事件当所有AJAX请求都停止时，隐藏loading信息。
```
$("#loading").ajaxStop(function(){
$(this).hide();
});
```
<br><br>


方法 |描述 |
-----|-----|
ajaxSuccess( callback )                             |当一个AJAX请求成功完成后，执行一个函数。这是一个Ajax事件当AJAX请求成功完成时，显示信息。
```
$("#msg").ajaxSuccess(function(evt, request, settings){
$(this).append("<li>Successful Request!</li>");
});
```
<br><br>

方法 |描述 |
-----|-----|
jQuery.ajaxSetup( options )                         |为所有的AJAX请求进行全局设置。查看$.ajax函数取得所有选项信息。设置默认的全局AJAX请求选项。
```
$.ajaxSetup({
url: "/xmlhttp/",
global: false,
type: "POST"
});
$.ajax({ data: myData });
```
<br><br>

方法 |描述 |
-----|-----|
serialize()                                         |以名称和值的方式连接一组input元素。实现了正确表单元素序列
```
function showValues() {
var str = $("form").serialize();
$("#results").text(str);
}
$(":checkbox, :radio").click(showValues);
$("select").change(showValues);
showValues();
```
<br><br>

方法 |描述 |
-----|-----|
serializeArray()                                   |连接所有的表单和表单元素(类似于.serialize()方法)，但是返回一个JSON数据格式。从form中取得一组值，显示出来
```
function showValues() {
var fields = $(":input").serializeArray();
alert(fields);
$("#results").empty();
jQuery.each(fields, function(i, field){
$("#results").append(field.value + " ");
});
}
$(":checkbox, :radio").click(showValues);
$("select").change(showValues);
showValues();
```
<br><br>

## JQuery Effects 方法说明

方法 |描述 |
-----|-----|
show( )                                 |显示隐藏的匹配元素。
show( speed, [callback] )               |以优雅的动画显示所有匹配的元素，并在显示完成后可选地触发一个回调函数。
hide( )                                 |隐藏所有的匹配元素。
hide( speed, [callback] )               |以优雅的动画隐藏所有匹配的元素，并在显示完成后可选地触发一个回调函数
toggle( )                               |切换元素的可见状态。如果元素是可见的，切换为隐藏的；如果元素是隐藏的，切换为可见的。
slideDown( speed, [callback] )          |通过高度变化（向下增大）来动态地显示所有匹配的元素，在显示完成后可选地触发一个回调函数。这个动画效果只调整元素的高度，可以使匹配的元素以"滑动"的方式显示出来。
slideUp( speed, [callback] )            |通过高度变化（向上减小）来动态地隐藏所有匹配的元素，在隐藏完成后可选地触发一个回调函数。这个动画效果只调整元素的高度，可以使匹配的元素以"滑动"的方式隐藏起来。
slideToggle( speed, [callback] )        |通过高度变化来切换所有匹配元素的可见性，并在切换完成后可选地触发一个回调函数。 这个动画效果只调整元素的高度，可以使匹配的元素以"滑动"的方式隐藏或显示。
fadeIn( speed, [callback] )             |通过不透明度的变化来实现所有匹配元素的淡入效果，并在动画完成后可选地触发一个回调函数。 这个动画只调整元素的不透明度，也就是说所有匹配的元素的高度和宽度不会发生变化。
fadeOut( speed, [callback] )            |通过不透明度的变化来实现所有匹配元素的淡出效果，并在动画完成后可选地触发一个回调函数。 这个动画只调整元素的不透明度，也就是说所有匹配的元素的高度和宽度不会发生变化。
fadeTo( speed, opacity, [callback] )    |把所有匹配元素的不透明度以渐进方式调整到指定的不透明度，并在动画完成后可选地触发一个回调函数。 这个动画只调整元素的不透明度，也就是说所有匹配的元素的高度和宽度不会发生变化。
stop( )                                 |停止所有匹配元素当前正在运行的动画。如果有动画处于队列当中，他们就会立即开始。
queue( )                                |取得第一个匹配元素的动画序列的引用(返回一个内容为函数的数组)
queue( callback )                       |在每一个匹配元素的事件序列的末尾添加一个可执行函数，作为此元素的事件函数
queue( queue )                          |以一个新的动画序列代替所有匹配元素的原动画序列
dequeue( )                              |执行并移除动画序列前端的动画
animate( params, [duration], [easing], [callback] ) |用于创建自定义动画的函数。
animate( params, options )              |创建自定义动画的另一个方法。作用同上。


## JQuery Traversing 方法说明

方法 |描述 |
-----|-----|
eq( index )                |从匹配的元素集合中取得一个指定位置的元素，index从0开始
filter( expr )             |返回与指定表达式匹配的元素集合，可以使用","号分割多个expr，用于实现多个条件筛选
filter( fn )               |利用一个特殊的函数来作为筛选条件移除集合中不匹配的元素。
is( expr )                 |用一个表达式来检查当前选择的元素集合，如果其中至少有一个元素符合这个给定的表达式就返回true。
map( callback )            |将jQuery对象中的一组元素利用callback方法转换其值，然后添加到一个jQuery数组中。
not( expr )                |从匹配的元素集合中删除与指定的表达式匹配的元素。
slice( start, [end] )      |从匹配元素集合中取得一个子集，和内建的数组的slice方法相同。
add( expr )                |把与表达式匹配的元素添加到jQuery对象中。
children( [expr] )         |取得一个包含匹配的元素集合中每一个元素的所有子元素的元素集合。可选的过滤器将使这个方法只匹配符合的元素(只包括元素节点，不包括文本节点)。
contents( )                |取得一个包含匹配的元素集合中每一个元素的所有子孙节点的集合(只包括元素节点，不包括文本节点)，如果元素为iframe，则取得其中的文档元素
find( expr )               |搜索所有与指定表达式匹配的元素。
next( [expr] )             |取得一个包含匹配的元素集合中每一个元素紧邻的后面同辈元素的元素集合。
nextAll( [expr] )          |取得一个包含匹配的元素集合中每一个元素所有的后面同辈元素的元素集合
parent( [expr] )           |取得一个包含着所有匹配元素的唯一父元素的元素集合。
parents( [expr] )          |取得一个包含着所有匹配元素的唯一祖先元素的元素集合（不包含根元素）。
prev( [expr] )             |取得一个包含匹配的元素集合中每一个元素紧邻的前一个同辈元素的元素集合。
prevAll( [expr] )          |取得一个包含匹配的元素集合中每一个元素的之前所有同辈元素的元素集合。
siblings( [expr] )         |取得一个包含匹配的元素集合中每一个元素的所有同辈元素的元素集合。
andSelf( )                 |将前一个匹配的元素集合添加到当前的集合中
$("div").find("p").andSelf().addClass("border");|取得所有div元素和其中的p元素，添加border类属性。
$("div").find("p").addClass("background");  |取得所有div元素中的p元素，添加background类属性
end( )                                      |结束当前的操作，回到当前操作的前一个操作
$("p").find("span").end().css("border", "2px red solid");|找到所有p元素其中的span元素集合，然后返回p元素集合，添加css属性

## JQuery Selectors 方法说明

##### 基本选择器

方法 |描述 |
-----|-----|
$("#myDiv")                         |匹配唯一的具有此id值的元素
$("div")                            |匹配指定名称的所有元素
$(".myClass")                       |匹配具有此class样式值的所有元素
$("*")                              |匹配所有元素
$("div,span,p.myClass")             |联合所有匹配的选择器层叠选择器
$("form input")                     |后代选择器，选择ancestor的所有子孙节点
$("#main > *")                      |子选择器，选择parent的所有子节点
$("label + input")                  |临选择器，选择prev的下一个临节点
$("#prev ~ div")                    |同胞选择器，选择prev的所有同胞节点基本过滤选择器
$("tr:first")                       |匹配第一个选择的元素
$("tr:last")                        |匹配最后一个选择的元素
$("input:not(:checked) + span")     |从原元素集合中过滤掉匹配selector的所有元素（这里有是一个临选择器）
$("tr:even")                        |匹配集合中偶数位置的所有元素(从0开始)
$("tr:odd")                         |匹配集合中奇数位置的所有元素(从0开始)
$("td:eq(2)")                       |匹配集合中指定位置的元素(从0开始)
$("td:gt(4)")                       |匹配集合中指定位置之后的所有元素(从0开始)
$("td:gl(4)")                       |匹配集合中指定位置之前的所有元素(从0开始)
$(":header")                        |匹配所有标题
$("div:animated")                   |匹配所有正在运行动画的所有元素内容过滤选择器
$("div:contains('John')")           |匹配含有指定文本的所有元素
$("td:empty")                       |匹配所有空元素(只含有文本的元素不算空元素)
$("div:has(p)")                     |从原元素集合中再次匹配所有至少含有一个selector的所有元素
$("td:parent")                      |匹配所有不为空的元素(含有文本的元素也算)
$("div:hidden")                     |匹配所有隐藏的元素，也包括表单的隐藏域
$("div:visible")                    |匹配所有可见的元素属性过滤选择器
$("div[id]")                        |匹配所有具有指定属性的元素
$("input[name='newsletter']")       |匹配所有具有指定属性值的元素
$("input[name!='newsletter']")      |匹配所有不具有指定属性值的元素
$("input[name^='news']")            |匹配所有指定属性值以value开头的元素
$("input[name$='letter']")          |匹配所有指定属性值以value结尾的元素
$("input[name*='man']")             |匹配所有指定属性值含有value字符的元素
$("input[id][name$='man']")         |匹配同时符合多个选择器的所有元素子元素过滤选择器
$("ul li:nth-child(2)")             |匹配属于其父元素的第二个子元素的每个li的元素
$("ul li:nth-child(odd)")           |匹配父元素的第奇数元素
$("ul li:nth-child(even)")          |匹配父元素的第偶数元素
$("div span:first-child")           |匹配父元素的第1个子元素
$("div span:last-child")            |匹配父元素的最后1个子元素
$("div button:only-child")          |匹配父元素的唯一1个子元素表单元素选择器
$(":input")                         |匹配所有的表单输入元素，包括所有类型的input, textarea, select 和 button
$(":text")                          |匹配所有类型为text的input元素
$(":password")                      |匹配所有类型为password的input元素
$(":radio")                         |匹配所有类型为radio的input元素
$(":checkbox")                      |匹配所有类型为checkbox的input元素
$(":submit")                        |匹配所有类型为submit的input元素
$(":image")                         |匹配所有类型为image的input元素
$(":reset")                         |匹配所有类型为reset的input元素
$(":button")                        |匹配所有类型为button的input元素
$(":file")                          |匹配所有类型为file的input元素
$(":hidden")                        |匹配所有类型为hidden的input元素或表单的隐藏域表单元素过滤选择器
$(":enabled")                       |匹配所有可操作的表单元素
$(":disabled")                      |匹配所有不可操作的表单元素
$(":checked")                       |匹配所有已点选的元素
$("select option:selected")         |匹配所有已选择的元素

## JQuery CSS 方法说明

方法 |描述 |
-----|-----|
css( name )                         |访问第一个匹配元素的样式属性。
css( properties )                   |把一个"名/值对"对象设置为所有匹配元素的样式属性。
```
$("p").hover(function () {
$(this).css({ backgroundColor:"yellow", fontWeight:"bolder" });
}, function () {
var cssObj = {
backgroundColor: "#ddd",
fontWeight: "",
color: "#0028f4"
}
$(this).css(cssObj);
});
```
<br><br>

方法 |描述 |
-----|-----|
css( name, value )                  |在所有匹配的元素中，设置一个样式属性的值。
offset( )                           |取得匹配的第一个元素相对于当前可视窗口的位置。返回的对象有2个属性，top和left，                           属性值为整数。这个函数只能用于可见元素。
```
var p = $("p:last");
var offset = p.offset();
p.html( "left: " + offset.left + ", top: " + offset.top );
```
<br><br>

方法 |描述 |
-----|-----|
width( )                            |取得当前第一匹配的元素的宽度值，
width( val )                        |为每个匹配的元素设置指定的宽度值。
height( )                           |取得当前第一匹配的元素的高度值，
height( val )                       |为每个匹配的元素设置指定的高度值。

## JQuery Utilities 方法说明
`jQuery.browser`

方法 |描述 |
-----|-----|
.msie                               |表示ie
jQuery.browser.version              |读取用户浏览器的版本信息
jQuery.boxModel                     |检测用户浏览器针对当前页的显示是否基于W3C CSS的盒模型
jQuery.isFunction( obj )            |检测传递的参数是否为function
```
function stub() { }
var objs = [
function () {},
{ x:15, y:20 },
null,
stub,
"function"
];
jQuery.each(objs, function (i) {
var isFunc = jQuery.isFunction(objs[i]);
$("span:eq( " + i + ")").text(isFunc);
});
```
<br><br>

方法 |描述 |
-----|-----|
jQuery.trim( str )                  |清除字符串两端的空格，使用正则表达式来清除给定字符两端的空格
jQuery.each( object, callback )     |一个通用的迭代器，可以用来无缝迭代对象和数组
jQuery.extend( target, object1, [objectN] ) |扩展一个对象，修改原来的对象并返回，这是一个强大的实现继承的工具，这种继承是采用传值的方法来实现的，而不是JavaScript中的原型链方式。合并settings和options对象，返回修改后的settings对象

合并defaults和options对象，defaults对象并没有被修改。options对象中的值代替了defaults对象的值传递给了empty。
```
var settings = { validate: false, limit: 5, name: "foo" };
var options = { validate: true, name: "bar" };
jQuery.extend(settings, options);

var empty = {}
var defaults = { validate: false, limit: 5, name: "foo" };
var options = { validate: true, name: "bar" };
var settings = $.extend(empty, defaults, options);
```
<br><br>

方法 |描述 |
-----|-----|
jQuery.grep( array, callback, [invert] )        |通过一个筛选函数来去除数组中的项
```
$.grep( [0,1,2], function(n,i){
return n > 0;
});
```
<br><br>

方法 |描述 |
-----|-----|
jQuery.makeArray( obj )                         |将一个类似数组的对象转化为一个真正的数组将选取的div元素集合转化为一个数组
```
var arr = jQuery.makeArray(document.getElementsByTagName("div"));
arr.reverse(); // use an Array method on list of dom elements
$(arr).appendTo(document.body);
```
<br><br>

方法 |描述 |
-----|-----|
jQuery.map( array, callback )                   |使用某个方法修改一个数组中的项，然后返回一个新的数组
jQuery.inArray( value, array )                  |返回value在数组中的位置，如果没有找到，则返回-1
jQuery.unique( array )                          |删除数组中的所有重复元素，返回整理后的数组
```
var x = $.ajax({ type: "POST",
    url: "example.php",
    data: "data=helle-world",
    success: function(msg){
        alert(msg);
    }
});
//终止请求x.abort()
window.onerror=function(){//强制不报js错误
return true;
}
```
<br><br>

jQuery1.9删除了一些在1.8中已经过时的api,想要把那些不够安全的、缺乏效率的、用处不大的，以及带有误导的特性统统去掉。如果你想升级你的jquery版本，但又使用了如下被删除的api的话，可以引入Migrate迁移插件，被删除的api可以在Migrate插件中修复。

方法 |描述 |
-----|-----|
.toggle(function, function, … )                 |toggle()方法可实现点击一个元素来执行指定函数。此方法被删除以减少混乱和提高潜在的模块化程度。
jQuery.browser()                                |jQuery.browser()通过UA信息来检测浏览器。此方法在1.3版本中已不赞成使用，并在1.9版本中被删除，jquery团队更建议通过特性检测来时您的代码兼容浏览器。
.live()                                         |live()方法可以为未来生成的元素添加事件，此方法在1.7版本中已不赞成使用，并在1.9版本中被删除，您可以使用on()方法来代替。
```
<div class="testdiv" style="height:100px;width:100px;margin:10px;float:left;background:#f0f;"></div>
$(document).on('click','.testdiv',function(){
    $('body').append($('<div class="testdiv" style="height:100px;width:100px;margin:10px;float:left;background:#f0f;"></div>'));
    alert($(this).index());
});
```
<br><br>

方法 |描述 |
-----|-----|
.die()                                          |die()方法可以移除live()添加的事件，此方法在1.7版本中已不赞成使用，并在1.9版本中被删除，您可以使用off()方法来代替。
.sub()                                          |die()方法可以可创建一个新的jQuery副本，不影响原有的jQuery对像，但用例的数量已经不足以证明它存在的价值。
