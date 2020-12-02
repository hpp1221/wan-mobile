let BaseUrl = '';
if (process.env.NODE_ENV === 'development') {
	BaseUrl = 'http://192.168.8.52:8080/';
} else {
	BaseUrl = 'http://192.168.8.52:8080/';
};

const request = (options) => {
	return new Promise((resolve, reject) => {
		const Token = uni.getStorageSync('Token') || 'c38938ac8450419ea58f40fca0152a88';
		const method = options.method.toUpperCase(); //小写改为大写
		uni.showLoading({
			title: "加载中"
		})
		uni.request({
			url: BaseUrl + options.url,
			method: method,
			data: options.data,
			dataType: 'json',
			header: {
				"x-token": Token,
				'X-Requested-With': 'XMLHttpRequest',
				'content-type': method == 'POST' ? 'application/x-www-form-urlencoded' : 'application/json',
			},
			success: res => {
				console.log("gjhgj", res)
				if (res.statusCode === 200) {
					resolve(res.data)
				} else {
					// showError(err);
					reject(res);
				}
				// 登录失效这边后台是返回403看情况
				// if (res.statusCode === 403) {
				// 	//返回登录界面
				// 	uni.navigateTo({
				// 		url: '/pages/login/login'
				// 	})
				// 	uni.showToast({
				// 		icon: 'none',
				// 		title: '登录已失效'
				// 	});
				// 	//清空token
				// 	// service.addToken('')
				// }
			},
			fail: (err) => {
				// 页面中弹框显示失败
				uni.showToast({
					title: '请求接口失败'
				});
				// showError(err)
				// 返回错误消息
				reject(err)
			},
			complete: () => {
				uni.hideLoading();
			}
		})
	})
}
export default {
	get(url, data = {}, options = {}) {
		options.url = url;
		options.data = data;
		options.method = 'get';
		return request(options)
	},
	post(url, data = {}, options = {}) {
		options.url = url;
		options.data = data;
		options.method = 'post';
		return trequest(options)
	},
	put(url, data = {}, options = {}) {
		options.url = url
		options.data = data
		options.method = 'put'
		return request(options)
	},
	delete(url, data = {}, options = {}) {
		options.url = url
		options.data = data
		options.method = 'delete'
		return request(options)
	}
}
