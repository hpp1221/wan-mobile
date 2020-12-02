<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	page,
	view {
	    
	}
	
	page {
	    min-height: 100%;  
		background: #F2F2F2;
	}
	
	template {
	    
	}
	.status_bar{
		height: var(--status-bar-height);
		width: 100%;
	}
	::-webkit-scrollbar{
		display: none;
		width: 0 !important;
		height: 0 !important;
		-webkit-appearance: none;
		background: transparent;
	}
</style>
