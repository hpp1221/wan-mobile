<template>
	<view class="personal-container" v-if="userInfo">
		<view class="status_bar"></view>
		<view class="avatar-detail" @click="handleInPersonalInfo">
			<view class="avatar">
				<image :src="userInfo.head_pic" class="head_pic"></image>
				<view class="membership-level">{{ userInfo.is_member_cn }}</view>
			</view>
			<view class="name-account">
				<view class="name ellipsis-1">{{ userInfo.name }}</view>
				<view class="detail-info">
					<text class="account-word">账号ID:</text>
					<text class="account-id">{{ userInfo.id }}</text>
					<text class="verification">{{ userInfo.is_real ? '已实名验证' : '未实名验证' }}</text>
				</view>
			</view>
		</view>
		<view class="integral-wallet">
			<view class="integral-month">
				<view>99</view>
				<text class="label">本月积分</text>
			</view>
			<view class="wallet-month">
				<view>{{ userInfo.profit_balance }}</view>
				<text class="label">钱包余额</text>
			</view>
		</view>
		<view class="task-group">
			<view
				class="group"
				v-for="(item, index) in taskGroup"
				:key="index"
				@click="handleChangeTaskGroup(item)"
				:class="index === 0 ? 'group-first' : index === taskGroup.length - 1 ? 'group-last' : ''"
				:style="{ backgroundColor: currentTaskGroup.key === item.key ? '#6193E7' : '#FFFFFF', color: currentTaskGroup.key === item.key ? '#FFFFFF' : '#6193E7' }"
			>
				<text class="num">{{ item.value }} 个</text>
				<text>{{ item.text }}</text>
			</view>
		</view>
		<!-- list -->
		<taskListUserComponent :listData="taskData" source="indexPage"></taskListUserComponent>
		<uniLoadMore :status="status" :icon-size="16" :content-text="contentText" />
	</view>
</template>

<script>
import taskListUserComponent from '@/components/task-list-user-component/task-list-user-component.vue';
import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
import { getUserInfoApi, getTaskListApi } from '@/apis/index.js';
import { parseTime } from '@/utils/common.js';
export default {
	components: {
		uniLoadMore,
		taskListUserComponent
	},
	data() {
		return {
			userInfo: null,
			taskGroup: [
				{
					text: '已收藏',
					value: 0,
					key: 'task_like_num'
				},
				{
					text: '进行中',
					value: 0,
					key: 'task_ing_num'
				},
				{
					text: '待审核',
					value: 0,
					key: 'task_fail_num'
				},
				{
					text: '已完成',
					value: 0,
					key: 'task_end_num'
				},
				{
					text: '全部任务',
					value: 0,
					key: 'task_all_num'
				}
			],
			currentTaskGroup: null,
			last_id: '',
			reload: false,
			status: 'more',
			pageInfo: {
				page: 1,
				total: 0
			},
			taskData: [],
			// adpid: '',
			contentText: {
				contentdown: '上拉加载更多',
				contentrefresh: '加载中',
				contentnomore: '没有更多'
			}
		};
	},
	onLoad() {
		// this.adpid = this.$adpid;
		this.getUserInfo();
		this.getTaskList();
		clearInterval(this.timer);
	},
	onPullDownRefresh() {
		setTimeout(function() {
			uni.stopPullDownRefresh();
		}, 1000);
		this.reload = true;
		this.getTaskList();
	},
	onReachBottom() {
		if (!this.reload) {
			this.reload = true;
			this.status = 'more';
			this.pageInfo.page += 1;
			this.getTaskList();
		}
	},
	methods: {
		getUserInfo() {
			let self = this;
			getUserInfoApi().then(res => {
				if (res.code !== 0) return;
				Object.keys(res.data).map(item => {
					self.taskGroup.map(ele => {
						if (item === ele.key) {
							ele.value = res.data[item];
						}
					});
				});
				this.taskGroup = self.taskGroup;
				this.userInfo = res.data;
				this.currentTaskGroup = this.taskGroup.find(v => v.key === 'task_all_num');
			});
		},
		//切换任务种类
		handleChangeTaskGroup(currentItem) {
			this.currentTaskGroup = currentItem;
		},
		//进入个人资料
		handleInPersonalInfo() {
			uni.navigateTo({
				url: '../personal-info/personal-info'
			});
		},
		getTaskList() {
			const params = {
				page: this.pageInfo.page,
				name: '',
				category_id: 0,
				sort_type: 1
			};
			this.reload = true;
			getTaskListApi(params).then(res => {
				let self = this;
				if (res.code !== 0) return (this.reload = false), (this.pageInfo = { page: 1, total: 0 });
				const list = res.data.data;
				const total = res.data.total;
				if (list) {
					list.map(item => {
						let times = parseTime(item.remaining_time);
						item.day = times.day;
						item.hour = times.hour;
						item.min = times.min;
						item.sec = times.sec;
					});
					this.taskData = [...this.taskData, ...list];
					if (this.taskData.length >= total) {
						this.reload = true;
						this.status = 'nomore';
					} else {
						this.reload = false;
						this.status = 'loading';
					}
				} else {
					this.reload = true;
					this.status = 'nomore';
				}
			});
		}
	}
};
</script>

<style lang="less">
@import url('./personal.less');
</style>
