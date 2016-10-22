# 简介

> 这是一个同构fs模块，可以同时工作在Node或者浏览器环境。Node环境下直接使用fs模块，而浏览器环境主要通过Ajax进行实现。目前主要实现fs.readFile API


模块采用[browserify](http://browserify.org/)进行模块打包。其中，`fs.js`为主模块，你可以适用CMD的方式对其进行使用。我这里，强烈推荐大家使用webpack、browserify这样的打包工具，**直接在浏览器中引用主模块会导致错误**， 因为主模块采用CMD的模式进行编写。

``` js
var fs = require('fs');

// err为触发的事件对象，并非Error对象
fs.readFile(FILENAME, function(err, content){
	// 错误处理
	if (err) {
		console.log(err)
	} else {
		// 读取成功时的处理逻辑
	}
});
```




