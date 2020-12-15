<template>
	<view class="task-container">
		<view class="banner"></view>
		<view class="remain-time-wrap">
			<text class="word">剩余时间</text>
			<view class="times">
				<text class="time">11</text>
				<text class="time">11</text>
				<text class="time">11</text>
			</view>
		</view>
		<view class="task-name-integral">
			<text class="task-name ellipsis-1">任务名称的话覅hi hi和恢复</text>
			<view class="integral-wrap">
				<text class="integral">100</text>
				<text class="word">积分</text>
			</view>
		</view>
		<view class="subtitle-wrap"><text class="content ellipsis-1">副标题副标题的宁静而看</text></view>
		<view class="labels-completed">
			<view class="labels-wrap">
				<block v-for="(value, index) in labels" :key="index">
					<view class="single-label">
						<text>{{ value }}</text>
					</view>
				</block>
			</view>
			<view class="completed-wrap">
				<view class="img"></view>
				<view class="completed">
					<text class="person">2000</text>
					人完成
				</view>
			</view>
		</view>
		<view class="task-labels">
			<text class="label">任务类型:</text>
			<text class="value ellipsis-1">任务类型到此为止打黑二十字个</text>
		</view>
		<view class="task-labels">
			<text class="label">任务描述:</text>
			<text class="value ellipsis-3">述任到此为止六十六个字</text>
		</view>
		<view class="task-labels operation-step">
			<text class="label">操作步骤:</text>
			<text class="value ellipsis-3">述任到此为止六十六个字</text>
		</view>
		<view class="recommendation"><text>相似推荐:</text></view>
		<!-- 相似推荐 -->
		<taskListComponent :listData="listData" source="indexPage"></taskListComponent>
		<uniLoadMore :status="status" :icon-size="16" :content-text="contentText" />
		<view class="modal-fix-place"></view>
		<view class="operations-modal">
			<view class="content">
				<view class="modal-remain-time">
					<text>剩余时间</text>
					<text>11 : 11 : 11</text>
				</view>
				<view class="accept-task-wrap">
					<view class="icon iconfont icon-shoucang collection"></view>
					<view class="accept-task">
						<view class="button">接受任务</view>
						<text class="info">赚取100积分</text>
						</view>
					<view class="icon iconfont icon-7 share"></view>
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
import taskListComponent from '@/components/task-list-component/task-list-component.vue';
import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
var dateUtils = require('@/utils/common.js').dateUtils;
export default {
	components: {
		uniLoadMore,
		taskListComponent
	},
	data() {
		return {
			banner: '',
			labels: ['学生专属', '热门推荐', '轻松任务'],
			listData: [],
			last_id: '',
			reload: false,
			status: 'more',
			contentText: {
				contentdown: '上拉加载更多',
				contentrefresh: '加载中',
				contentnomore: '没有更多'
			}
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

		// this.getDetail();
		this.getList();
	},
	onPullDownRefresh() {
		setTimeout(function() {
			uni.stopPullDownRefresh();
		}, 1000);
		this.reload = true;
		this.last_id = '';
		this.getList();
	},
	onReachBottom() {
		this.status = 'more';
		this.getList();
	},

	methods: {
		getList() {
			var data = {
				column: 'id,post_id,title,author_name,cover,published_at' //需要的字段名
			};
			if (this.last_id) {
				//说明已有数据，目前处于上拉加载
				this.status = 'loading';
				data.minId = this.last_id;
				data.time = new Date().getTime() + '';
				data.pageSize = 10;
			}
			uni.request({
				url: 'https://unidemo.dcloud.net.cn/api/news',
				data: data,
				success: data => {
					if (data.statusCode == 200) {
						let list = this.setTime(data.data);
						this.listData = this.reload ? list : this.listData.concat(list);
						this.last_id = list[list.length - 1].id;
						this.reload = false;
					}
				},
				fail: (data, code) => {
					console.log('fail' + JSON.stringify(data));
				}
			});
		},
		setTime: function(items) {
			var newItems = [];
			items.forEach(e => {
				newItems.push({
					author_name: e.author_name,
					cover: e.cover,
					id: e.id,
					post_id: e.post_id,
					published_at: dateUtils.format(e.published_at),
					title: e.title
				});
			});
			return newItems;
		}
	}
};
</script>

<style lang="less">
@import url('./task-detail.less');
</style>
