## Node.js —— Express

官方参考(中文): http://www.expressjs.com.cn/

##### 使用指南
<ul>
<li><a href="http://www.expressjs.com.cn/guide/routing.html">路由</a></li>
<li><a href="http://www.expressjs.com.cn/guide/using-middleware.html">中间件</a></li>
<li><a href="http://www.expressjs.com.cn/guide/using-template-engines.html">模板引擎</a></li>
<li><a href="http://www.expressjs.com.cn/guide/error-handling.html">错误处理</a></li>
<li><a href="http://www.expressjs.com.cn/guide/debugging.html">调试</a></li>
<li><a href="http://www.expressjs.com.cn/guide/behind-proxies.html">为 Express 设置代理</a></li>
<li><a href="http://www.expressjs.com.cn/guide/migrating-4.html">升级到 Express 4</a></li>
<li><a href="http://www.expressjs.com.cn/guide/database-integration.html">数据库集成</a></li>
</ul>


其他参考:[阮一峰 JavaScript 标准参考教程（alpha） ](http://javascript.ruanyifeng.com/nodejs/express.html)

##### 渲染

<b>浏览器在完整展示一个页面前做了哪些工作：

① `加载：`

根据请求的URL进行域名解析，向服务器发起请求，接收文件（HTML、JS、CSS、图象等）

② `解析：`

从html解析出DOM tree，解析css产生css规则树（计算css样式），js，通过DOM api和Css api操作DOM tree和CSS ruletree。

③ `渲染：`

解析完成后，浏览器引擎会通过DOM tree和CSS RuleTree来构造`Rendering tree（渲染树）`（不包含Header等不需要显示的东西），也就是将CSS rule加到每一个DOM结点上（或者叫做Frame）。定位坐标和大小，是否换行等。

④ `绘制：`

最后调用操作系统的Native GUI的API绘制。

##### 前后端渲染

 - `前端渲染：`

指的是后端返回json数据，前端利用预先写的html模板，循环读取json数据，拼接字符串，并插入页面。

好处：网络传输数据量小。不占用服务端运算资源（解析模板），模板在前端（很有可能仅部分在前端），改结构变交互都前端自己来了，改完自己调就行。

坏处：前端耗时较多。占用（一部分、少部分）客户端运算资源（解析模板）。前端代码多点，毕竟包含模板代码了么。

 - `后端渲染：`

先前端请求，后端用后台模板引擎直接生成html，前端接受到数据之后，直接插入页面。

好处：前端耗时少，即减少了首屏时间，模板统一在后端。前端（相对）省事，不占用客户端运算资源（解析模板）

坏处：占用服务器资源。

更多参考: http://blog.csdn.net/qizhiqq/article/details/51822794