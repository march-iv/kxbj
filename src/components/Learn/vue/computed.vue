<template>
	<div>
		<h3>这里测试一下计算属性..</h3><br><hr><br>
		id 的 length：<b>{{num}}</b><br><br>
		通过 getter 获取今天的日期是： {{today}} ，年 {{year}} 月{{month}} 日{{day}}<br><br>
		通过 getter 来<span class="link" @click="setfn">设置</span> today 的日期
	</div>
</template>

<script>
export default {
	name: "try.vue",
	data () {
		return {
			year: "2079", month: "4", day: "18",
			apple: "🍎", charry: "🍓",
			id: [102, 40, 839, 320]
		}
	},
	computed: {
		num: function () {
			return this.id.length
		},
		today: {
			// 计算属性默认只有 getter，不过在需要时你也可以提供一个 setter
			get: function () {
				return this.year + "-" + this.month + "-" + this.day
			},
			set (newDate) {
				let date = new Date(newDate || '')
				this.year = date.getFullYear()
				this.month = date.getMonth()
				this.day = date.getDate()
			}
		}
	},
	methods: {
		setfn () {
			this.today = '2104-09-17'
			// 调用了 today 的伪属性 setter，更改了 data 中多个值
		}
	}
}
</script>

<style lang="scss" scoped>
	
</style>