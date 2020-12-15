<template>
	<view class="personal-container">
		<view class="status_bar"></view>
		<view class="avatar-detail">
			<view class="avatar">
				<view class="membership-level">会员V2</view>
			</view>
			<view class="name-account">
				<view class="name ellipsis-1">用户昵称到此为止十二个字</view>
				<view class="detail-info">
					<text class="account-word">账号ID:</text>
					<text class="account-id">123456789</text>
					<text class="verification">未实名验证</text>
				</view>
			</view>
		</view>
		<view class="integral-wallet"> 
			<view class="integral-month">
				<view>99</view>
				<text class="label">本月积分</text>
			</view>
			<view class="wallet-month">
				<view>99.99</view>
				<text class="label">钱包余额</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	}
};
</script>

<style lang="less">
@import url('./personal.less');
</style>
