<template>
	<view class="task-container" v-if="detailInfo">
		<!-- 轮播图 -->
		<view class="banner">
			<swiper circular="true" autoplay="true">
				<swiper-item v-for="(swiper, index) in detailInfo.info_pic_url" :key="index"><image :src="swiper" @tap="toSwiper(swiper)"></image></swiper-item>
			</swiper>
		</view>
		<view class="remain-time-wrap">
			<text class="word">剩余时间</text>
			<uni-countdown
				color="#ffffff"
				padding="2px 3px"
				margin="0 3px"
				:splitor="false"
				borderRadius="4px"
				backgroundColor="#566ece"
				:day="detailInfo.day"
				:hour="detailInfo.hour"
				:minute="detailInfo.min"
				:second="detailInfo.sec"
			></uni-countdown>
		</view>
		<view class="task-name-integral">
			<text class="task-name ellipsis-1">{{ detailInfo.name }}</text>
			<view class="integral-wrap">
				<text class="integral">{{ detailInfo.commission }}</text>
				<text class="word">积分</text>
			</view>
		</view>
		<view class="subtitle-wrap">
			<text class="content ellipsis-1">{{ detailInfo.company_name }}</text>
		</view>
		<view class="labels-completed">
			<view class="labels-wrap">
				<block v-for="(value, index) in detailInfo.tag" :key="index">
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
			<text class="value ellipsis-1">{{ detailInfo.category_name }}</text>
		</view>
		<view class="task-labels">
			<text class="label">任务描述:</text>
			<text class="value ellipsis-3">{{ detailInfo.short_intr }}</text>
		</view>
		<view class="task-labels operation-step">
			<text class="label">操作步骤:</text>
			<view class="value rich-text">
				<rich-text :nodes="richText"></rich-text>
				</view>
				
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
					<uni-countdown
						:day="detailInfo.day"
						color="#fc8181"
						splitorColor="#fc8181"
						padding="0 3px"
						:hour="detailInfo.hour"
						:minute="detailInfo.min"
						:second="detailInfo.sec"
						class="time"
					></uni-countdown>
					<!-- <text>11 : 11 : 11</text> -->
				</view>
				<view class="accept-task-wrap">
					<view class="icon iconfont collection" :class="detailInfo.task_like === 1 ? 'icon-shoucang1' : 'icon-shoucang'" @click="handleCollect"></view>
					<view class="accept-task">
						<view class="button" @click="handleAcceptTask">{{detailInfo.order_status ===0 ? '接受任务':'现在去做' }}</view>
						<text class="info" :style="{color : detailInfo.order_status ===0 ? '#50a2de':'#A1A1A1'}">{{detailInfo.order_status ===0 ? '赚取100积分':'已接受此任务' }}</text>
					</view>
					<view class="icon iconfont icon-7 share" @click="handleShare"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import taskListComponent from '@/components/task-list-component/task-list-component.vue';
import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
import uniCountDown from '@/components/uni-countdown/uni-countdown.vue';
import { getTaskDetailApi, taskCollectApi, taskOrderApi } from '@/apis/index.js';
import { parseTime, dateUtils } from '@/utils/common.js';
export default {
	components: {
		uniLoadMore,
		taskListComponent,
		uniCountDown
	},
	data() {
		return {
			detailInfo: null,
			taskButtonText:'接受任务',
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
			},
			richText:'' // 富文本
		};
	},
	onLoad(event) {
		const taskDetailId = event.taskDetailId;
		this.getTaskDetaiInfo(taskDetailId);
		// 目前在某些平台参数会被主动 decode，暂时这样处理。
		// try {
		// 	this.banner = JSON.parse(decodeURIComponent(payload));
		// } catch (error) {
		// 	this.banner = JSON.parse(payload);
		// }
		// this.getList();
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
		//详情信息
		getTaskDetaiInfo(taskDetailId) {
			getTaskDetailApi({ id: Number(taskDetailId) }).then(res => {
				if (res.code !== 0) return;
				const times = parseTime(res.data.remaining_time);
				let detailInfo = {
					...res.data,
					day: times.day,
					hour: times.hour,
					min: times.min,
					sec: times.sec
				};
				this.detailInfo = detailInfo;
				this.richText = detailInfo.content.replace(/\<img/gi, '<img class="richImg" style="width:100%;display: inline-block;vertical-align: middle;"');
				console.log('richText', this.richText);
			});
		},
		//收藏
		handleCollect() {
			const { id } = this.detailInfo;
			taskCollectApi({ id }).then(res => {
				if (res.code !== 0) return;
				uni.showToast({
					title:res.data.status === 0 ? "取消收藏": `收藏成功!\r\n可在收藏夹查看此任务`,
					icon:"none",
					duration:2000
				})
				this.getTaskDetaiInfo(id);
			});
		},
		//接受任务
		handleAcceptTask() {
			const { id } = this.detailInfo;
			taskOrderApi({ id }).then(res => {
				if (res.code !== 0) return;
				this.getTaskDetaiInfo(id);
				this.taskButtonText="现在去做";
			});
		},
		//分享
		handleShare(){
			const { id } = this.detailInfo;
		},
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
