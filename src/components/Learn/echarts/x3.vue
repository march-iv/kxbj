<template>
	<div class="wrap">
		<div style="text-align: center">
			<h4>三个类型的图建在一起</h4>
			<span class="link" @click="cx3A">A创建</span>，
			<span class="link" @click="cx3B">B创建</span>
		</div>
		<br><br>
		<div id="x3"></div>
	</div>
</template>

<script>
// var echarts = require('echarts/lib/echarts');
import echarts from 'echarts'

export default {
	name: 'x3',
	data () {
		return {
			x3: null
		}
	},
	mounted () {
		this.cx3A()
	},
	methods: {
		// 第一种提供数据的方式，分别提供
		cx3A () {
			if (this.x3) this.x3.clear()

			this.x3 = echarts.init(document.querySelector("#x3"));
			this.x3.setOption({
				xAxis: {
					data: [
						"Jan", "Feb", "Mar", "Apr", "May", "Jun",
						"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
					]
				},
				yAxis: {},
				series: [{
					type: 'pie',
					center: ['65%', 150],
					radius: 35,
					data: [
						{name: 'XX', value: 52},
						{name: 'YY', value: 54},
						{name: 'ZZ', value: 42}
					]
				}, {
					type: 'line',
					data: [34, 28, 45, 69, 39, 43, 33, 23, 23, 33, 39, 22]
				}, {
					type: 'bar',
					data: [20, 14, 32, 46, 24, 23, 23, 13, 16, 20, 24, 15]
				}]
			})
		},

		// 第二种提供数据的方式，集中提供
		cx3B () {
			this.x3.clear()

			this.x3 = echarts.init(document.querySelector("#x3"));
			this.x3.setOption({
				xAxis: {type: 'category'},
				yAxis: {},
				dataset: {
					source: [
						['1月', 34, 20, 'XX', 52],
						['2月', 28, 14, 'YY', 54],
						['3月', 45, 32, 'ZZ', 42],
						['4月', 69, 46],
						['5月', 39, 24],
						['6月', 43, 23],
						['7月', 33, 23],
						['8月', 23, 13],
						['9月', 23, 16],
						['10月', 33, 20],
						['11月', 39, 24],
						['12月', 22, 15]
					]
				},
				series: [{
					type: 'pie',
					center: ['65%', 60],
					radius: 35,
					encode: {itemName: 3, value: 4}
				}, {
					type: 'line',
					encode: {x: 0, y: 1}
				}, {
					type: 'bar',
					encode: {x: 0, y: 2}
				}]
			});
		}
	}
}
</script>

<style scoped>
	.wrap {
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	h4 {
		line-height: 50px;
		text-align: center;
		font-size: 18px;
	}
	#x3 {
		width: 70vw; height: 60vh;
	}
</style>