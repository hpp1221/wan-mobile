<template>
	<view class="login-page">
		<view class="status_bar">
		          <!-- 这里是状态栏 -->
		</view>
		<view class="login-title-text">登录</view>
		<view class="input-box">
			<input
			    class="input-tel input-base"
			    type="number"
			    :value="phoneNum"
				:adjust-position="false"
			    placeholder="请输入手机号"
			    placeholder-class="pla-class"
				maxlength="11"
				@input="PhoneInput" focus="true"/>
			<view class="verification-code-box">
				<input
				    class="input-tel input-base"
				    type="number"
				    :value="codeNum"
				    placeholder="请输入验证码"
				    placeholder-class="pla-class"
					@input="codeInput"/>
				<view class="get-code" @tap.stop="getCode($event)">获取验证码</view>
			</view>
			<button
			    class="login-btn"
				hover-class="btn-hover"
			    type="default"
				@tap="onLogin">登录</button>
		</view>
		<view class="is-agree-box">
			<!-- <checkbox class="check-box" :checked="isAgree" /> -->
			<view class="check-box" v-if="isAgree" @tap="onCheck"></view>
			<view class="check-box is-selected" v-else @tap="onCheck">
				<icon class="icon-checked" type="success_no_circle" size="26"/>
			</view>
			<view class="tip-text">若未注册，勾选即代表将默认为您注册新用户，并且您已阅读并同意
			<text class="protocol-name" @tap="viewProtocol">《用户注册协议》和《隐私协议》</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phoneNum: '',
				codeNum: '',
				isAgree: true
			};
		},
		methods:{
			onLogin(){
				console.log('login');
				uni.switchTab({
					url:'/pages/index/index'
				})
			},
			getCode(e){
				e.preventDefault();
				// 请求获取验证码接口
				
			},
			PhoneInput(event){
				this.phoneNum = event.target.value
				console.log('phoneNum', this.phoneNum);
			},
			codeInput(event){
				this.codeNum = event.target.value
				console.log('codeNum', this.codeNum);
			},
			/**
			 * 查看协议内容
			 */
			viewProtocol(){
				uni.navigateTo({
					url: '/pages/loginProtocol/loginProtocol'
				})
			},
			onCheck(){
				this.isAgree = !this.isAgree;
			},
		}
	}
</script>

<style lang="less">
	.login-page{
		width: 100%;
		height: 100%;
		.login-title-text{
			width: 100%;
			height: 45.833333rpx;
			font-size: 33.333333rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #6193E7;
			// background-image: -webkit-linear-gradient(bottom, rgb(201, 21, 134), rgb(20, 11, 255));
			line-height: 45.833333rpx;
			text-align: center;
			-webkit-background-clip: text;
			// -webkit-text-fill-color: transparent;
			padding-top: 41.666666rpx;
		}
		.input-box{
			padding-top: 256.944444rpx;
			width: 100%;
			// text-align: center;
			display: flex;
			flex-direction: column;
			align-items: center;
			.input-base{
				width: 500rpx;
				height: 44.444444rpx;
				background: rgba(255, 255, 255, 0.5);
				box-shadow: 4.16rpx 4.16rpx 11.11rpx 0 rgba(97, 147, 231, 0.41);
				border-radius: 22.22rpx;
				font-size: 18.055555rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #A0A0A0;
				line-height: 25rpx;
				padding: 0 22.222222rpx;
				box-sizing: border-box;
				-webkit-box-sizing: border-box;
			}
			.pla-class{
				font-size: 18.055555rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #A0A0A0;
				line-height: 25rpx;
			}
			.verification-code-box{
				margin-top: 41.666666rpx;
				position: relative;
				.get-code{
					width: 166.666666rpx;
					height: 44.444444rpx;
					background: #50A0DD;
					border-radius: 22.222222rpx;
					position: absolute;
					right: 0;
					top: 0;
					font-size: 20.833333rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
					line-height: 44.444444rpx;
					text-align: center;
				}
			}
			.login-btn{
				width: 305.555555rpx;
				height: 44.444444rpx;
				background: linear-gradient(151deg, #53DCEE 0%, #50A0DD 51%, #5A4AC3 100%);
				border-radius: 22.222222rpx;
				margin-top: 113.888888rpx;
				font-size: 20.833333rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
				line-height:  44.444444rpx;
				text-align: center;
			}
			.btn-hover{
				background: linear-gradient(151deg, #50A0DD 0%, #5A4AC3 100%);
			}
		}
		.is-agree-box{
			position: fixed;
			left: 0;
			bottom: 81.944444rpx;
			width: 100%;
			display: flex;
			justify-content: center;
			.check-box{
				width: 25rpx;
				height: 25rpx;
				border-radius: 2.777777rpx;
				border: 1.38rpx solid #979797;
			    box-sizing: border-box;
			}
			.is-selected{
				background: #53DCE8;
				border: none;
				.icon-checked{
					font-size: 25rpx !important;
					color: #FFFFFF;
				}
			}
			.tip-text{
				width: 420.833333rpx;
				// height: 33px;
				font-size: 18.055555rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #555555;
				line-height: 25rpx;
			}
			.protocol-name{
				border-bottom:1px solid #D8D8D8 ;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #A0A0A0;
				position: relative;
			}
			.protocol-name:after{
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
