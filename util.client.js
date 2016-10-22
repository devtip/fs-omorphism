;(function(global, undefined){
	var fs;

	// 前后端同构
	// API一致
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
		var that = this;
		this.xhr.open(that.options.method, file, true );

		this.xhr.onreadystatechange = function(){
			if (this.xhr.readyState === 4) {
				if (this.xhr.status === 200) {
					err = null;
					callback(null, this.xhr.responseText);
				} else {
					err = 'Ajax加载错误';
					callback(err);
				}
			} 
		}.bind(this);

		this.xhr.send(that.options.data);
	};

	// 检测是否为Node平台
	if (typeof process !== "undefined" && typeof process.nextTick === "function") {
		// 或许客户端没有模块加载系统
		// try...catch避免出现ReferenceError
		try {
			module.exports = require('fs');
		} catch(e) {}
	} else {
		fs = new IO();
		// 暴露fs模块给全局对象
		global.fs = fs;
	}
})(this);