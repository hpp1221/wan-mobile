<template>
	<view class="container">
		<view class="header-wrap">
			<!-- 标题栏和状态栏占位符 -->
			<view class="status_bar"></view>
			<view class="nav-wrap">
				<view class="scan"></view>
				<view class="uni-input-wrapper">
				    <input class="uni-input search-input" placeholder="请输入" />
				    <view class="uni-search" @click="clearIcon">搜索</view>
				</view>
				<view class="message"></view>
			</view>
			<!-- 轮播图 -->
			<swiper class="carousel" circular autoplay interval="3000">
				<swiper-item v-for="(item, index) in carouselList" :key="index" class="carousel-item" @click="navToDetailPage({ title: '轮播广告' })">
					<image :src="item.src" />
				</swiper-item>
			</swiper>
			<!-- nav -->
			<scroll-view scroll-x class="navs">
				<view class="nav">
					<view class="nav-item" :class="index==TabCur?'nav-select-item':''" v-for="(item,index) in navs" :key="index" @tap="tabSelect" :data-id="index">
						{{item}}
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="tabs-content"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				carouselList: [{
						src: '/static/temp/banner3.jpg'
					},
					{
						src: '/static/temp/banner2.jpg'
					},
					{
						src: '/static/temp/banner4.jpg'
					}
				],
				navs:["全部","游戏","好物","小说","金融","认证"],
				TabCur:0,
				scrollLeft:0
			};
		},
		created() {},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				console.log('this.TabCur',this.TabCur)
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			}
		}
	};
</script>

<style lang="less">
	@import url('./index.less');
</style>
