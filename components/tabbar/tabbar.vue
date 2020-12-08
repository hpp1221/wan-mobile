<template>
	<view>
		<block v-for="(item, index) in tabList" :key="index">
			<view class="navigator" :class="currentTabIndex == index ? 'on' : ''" @tap="switchTab(index)">
				<view class="icon">
					<text class="iconfont" :class="item.icon" :style="[currentTabIndex == index ? { color: tintColor } : { color: color }]"></text>
					<text v-if="item.badge" class="uni_badge">{{ item.badge }}</text>
					<text v-if="item.badgeDot" class="uni_badge uni_badge_dot"></text>
				</view>
				<view class="text" :style="[currentTabIndex == index ? { color: tintColor } : { color: color }]">{{ item.text }}</view>
			</view>
		</block>
	</view>
</template>

<script>
export default {
	data() {
		return {
			tabList: [
				{
					icon: 'icon-emotion',
					text: 'tab01',
					badge: 1
				},
				{
					icon: 'icon-qianbao',
					text: 'tab02'
				},
				{
					icon: 'icon-choose01',
					text: 'tab03',
					badgeDot: true
				}
			],
			currentTabIndex: this.current
		};
	},
	props: {
		current: { type: [Number, String], default: 0 },
		backgroundColor: { type: String, default: '#fbfbfb' },
		color: { type: String, default: '#999' },
		tintColor: { type: String, default: '#42b983' }
	},
	methods: {
		switchTab(index) {
			this.currentTabIndex = index;
			this.$emit('click', index);
		}
	}
};
</script>

<style lang="less"></style>
