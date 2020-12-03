<template>
	<div>
		<el-cascader v-model="davf" :options="options" :props="{value: 'id', checkStrictly: true}">
		</el-cascader>
	</div>
</template>

<script>
export default {
	name: "Note.vue",
	data () {
		return {
			davf: [],
			options: [
				{
					value: "1",
					label: "游戏",
					children: [
						{
							value: "10",
							label: "手机游戏",
							disabled: true,
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
	}
}
</script>

<style lang="scss" scoped>
	
</style>