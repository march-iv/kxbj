<template>
	<div class="wrap"><br>
		<div>级联选择器：多层级的级联实现回选</div> <br> <hr> <br>
		<el-cascader v-model="davf" :show-all-levels="false"
			:options="list" :props="{multiple: true, checkStrictly: true, value: 'id'}"></el-cascader> {{davf}} <br> <br>
		<Button type="primary" @click="setcheck">勾选“南昌”和“福田区”</Button>
	</div>
</template>

<script>
export default {
	name: 'backset.vue',
	data () {
		return {
			list: [
				{
					label: "广东",
					id: 1,
					children: [{
						label: '广州',
						id: 11,
						children: []
					}, {
						label: '深圳',
						id: 12,
						children: [{label: '南山区', id: 121}, {label: '福田区', id: 122}]
					}]
				}, {
					label: "江西",
					id: 6,
					children: [ { label: '南昌南昌', id: 61 } ]
				}
			],
			davf: []
		}
	},
	methods: {
		setcheck () {
			let res = [61, 122]
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