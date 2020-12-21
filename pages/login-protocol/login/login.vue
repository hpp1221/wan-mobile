<template>
	<view class="login-page">
		<view class="status_bar"><!-- 这里是状态栏 --></view>
		<view class="login-title-text">登录</view>
		<view class="input-box">
			<input class="input-tel input-base" type="number" :adjust-position="false" placeholder="请输入手机号" placeholder-class="pla-class" v-model="phoneNumber" />
			<view class="verification-code-box">
				<input class="input-tel input-base" type="number" v-model="code" placeholder="请输入验证码" placeholder-class="pla-class" @input="codeInput" />
				<view class="get-code" :style="{ color: getCodeBtnColor }" @click.stop="getCode()">{{ getCodeText }}</view>
			</view>
			<button class="login-btn" hover-class="btn-hover" type="default" @tap="onLogin">登录</button>
		</view>
		<label class="is-agree-box">
			<!-- <checkbox-group @change="onCheck"> -->
			<checkbox value="isAgree" :checked="isAgree" @click="onCheck" style="transform:scale(0.6) translate3d(8px, -9px, 0)" />
			<!-- </checkbox-group> -->

			<view class="tip-text">
				若未注册，勾选即代表将默认为您注册新用户，并且您已阅读并同意
				<text class="protocol-name" @tap="viewProtocol">《用户注册协议》和《隐私协议》</text>
			</view>
		</label>
	</view>
</template>

<script>
import { getCode, getLogin } from '@/apis/index.js';
export default {
	data() {
		return {
			phoneNumber: '18142034837',
			code: '10086',
			getCodeText: '获取验证码',
			getCodeBtnColor: '#ffffff',
			getCodeisWaiting: false,
			isAgree: true
		};
	},
	methods: {
		onLogin() {
			if (!this.isAgree) {
				uni.showToast({
					title: '请先勾选同意下方协议',
					icon: 'none',
					duration: 2000
				});
			} else {
				uni.hideKeyboard();
				//模板示例部分验证规则
				if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phoneNumber)) {
					uni.showToast({ title: '请填写正确手机号码', icon: 'none' });
					return false;
				}
				//示例验证码，实际使用中应为请求服务器比对验证码是否正确。
				if (this.code != 10086) {
					uni.showToast({ title: '验证码不正确', icon: 'none' });
					return false;
				};
				let push_token = '89';
				uni.getStorage({
					key: 'push_token',
					success: function(res) {
						push_token = res.data
					}
				});
				getLogin({
					phone: this.phoneNumber,
					code: this.code,
					push_token
				}).then(response=>{
					if (response.code !== 0) return;
					uni.setStorage({
						key: 'Token',
						data: response.data.token,
						success: function() {
							uni.switchTab({
								url: '../../find/task-list/task-list'
							});
						}
					});
				}).catch(Error=>{
				})
			}
		},
		getCode() {
			// 请求获取验证码接口
			uni.hideKeyboard();
			if (this.getCodeisWaiting) return;
			if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phoneNumber)) {
				uni.showToast({ title: '请填写正确手机号码', icon: 'none' });
				return false;
			}
			this.getCodeText = '发送中...';
			this.getCodeisWaiting = true;
			this.getCodeBtnColor = 'rgba(255,255,255,0.5)';
			getCode({ tel: this.phoneNumber }).then(res => {
				console.log('res', res);
			});
			//示例用定时器模拟请求效果
			// setTimeout(()=>{
			// 	uni.showToast({title: '验证码已发送',icon:"none"});
			// 	this.setTimer();
			// },1000)
		},
		setTimer() {
			let holdTime = 60;
			this.getCodeText = '重新获取(60)';
			this.Timer = setInterval(() => {
				if (holdTime <= 0) {
					this.getCodeisWaiting = false;
					this.getCodeBtnColor = '#ffffff';
					this.getCodeText = '获取验证码';
					clearInterval(this.Timer);
					return;
				}
				this.getCodeText = '重新获取(' + holdTime + ')';
				holdTime--;
			}, 1000);
		},
		PhoneInput(event) {
			this.phoneNum = event.target.value;
			console.log('phoneNum', this.phoneNum);
		},
		codeInput(event) {
			this.codeNum = event.target.value;
			console.log('codeNum', this.codeNum);
		},
		/**
		 * 查看协议内容
		 */
		viewProtocol() {
			uni.navigateTo({
				url: '/pages/login-protocol/loginProtocol/loginProtocol'
			});
		},
		onCheck(e) {
			this.isAgree = !this.isAgree;
		}
	}
};
</script>

<style lang="less">
.login-page {
	width: 100%;
	height: 100%;
	.login-title-text {
		width: 100%;
		height: 45.833333rpx;
		font-size: 33.333333rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #6193e7;
		// background-image: -webkit-linear-gradient(bottom, rgb(201, 21, 134), rgb(20, 11, 255));
		line-height: 45.833333rpx;
		text-align: center;
		-webkit-background-clip: text;
		// -webkit-text-fill-color: transparent;
		padding-top: 41.666666rpx;
	}
	.input-box {
		padding-top: 256.944444rpx;
		width: 100%;
		// text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		.input-base {
			width: 500rpx;
			height: 44.444444rpx;
			background: rgba(255, 255, 255, 0.5);
			box-shadow: 4.16rpx 4.16rpx 11.11rpx 0 rgba(97, 147, 231, 0.41);
			border-radius: 22.22rpx;
			font-size: 18.055555rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #a0a0a0;
			line-height: 25rpx;
			padding: 0 22.222222rpx;
			box-sizing: border-box;
			-webkit-box-sizing: border-box;
		}
		.pla-class {
			font-size: 18.055555rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #a0a0a0;
			line-height: 25rpx;
		}
		.verification-code-box {
			margin-top: 41.666666rpx;
			position: relative;
			.get-code {
				width: 166.666666rpx;
				height: 44.444444rpx;
				background: #50a0dd;
				border-radius: 22.222222rpx;
				position: absolute;
				right: 0;
				top: 0;
				font-size: 20.833333rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #ffffff;
				line-height: 44.444444rpx;
				text-align: center;
			}
		}
		.login-btn {
			width: 305.555555rpx;
			height: 44.444444rpx;
			background: linear-gradient(151deg, #53dcee 0%, #50a0dd 51%, #5a4ac3 100%);
			border-radius: 22.222222rpx;
			margin-top: 113.888888rpx;
			font-size: 20.833333rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #ffffff;
			line-height: 44.444444rpx;
			text-align: center;
		}
		.btn-hover {
			background: linear-gradient(151deg, #50a0dd 0%, #5a4ac3 100%);
		}
	}
	.is-agree-box {
		position: fixed;
		left: 0;
		bottom: 81.944444rpx;
		width: 100%;
		display: flex;
		justify-content: center;
		.tip-text {
			width: 303px;
			// height: 33px;
			font-size: 13px;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #555555;
			line-height: 18px;
		}
		.protocol-name {
			border-bottom: 1px solid #d8d8d8;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #a0a0a0;
			position: relative;
		}
		.protocol-name:after {
			// content: '';
			// width: 255.555555rpx;
			// height: 1.388888rpx;
			// background-color: #D8D8D8;
			// position: absolute;
			// bottom: 0;
			// left: 8.333333rpx;
		}
	}
}
</style>
