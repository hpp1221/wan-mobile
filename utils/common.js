function formatTime(time) {
	if (typeof time !== 'number' || time < 0) {
		return time
	}

	var hour = parseInt(time / 3600)
	time = time % 3600
	var minute = parseInt(time / 60)
	time = time % 60
	var second = time

	return ([hour, minute, second]).map(function(n) {
		n = n.toString()
		return n[1] ? n : '0' + n
	}).join(':')
}

function formatDuring(msd) {
	var time = parseFloat(msd) / 1000;
	if (null != time && "" != time) {
		if (time > 60 && time < 60 * 60) {
			var a = parseInt(time / 60.0) < 10 ? ('0' + parseInt(time / 60.0)) : parseInt(time / 60.0);
			var ms = parseInt((parseFloat(time / 60.0) - parseInt(time / 60.0)) * 60);
			var b = (ms < 10) ? ('0' + ms) : ms;
			time = '00:' + a + ':' + b;
		} else if (time >= 60 * 60 && time < 60 * 60 * 24) {
			var H = parseInt(time / 3600.0) < 10 ? ('0' + parseInt(time / 3600.0)) : parseInt(time / 3600.0);
			var ms = parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60);
			var M = (ms < 10) ? ('0' + ms) : ms;
			var ss = parseInt((parseFloat((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) -
				parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60)) * 60);
			var S = (ss < 10) ? ('0' + ss) : ss;
			time = H + ':' + M + ':' + S;
		} else {
			var d = parseInt(time) < 10 ? ('0' + parseInt(time)) : parseInt(time);
			time = '00:00:' + d;
		}
	}
	return time;
}
var dateUtils = {
	UNITS: {
		'年': 31557600000,
		'月': 2629800000,
		'天': 86400000,
		'小时': 3600000,
		'分钟': 60000,
		'秒': 1000
	},
	humanize: function(milliseconds) {
		var humanize = '';
		for (var key in this.UNITS) {
			if (milliseconds >= this.UNITS[key]) {
				humanize = Math.floor(milliseconds / this.UNITS[key]) + key + '前';
				break;
			}
		}
		return humanize || '刚刚';
	},
	format: function(dateStr) {
		var date = this.parse(dateStr)
		var diff = Date.now() - date.getTime();
		if (diff < this.UNITS['天']) {
			return this.humanize(diff);
		}
		var _format = function(number) {
			return (number < 10 ? ('0' + number) : number);
		};
		return date.getFullYear() + '/' + _format(date.getMonth() + 1) + '/' + _format(date.getDate()) + '-' +
			_format(date.getHours()) + ':' + _format(date.getMinutes());
	},
	parse: function(str) { //将"yyyy-mm-dd HH:MM:ss"格式的字符串，转化为一个Date对象
		var a = str.split(/[^0-9]/);
		return new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
	}
};
module.exports = {
	formatTime,
	dateUtils,
	formatDuring
}
