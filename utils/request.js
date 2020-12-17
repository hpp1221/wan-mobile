let BaseUrl;

if (process.env.NODE_ENV === 'development') {
	BaseUrl = 'http://47.96.4.213';
} else {
	BaseUrl = 'http://47.96.4.213';
};

const request = (options) => {
	return new Promise((resolve, reject) => {
		const method = options.method.toUpperCase(); //小写改为大写
		uni.getStorage({
			key: "Token",
			success: function(res) {
				let token = res.data;
				uni.request({
					url: BaseUrl + options.url,
					method: method,
					data: options.data,
					// dataType: 'json',
					header: token ? {
						"Authorization": `Bearer ${token}`,
						// 'X-Requested-With': 'XMLHttpRequest',
						'content-type': 'application/json'
					} : {
						'content-type': 'application/json'
					},
					success: res => {
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
			}
		});
		
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
		return request(options)
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
