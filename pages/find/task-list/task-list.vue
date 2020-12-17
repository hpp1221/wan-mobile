<template>
	<view class="container">
		<!-- 标题栏和状态栏占位符 -->
		<!-- <view class="status_bar"></view> -->
		<uni-nav-bar :fixed="true" class="nav-wrap" background-color="#f2f2f2" :statusBar="true">
			<block slot="left">
				<view class="scan"><text class="icon iconfont icon-saoyisao"></text></view>
			</block>
			<view class="uni-input-wrapper">
				<input class="uni-input search-input" type="text" />
				<view class="uni-search">搜索</view>
			</view>
			<block slot="right">
				<view class="message"><text class="icon iconfont icon-xiaoxi"></text></view>
			</block>
		</uni-nav-bar>
		<view class="main-content">
			<!-- 轮播图 -->
			<view class="swiper-box">
				<swiper circular="true" autoplay="true">
					<swiper-item v-for="swiper in swiperList" :key="swiper.id"><image :src="swiper.img" @tap="toSwiper(swiper)"></image></swiper-item>
				</swiper>
			</view>
			<!-- nav -->
			<scroll-view scroll-x class="navs">
				<view class="items">
					<view class="nav-item" :class="item.id == tabSelected ? 'nav-select-item' : ''" v-for="(item, index) in navs" :key="item.id" @tap="tabSelect" :data-id="item.id">
						{{ item.name }}
					</view>
				</view>
			</scroll-view>
			<!-- condition 排序 -->
			<view class="condition-sort">
				<view class="items">
					<view class="condition-item" v-for="(item, index) in conditions" :key="index" @tap="conditionSelect" :data-id="index">
						<view class="text">{{ item.text }}</view>
						<text class="icon iconfont icon-xingzhuang-sanjiaoxing" :class="item.sortUp ? 'select-arrow' : 'arrow'"></text>
					</view>
				</view>
			</view>
			<!-- list -->
			<taskListComponent :listData="taskData" source="indexPage"></taskListComponent>
			<uniLoadMore :status="status" :icon-size="16" :content-text="contentText" />
		</view>
	</view>
</template>

<script>
import taskListComponent from '@/components/task-list-component/task-list-component.vue';
import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import {formatDuring,dateUtils} from '@/utils/common.js';
import {getCategoryListApi,getTaskListApi} from '@/apis/index.js';
export default {
	components: {
		uniLoadMore,
		taskListComponent
	},
	data() {
		return {
			swiperList: [
				{ id: 1, src: 'url1', img: '/static/temp/banner2.jpg' },
				{ id: 2, src: 'url2', img: '/static/temp/banner3.jpg' },
				{ id: 3, src: 'url3', img: '/static/temp/banner4.jpg' }
			],
			navs: [{id:-1,name:'全部'}],
			conditions: [
				{
					text: '开始时间',
					sortUp: false
				},
				{
					text: '截止时间',
					sortUp: false
				},
				{
					text: '单次佣金',
					sortUp: false
				},
				{
					text: '完成人数',
					sortUp: false
				},
				{
					text: '剩余数量',
					sortUp: false
				}
			],
			tabSelected: -1,
			conditionSelected: 0,
			listData: [],
			taskData:[],
			pageInfo:{
				page:1,
				total:0
			},
			last_id: '',
			reload: false,
			status: 'more',
			// adpid: '',
			contentText: {
				contentdown: '上拉加载更多',
				contentrefresh: '加载中',
				contentnomore: '没有更多'
			}
		};
	},
	onLoad() {
		// uni.showToast({
		// 	title:'ffff',
		// 	duration:2000
		// })
		// this.adpid = this.$adpid;
		// this.getList();
		this.getCategoryList();
		this.getTaskList();
		
	},
	onPullDownRefresh() {
		setTimeout(function() {
			uni.stopPullDownRefresh();
		}, 1000);
		this.reload = true;
		this.getTaskList();
	},
	onReachBottom() {
		if(!this.reload){
			this.reload = true;
			this.status = 'more';
			this.pageInfo.page +=1;
			this.getTaskList();
		}
	
	},

	methods: {
		tabSelect(e) {
			this.tabSelected = e.currentTarget.dataset.id;
		},
		conditionSelect(e) {
			this.conditionSelected = e.currentTarget.dataset.id;
			const obj = {
				text: this.conditions[this.conditionSelected].text,
				sortUp: !this.conditions[this.conditionSelected].sortUp
			};
			this.$set(this.conditions, this.conditionSelected, obj);
		},
		getCategoryList(){
		
			getCategoryListApi().then(res=>{
				uni.showToast({
					title:JSON.stringify(res)
				})
				if(res.code !== 0)return;
			
				this.navs = [...this.navs,...res.data];
			})
		},
		getTaskList(){
			const params ={
				page:this.pageInfo.page,
				name:'',
				category_id:0,
				sort_type:1
			};
			this.reload = true;
			getTaskListApi(params).then(res=>{
				if(res.code !== 0)return this.reload = false,this.pageInfo = {page:1,total:0};
				const list = res.data.data;
					const total = res.data.total;
					if(list){
						list.map(item=>{
							item.remaining_time=formatDuring(item.remaining_time)
						});
						this.taskData = [...this.taskData,...list];
						if(this.taskData.length >=total){
							this.reload = true;
							this.status="nomore";
						}else{
							this.reload = false;
							this.status="loading";
						}
					}else{
						this.reload = true;
						this.status="nomore";
					}
			})
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
		},
		// aderror(e) {
		// 	console.log('aderror: ' + JSON.stringify(e.detail));
		// }
	}
};
</script>

<style lang="less">
@import url('./task-list.less');
</style>
