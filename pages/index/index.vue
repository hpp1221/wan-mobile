<template>
	<view><view class="click">click</view></view>
</template>

<script>
export default {
	data() {
		return {
			data: [
				{
					id: 1,
					name: '1'
				},
				{
					id: 2,
					name: '2',
					childs: [
						{
							id: 21,
							name: '21'
						},
						{
							id: 22,
							name: '22'
						},
						{
							id: 23,
							name: '23'
						}
					]
				},
				{
					id: 3,
					name: '3'
				},
				{
					id: 4,
					name: '4'
				},
				{
					id: 5,
					name: '5'
				}
			],
			authData: [
				{
					id: 5,
					name: '5'
				},
				{
					id: 2,
					name: '2',
					childs: [
						{
							id: 23,
							name: '23'
						},
						{
							id: 21,
							name: '21'
						}
					]
				}
			]
		};
	},
	created() {
		this.init();
	},
	methods: {
		init() {
			const arr = this.commonU(this.data, this.authData);
			// const arr1 = this.filterMenu(arr,"bool")
			console.log('arr1', arr);
		},
		commonU(data1, data2) {
			data1.map(item1 => {
				data2.map(item2 => {
					if (item1.id === item2.id) {
						item1.bool = true;
						if (item2.childs && item2.childs.length) {
							this.commonU(item1.childs, item2.childs);
						}
						return item1;
					}
				});
			});
			return data1;
		},
		filterMenu(menuList, menuCode){
		    return menuList.filter(item=>item[menuCode]).map(item => {
		        item = Object.assign({}, item)
		        if (item.childs) {
		            item.childs = this.filterMenu(item.childs, menuCode)
		        }
		        return item
		    })
		}
	}
};
</script>

<style lang="less">
@import url('./index.less');
</style>
