<template>
	<div>
		<h3>vue - data</h3><br><hr><br>
	</div>
</template>

<script>
export default {
	name: "data.vue",
	data () {
		return {
			cisty: '上海',
			fruit: ['葡萄', "荔枝"],
			sex: "女",
			tx: 'style', zhi: {color: 'red'},
			dis: false,
			url: 'sdsads,',
			name: "<b>哥白尼</b>",
			today: "2021", time: 16,
			type: "A",
			arr: [1, 5, 9],
			set: new Set(['a', 'd', 'r']),
			map: new Map([["!", "感叹号"], [9, "数字"]])
		}
	},
	components: {},
	computed: {},
	methods: {}
}
</script>

<style lang="scss" scoped>
	
</style>