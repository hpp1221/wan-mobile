<script>
export default {
	onLaunch: function() {
		console.log('App Launch');
		var pinf = plus.push.getClientInfo();
		uni.setStorage({
			key:"push_token",
			data:pinf.token,
			success:function(){
				
			}
		});
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style>
/*每个页面公共css */
@import './static/uni.css';
@import './static/iconfont/iconfont.css';
</style>
