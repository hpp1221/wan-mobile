<template>
	<view class="personal-container" v-if="userInfo">
		<view class="status_bar"></view>
		<view class="avatar-detail">
			<view class="avatar">
				<image :src="userInfo.head_pic" class="head_pic"></image>
				<view class="membership-level">会员V2</view>
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
			<view class="group" v-for="(item, index) in taskGroup" :key="index" @click="handleChangeTaskGroup(item)" 
			:class="index === 0 ? 'group-first':index === taskGroup.length-1 ? 'group-last' :'' "
			:style="{backgroundColor:currentTaskGroup.key === item.key ? '#6193E7': '#FFFFFF',color: currentTaskGroup.key === item.key ? '#FFFFFF' :'#6193E7'}">
				<text class="num">{{ item.value }} 个</text>
				<text>{{ item.text }}</text>
			</view>
		</view>
	</view>
</template>

<script>
import { getUserInfoApi } from '@/apis/index.js';
export default {
	data() {
		return {
			userInfo: null,
			taskGroup: [
				{
					text: '已收藏',
					value: 0,
					key:'task_like_num'
				},
				{
					text: '进行中',
					value: 0,
					key:'task_ing_num'
				},
				{
					text: '待审核',
					value: 0,
					key:'task_fail_num'
				},
				{
					text: '已完成',
					value: 0,
					key:'task_end_num'
				},
				{
					text: '全部任务',
					value: 0,
					key:'task_all_num'
				}
			],
			currentTaskGroup:null
		};
	},
	onLoad() {
		this.getUserInfo();
	},
	methods: {
		getUserInfo() {
			let self = this;
			getUserInfoApi().then(res => {
				if (res.code !== 0) return;
				
				Object.keys(res.data).map(item=>{
					self.taskGroup.map(ele=>{
						if(item === ele.key){
							ele.value = res.data[item]
						}
					})
				});
				this.taskGroup = self.taskGroup;
				this.userInfo = res.data;
				console.log('rrr',this.taskGroup)
				this.currentTaskGroup = this.taskGroup.find(v=>v.key === "task_all_num");
			});
		},
		handleChangeTaskGroup(currentItem) {
			console.log('fff', currentItem);
			this.currentTaskGroup = currentItem;
		}
	}
};
</script>

<style lang="less">
@import url('./personal.less');
</style>
