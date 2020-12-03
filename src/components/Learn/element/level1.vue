<template>
	<div class="wrap"><br>
		<div>级联选择器：不同级别只能单选</div> <br> <hr> <br>
		<p>比如， A 下面有 B  C </p>
		<p>B 和 C 可以同时勾选，但是勾选了 B 和 C 时，再勾选 A 时，取消勾选 B 和 C </p>
		<p>勾选了 A 时，再勾选 B 或 C 时， A 取消勾选</p>
		<p>因为 A 是第一层级，B C 是第二层级，同级别可以多选，父子关系的不同级别只能单选，只能选择一个层级，不能同时选择多个层级</p>
		<br>
		<el-cascader v-model="davf" :props="prop" :options="options" :show-all-levels="false"></el-cascader>
	</div>
</template>

<script>
import _ from 'lodash'

export default {
	name: 'level1.vue',
	data () {
		return {
			davf: null,
			prop: {
				multiple: true,			// 是否可多选
				checkStrictly: true	// 可以选择任意一层级节点
			},
			Temp: [
				{
					label: '广东', value: 2,
					children: [] // 如果这里是空数组，如果上面 checkStrictly 设置为 false，那么无法选中'广东'
				}, {
					label: '广西', value: 6
				}
			],
			options: [
				{
					value: "1",
					label: "游戏",
					children: [
						{
							value: "10",
							label: "手机游戏",
							children: [
								{ value: "101", label: "像素射击" },
								{ value: "102", label: "王者农药" }
							]
						}, {
							value: "11",
							label: "电脑游戏",
							children: [
								{ value: "111", label: "星战前夜" },
								{ value: "112", label: "英雄联盟" }
							]
						}, {
							value: "12",
							label: "PS4"
						}
					]
				}, {
					value: "2",
					label: "国家",
					children: [
						{ value: "20", label: "亚洲" },
						{ value: "21", label: "欧洲" },
						{ value: "22", label: "美洲" }
					]
				}, {
					value: "3",
					label: "水果",
					children: [
						{
							value: "30",
							label: "春季",
							children: [
								{ value: "301", label: "蔓越莓" },
								{ value: "302", label: "桃子" }
							]
						}, {
							value: "31",
							label: "夏季",
							children: [
								{ value: "311", label: "西瓜" },
								{ value: "312", label: "菠萝" }
							]
						}
					]
				}
			]
		}
	},
	watch: {
		davf: function (newval, oldval) {
			if (newval && oldval && newval.length > oldval.length) {	// 只在勾选时执行，取消勾选不执行
				let newNode = _.difference(newval, oldval)[0];
				let newNodeCf = []
				newNode.forEach((list, index) => {
					newNodeCf.push(newNode.slice(0, index + 1))
				})
				// newNode 是新勾选的
				// 假设 newNode 是 [1, 3, 5]
				// 那么 newNodeCf 是 [ [1], [1,3], [1,3,5] ] 
				// 假设勾选的是 [ [1], [2], [1,3], [2,4], [1,3,5], [2,4,8], [1,3,5,7], [1,3,5,7,9] ]
				let xiaquIdTemp = this.davf;

				// 每次点击都处理一下级联绑定的值
				xiaquIdTemp.forEach((item, index) => {
					newNodeCf.forEach(list => {
						if (newNode.length > item.length) {
							if (_.isEqual(list, item)) {
								_.remove(xiaquIdTemp, function (v) {
									// 删掉 [1], [1,3], 但不要删除 [2], [2,4] , 因为它们不在父子体系链里
									return v.toString() === list.toString()
								});
							}
						} else if (newNode.length < item.length) {
							_.remove(xiaquIdTemp, function (v) {
								// 删掉 [1,3,5,7], [1,3,5,7,9]，但不要删掉 [1,3,5], 因为他是刚选择的, 也不要删父子体系链里的[2,4,8]
								return newNode.toString() === v.slice(0, newNode.length).toString() && newNode.toString() !== v.toString()
							});
						}
					})
				})

				this.davf = null
				setTimeout(() => { this.davf = xiaquIdTemp }, 10)
			}
		}
	}
}
</script>

<style lang="scss" scoped>
	.wrap {
		line-height: 2;
		padding: 0 1em;
		font-size: 16px;
	}
	ul {
		color: #999;
		line-height: 1.6;
	}
	span.link {
		color: blue;
		cursor: pointer;
	}
</style>