// 依赖
var fs = require('./fs');

var FILENAME = 'text.txt';

var PATTERN = /\bhi\b/gmi;

// err为触发的事件对象，并非Error对象
fs.readFile(FILENAME, function(err, content){
	// 存储匹配结果
	var result;

	if (err) {
		console.log(err)
	} else {
		while((result = PATTERN.exec(content)) !== null) {
			// 只显示匹配位置
			console.log(result.index);
		}
	}
});