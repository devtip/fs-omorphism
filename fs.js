var fs;

// 检测是否为Node平台
// Browserify打包系统暴露process给全局对象
function isNodePlatform() {
	return typeof process !== "undefined" && 
	typeof process.nextTick === "function" && 
	typeof window === 'undefined';
}

// 前后端同构::API一致::
// @construtor
var IO = function(options){
	this.options = options || {
		method: 'GET',
		data: null
	};

	// 创建xhr对象
	this.xhr = new XMLHttpRequest();
}

// 读取文件
IO.prototype.readFile = function(file, callback){
	var 
		that = this,
		err
	;

	// try {
		this.xhr.open(that.options.method, file, true );
	// } catch(e){
		// @todo 消除重复代码
		// 提前终止请求错误
	// 	err = 'Ajax加载错误';
	// 	callback(err);
	// 	that.xhr.abort();
	// }

	
	this.xhr.onreadystatechange = function(){
		if (this.readyState === 4) {
			if (this.status === 200) {
				err = null;
				callback.call(this, err, this.responseText);
				that.deleteXHR();
			} else {
				err = 'Ajax加载错误';
				callback.call(null, err);
				// 终止请求
				this.abort();
				that.deleteXHR();
			}
		} 
	};

	this.xhr.send(that.options.data);
};

// 降低内存占用
IO.prototype.deleteXHR = function(){
	delete this.xhr;
}


if (isNodePlatform()) {
	// 或许客户端没有模块加载系统
	// try...catch避免出现ReferenceError
	try {
		fs = require('fs');
	} catch(e) {}
} else {
	fs = new IO();
}

module.exports = fs;
