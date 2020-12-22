<template>
	<view class="personal-info-container" v-if="personalInfo">
		<view class="head_pic"><image :src="personalInfo.head_pic" class="pic"></image></view>
		<view class="basic-info">
			<uni-list>
				<uni-list-item
					showArrow
					title="昵称"
					color="#6BA1E2"
					extraTextColor="rgba(107, 161, 226, 0.79)"
					arrowColor="#8AB5E8"
					:border="false"
					:rightText="personalInfo.name"
				/>
				<uni-list-item
					showArrow
					title="账号"
					color="#6BA1E2"
					extraTextColor="rgba(107, 161, 226, 0.79)"
					arrowColor="#8AB5E8"
					:border="false"
					:rightText="personalInfo.email"
				/>
				<uni-list-item
					showArrow
					title="实名状态"
					color="#6BA1E2"
					extraTextColor="rgba(107, 161, 226, 0.79)"
					arrowColor="#8AB5E8"
					:border="false"
					:rightText="personalInfo.is_real === 0 ? '未实名' : '已实名'"
				/>
				<uni-list-item
					showArrow
					title="性别"
					color="#6BA1E2"
					extraTextColor="rgba(107, 161, 226, 0.79)"
					arrowColor="#8AB5E8"
					:border="false"
					:rightText="personalInfo.sex_cn"
					:link="true"
					@click="showModal('sexModal')"
				/>
				<uni-list-item
					showArrow
					title="年龄"
					color="#6BA1E2"
					extraTextColor="rgba(107, 161, 226, 0.79)"
					arrowColor="#8AB5E8"
					:border="false"
					:rightText="JSON.stringify(personalInfo.age)"
					:link="true"
					@click="showModal('dateModal')"
				/>
			</uni-list>
		</view>
		<view class="basic-info">
			<uni-list>
				<uni-list-item
					showArrow
					title="家乡"
					color="#6BA1E2"
					extraTextColor="rgba(107, 161, 226, 0.79)"
					arrowColor="#8AB5E8"
					:border="false"
					:rightText="personalInfo.hometown_cn"
				/>
				<uni-list-item
					showArrow
					title="常居地"
					color="#6BA1E2"
					extraTextColor="rgba(107, 161, 226, 0.79)"
					arrowColor="#8AB5E8"
					:border="false"
					:rightText="personalInfo.residence_cn"
				/>
				<uni-list-item
					showArrow
					title="邮箱"
					color="#6BA1E2"
					extraTextColor="rgba(107, 161, 226, 0.79)"
					arrowColor="#8AB5E8"
					:border="false"
					:rightText="personalInfo.email"
				/>
				<uni-list-item showArrow title="收货地址" color="#6BA1E2" extraTextColor="rgba(107, 161, 226, 0.79)" arrowColor="#8AB5E8" :border="false" rightText="???" />
			</uni-list>
		</view>
		<view class="basic-info">
			<uni-list>
				<uni-list-item
					showArrow
					title="会员身份"
					color="#6BA1E2"
					extraTextColor="rgba(107, 161, 226, 0.79)"
					arrowColor="#8AB5E8"
					:border="false"
					:rightText="personalInfo.is_member === 0 ? '否' : '是'"
				/>
				<uni-list-item
					showArrow
					title="行业"
					color="#6BA1E2"
					extraTextColor="rgba(107, 161, 226, 0.79)"
					arrowColor="#8AB5E8"
					:border="false"
					:rightText="personalInfo.job_name"
				/>
			</uni-list>
		</view>
		<!-- sexModal -->
		<view class="cu-modal bottom-modal sex-modal" :class="modalName == 'sexModal' ? 'show' : ''">
			<view class="cu-dialog">
				<view class="modal-title-content">
					<view class="modal-title">选择性别</view>
					<view class="modal-content">
						<view class="single-item" @tap="handleSureSexModal(1)" :style="{ color: personalInfo.sex_cn === '男' ? 'rgba(107, 161, 226, 0.79)' : '' }">男</view>
						<view @tap="handleSureSexModal(2)" :style="{ color: personalInfo.sex_cn === '女' ? 'rgba(107, 161, 226, 0.79)' : '' }">女</view>
					</view>
				</view>
				<view @tap="hideModal" class="modal-cancel">取消</view>
			</view>
		</view>
		<!-- dateModal -->
		<view class="cu-modal bottom-modal date-modal" :class="modalName == 'dateModal' ? 'show' : ''">
			<view class="cu-dialog modal-content">
				<view class="title-action">
					<view @tap="hideModal" class="modal-cancel">取消</view>
					<view @tap="handleSureDateModal">确定</view>
				</view>
				<view class="date-wrap">
					<picker-view  class="date" :indicator-style="indicatorStyle" :value="value" @change="bindChange">
						<picker-view-column>
							<view class="item" v-for="(item, index) in years" :key="index">{{ item }} 年</view>
						</picker-view-column>
						<picker-view-column>
							<view class="item" v-for="(item, index) in months" :key="index">{{ item }} 月</view>
						</picker-view-column>
						<picker-view-column>
							<view class="item" v-for="(item, index) in days" :key="index">{{ item }} 日</view>
						</picker-view-column>
					</picker-view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { getUserInfoApi, updateUserInfoApi } from '@/apis/index.js';
export default {
	data() {
		const date = new Date();
		const years = [];
		const year = date.getFullYear();
		const months = [];
		const month = date.getMonth() + 1;
		const days = [];
		const day = date.getDate();
		for (let i = 1990; i <= date.getFullYear(); i++) {
			years.push(i);
		}
		for (let i = 1; i <= 12; i++) {
			months.push(i);
		}
		for (let i = 1; i <= 31; i++) {
			days.push(i);
		}
		return {
			personalInfo: null,
			modalName: null,
			title: 'picker-view',
			years,
			year,
			months,
			month,
			days,
			day,
			value: [9999, month - 1, day - 1],
			visible: true,
			indicatorStyle: `height: ${Math.round(uni.getSystemInfoSync().screenWidth / (750 / 50))}px;`
		};
	},
	onLoad(event) {
		this.getUserInfo();
	},
	methods: {
		getUserInfo() {
			let self = this;
			getUserInfoApi().then(res => {
				if (res.code !== 0) return;
				this.personalInfo = res.data;
			});
		},
		showModal(modalName) {
			this.modalName = modalName;
		},
		hideModal(e) {
			this.modalName = null;
		},
		handleSureSexModal(sex) {
			updateUserInfoApi({ sex }).then(res => {
				if (res.code !== 0) return;
				this.hideModal();
				this.getUserInfo();
			});
		},
		handleSureDateModal() {
			const birthday = `${this.year}-${this.month}-${this.day}`;
			console.log("birthday",birthday)
			updateUserInfoApi({ birthday }).then(res => {
				if (res.code !== 0) return;
				this.hideModal();
				this.getUserInfo();
			});
		},
		bindChange(e) {
			console.log('eeee',e)
			const val = e.detail.value;
			this.year = this.years[val[0]];
			this.month = this.months[val[1]];
			this.day = this.days[val[2]];
		}
	}
};
</script>

<style lang="less">
@import url('./personal-info.less');
</style>
