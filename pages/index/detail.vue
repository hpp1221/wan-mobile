<template>
	<view>
		6688
	</view>
</template>

<script>
	export default {
		data() {
			return {
				banner:""
			};
		},
		onLoad(event) {
			// // TODO 后面把参数名替换成 payload
			// const payload = event.detailDate || event.payload;
			// // 目前在某些平台参数会被主动 decode，暂时这样处理。
			// try {
			// 	this.banner = JSON.parse(decodeURIComponent(payload));
			// } catch (error) {
			// 	this.banner = JSON.parse(payload);
			// }
			// uni.setNavigationBarTitle({
			// 	title: "任务详情"
			// });
			this.getDetail();
		},
		methods: {
			getDetail() {
				// uni.request({
				// 	url: 'https://unidemo.dcloud.net.cn/api/news/36kr/' + this.banner.post_id,
				// 	success: (data) => {
				// 		if (data.statusCode == 200) {
				// 			var htmlString = data.data.content.replace(/\\/g, "").replace(/<img/g, "<img style=\"display:none;\"");
				// 			this.htmlNodes = htmlParser(htmlString);
				// 		}
				// 	},
				// 	fail: () => {
				// 		console.log('fail');
				// 	}
				// });
			}
		}
	}
</script>

<style lang="less">

</style>
