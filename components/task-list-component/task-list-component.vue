<template>
	<view class="uni-list product-list">
		<block v-for="(value, index) in listData" :key="value.id">
			<view class="uni-list-cell" @click="goDetail(value.id)">
				<view class="uni-media-list">
					<view class="img-wrap"><image class="uni-media-list-logo" :src="value.cover_pic_url"></image></view>

					<view class="uni-media-list-body">
						<view class="task-name ellipsis-1">{{ value.name }}</view>
						<view class="task-title ellipsis-1">{{ value.company_name }}</view>
						<view class="task-content">
							<view class="task-info ellipsis-2">{{ value.short_intr }}</view>
							<view class="task-integral">
								<view class="num">{{ value.commission }} 积分</view>
							</view>
						</view>
						<view class="addi-info">
							<view class="specific-con">
								<text class="num">{{ value.user_end_num }}</text>
								<text class="num-info-person">人已完成</text>
							</view>
							<view class="specific-con">
								<text class="num-info-time">剩余时间</text>
								<uni-countdown :day="value.day"  :hour="value.hour" :minute="value.min" :second="value.sec" class="num"></uni-countdown>
						</view>
						</view>
					</view>
				</view>
			</view>
			<!-- #ifdef APP-PLUS -->
			<!-- <view class="ad-view" v-if="index > 0 && (index + 1) % 10 == 0"><ad :adpid="adpid" @error="aderror"></ad></view> -->
			<!-- #endif -->
		</block>
	</view>
</template>

<script>
import uniCountDown from '@/components/uni-countdown/uni-countdown.vue';
export default {
	components: {
		uniCountDown
	},
	props: ['listData', 'source'],
	data() {
		return {
			// source:'',
		};
	},
	watch: {
		source: function(newVal, oldVal) {
			this.source = newVal;
		}
	},
	methods: {
		goDetail(id) {
			console.log('source', this.source,id);
			let detail = { id: 1 };
			if (this.source === 'indexPage') {
				uni.navigateTo({
					url: '../task-detail/task-detail?taskDetailId=' + id
				});
			}
		}
	}
};
</script>

<style lang="less">
@import url('./task-list-component.less');
</style>
