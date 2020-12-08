<template>
	<view class="container">
		<view class="header-wrap">
			<!-- 标题栏和状态栏占位符 -->
			<view class="titleNview-placing"></view>
			<view class="nav-wrap">
				
			</view>
			<!-- 轮播图 -->
			<!-- <swiper class="carousel" circular autoplay interval="3000">
				<swiper-item v-for="(item, index) in carouselList" :key="index" class="carousel-item" @click="navToDetailPage({ title: '轮播广告' })">
					<image :src="item.src" />
				</swiper-item>
			</swiper> -->
		</view>
		<view class="tabs-content"></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			carouselList: [
				{
					src: '/static/temp/banner3.jpg'
				},
				{
					src: '/static/temp/banner2.jpg'
				},
				{
					src: '/static/temp/banner4.jpg'
				}
			]
		};
	},
	created() {},
	methods: {
	}
};
</script>

<style lang="less">
@import url('./index.less');
</style>
