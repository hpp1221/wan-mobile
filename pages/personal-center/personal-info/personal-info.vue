<template>
	<view class="personal-info-container">
		<view class="head_pic">
			<image :src="personalInfo.head_pic" class="pic"></image>
		</view>
		<view class="basic-info">
			<uni-list>
				<uni-list-item showArrow title="昵称" color="#6BA1E2" extraTextColor="rgba(107, 161, 226, 0.79)" arrowColor="#8AB5E8" :border="false" :rightText="personalInfo.name"/>
				<uni-list-item showArrow title="账号" color="#6BA1E2" extraTextColor="rgba(107, 161, 226, 0.79)" arrowColor="#8AB5E8" :border="false" :rightText="personalInfo.email" />
				<uni-list-item showArrow title="实名状态" color="#6BA1E2" extraTextColor="rgba(107, 161, 226, 0.79)" arrowColor="#8AB5E8" :border="false" :rightText="personalInfo.is_real === 0 ? '未实名':'已实名'" />
				<uni-list-item showArrow title="性别" color="#6BA1E2" extraTextColor="rgba(107, 161, 226, 0.79)" arrowColor="#8AB5E8" :border="false" :rightText="personalInfo.sex_cn" />
				<uni-list-item showArrow title="年龄" color="#6BA1E2" extraTextColor="rgba(107, 161, 226, 0.79)" arrowColor="#8AB5E8" :border="false" :rightText="personalInfo.age" />
			</uni-list>
		</view>
		<view class="basic-info">
			<uni-list>
				<uni-list-item showArrow title="家乡" color="#6BA1E2"  extraTextColor="rgba(107, 161, 226, 0.79)" arrowColor="#8AB5E8" :border="false" :rightText="personalInfo.hometown_cn"/>
				<uni-list-item showArrow title="常居地" color="#6BA1E2" extraTextColor="rgba(107, 161, 226, 0.79)" arrowColor="#8AB5E8" :border="false" :rightText="personalInfo.residence_cn" />
				<uni-list-item showArrow title="邮箱" color="#6BA1E2" extraTextColor="rgba(107, 161, 226, 0.79)" arrowColor="#8AB5E8" :border="false" :rightText="personalInfo.email" />
				<uni-list-item showArrow title="收货地址" color="#6BA1E2" extraTextColor="rgba(107, 161, 226, 0.79)" arrowColor="#8AB5E8" :border="false" rightText="???" />
			</uni-list>
		</view>
		<view class="basic-info">
			<uni-list>
				<uni-list-item showArrow title="会员身份" color="#6BA1E2"  extraTextColor="rgba(107, 161, 226, 0.79)" arrowColor="#8AB5E8" :border="false" :rightText="personalInfo.is_member === 0 ?'否' :'是'"/>
				<uni-list-item showArrow title="行业" color="#6BA1E2" extraTextColor="rgba(107, 161, 226, 0.79)" arrowColor="#8AB5E8" :border="false" :rightText="personalInfo.job_name" />
			</uni-list>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			personalInfo:null
		};
	},
	onLoad(event) {
		const payload = event.personalInfo || event.payload;
		// 目前在某些平台参数会被主动 decode，暂时这样处理。
		try {
			this.personalInfo= JSON.parse(decodeURIComponent(payload));
		} catch (error) {
			this.personalInfo = JSON.parse(payload);
		};
		console.log("info",this.personalInfo)
	},

	methods: {
	}
};
</script>

<style lang="less">
@import url('./personal-info.less');
</style>
