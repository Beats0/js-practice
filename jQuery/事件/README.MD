### jQuery 事件方法

方法 | 描述 |
-----|-----|
ready()        |文档就绪事件（当 HTML 文档就绪可用时）
blur()         |触发、或将函数绑定到指定元素的 blur 事件
change()       |触发、或将函数绑定到指定元素的 change 事件
click()        |触发、或将函数绑定到指定元素的 click 事件
dblclick()     |触发、或将函数绑定到指定元素的 double click 事件
error()        |触发、或将函数绑定到指定元素的 error 事件
focus()        |触发、或将函数绑定到指定元素的 focus 事件
keydown()      |触发、或将函数绑定到指定元素的 key down 事件
keypress()     |触发、或将函数绑定到指定元素的 key press 事件
keyup()        |触发、或将函数绑定到指定元素的 key up 事件
load()         |触发、或将函数绑定到指定元素的 load 事件
mousedown()    |触发、或将函数绑定到指定元素的 mouse down 事件
mouseenter()   |触发、或将函数绑定到指定元素的 mouse enter 事件
mouseleave()   |触发、或将函数绑定到指定元素的 mouse leave 事件
mousemove()    |触发、或将函数绑定到指定元素的 mouse move 事件
mouseout()     |触发、或将函数绑定到指定元素的 mouse out 事件
mouseover()    |触发、或将函数绑定到指定元素的 mouse over 事件
mouseup()      |触发、或将函数绑定到指定元素的 mouse up 事件
resize()       |触发、或将函数绑定到指定元素的 resize 事件
scroll()       |触发、或将函数绑定到指定元素的 scroll 事件
select()       |触发、或将函数绑定到指定元素的 select 事件
submit()       |触发、或将函数绑定到指定元素的 submit 事件
unload()       |触发、或将函数绑定到指定元素的 unload 事件

### jQuery 事件处理方法

方法 |触发 |
-----|-----|
$(selector).bind(event)                |向匹配元素添加一个或更多事件处理器
$(selector).delegate(selector, event)  |向匹配元素添加一个事件处理器，现在或将来
$(selector).die()                      |移除所有通过 live()     函数添加的事件处理器
$(selector).live(event)                |向匹配元素添加一个事件处理器，现在或将来
$(selector).one(event)                 |向匹配元素添加一个事件处理器。该处理器只能触发一次。
$(selector).unbind(event)              |从匹配元素移除一个被添加的事件处理器
$(selector).undelegate(event)          |从匹配元素移除一个被添加的事件处理器，现在或将来
$(selector).trigger(event)             |所有匹配元素的指定事件
$(selector).triggerHandler(event)      |第一个被匹配元素的指定事件
