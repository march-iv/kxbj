<template>
	<div class="wrap">
		<div ws>
			<h4>折线图</h4>
			<span class="link" @click="creLine1">创建</span>， 
			<span class="link" @click="reset1">重置</span><br><br>
			<div id="line" class="demo"></div>
		</div>
		<div le>
			<h4>直角坐标系</h4>
			<div id="xys" class="demo"></div>
		</div>
		<div bg></div>
		<div tt></div>
	</div>
</template>

<script>
import echarts from 'echarts'

export default {
	name: 'line.vue',
	data () {
		return {
			line1: {
				canvas: null,
				date: [
					'2017-07-01', '2017-07-02', '2017-07-03', '2017-07-04', '2017-07-05', '2017-07-06', '2017-07-08', '2017-07-09', '2017-07-10', '2017-07-11', '2017-07-12', '2017-07-13', '2017-07-14', '2017-07-15', '2017-07-16', '2017-07-17'
				],
				data: [0, 0, 0, 26, 59, 102, 60, 10, 0, 106, 312, 102, 59, 55, 0, 0, 0]
			},
			line2: {
				canvas: null,
				data: []
			}
		}
	},
	mounted () {
		this.creLine1()
		setTimeout(() => { this.creLine2() }, 1000)
	},
	methods: {
		creLine1 () {
			if (this.line1.canvas) return;

			let opt = {
				title: {	// 标题
					text: '收益走向'
				},
				tooltip: {	// hover显示内容
					trigger: 'axis'
				},
				legend: {
					data: ['流量', '降雨量'],
					x: 'left'
				},
				dataZoom: [
					{
						type: 'inside',
						realtime: true,
						start: 0,
						end: 100
					}
				],
				grid: [{
					left: 50,
					right: 50
				}],
				xAxis: [{
					name: '日期',
					type: 'category',
					boundaryGap: false,
					axisLine: {onZero: true},
					data: this.line1.date
				}],
				yAxis: [{
					name: '收益￥',
					type: 'value'
				}],
				series: [{	// 系列列表
					name: '销量',
					type: 'line',
			        symbolSize: 8,		// 标记(就是圆点)的大小
			        hoverAnimation: false,
			        data: this.line1.data,
			        smooth: true,
			        areaStyle: {
			        	normal: {
			        		color: '#FFD3D4'
			        	}
			        }
				}]
			}
			this.line1.canvas = echarts.init(document.querySelector("#line"));
			this.line1.canvas.setOption(opt);
		},
		reset1 () {
			this.line1.canvas.setOption({
				series: [{
					data: [0, 2, 6, 20, 39, 82, 160, 110, 60, 86, 212, 292, 59, 55, 0, 0, 0]
				}]
			})
		},

		creLine2 () {
			let opt = {
				grid: [{ top: 50, left: 50, right: 50, bottom: 50 }],
				xAxis: {
					name: "X轴",
					boundaryGap: false,
					data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
				},
				yAxis: {
					name: "Y轴",
					type: 'value',
					axisLine: false	// 显示x轴分割线
					// splitLine: false
				},
				series: [
					{
						type: 'line',
						data: [10, 23, 29, 20, 26, 32, 35],
						lineStyle: { color: "#00B9FD" }
					},
					{
						type: 'line',
						data: [15, 13, 19, 29, 36, 39, 40],
						lineStyle: { color: "#0F69FF" }
					}
				]
			}

			this.line2.canvas = echarts.init(document.querySelector("#xys"));
			this.line2.canvas.setOption(opt);
		}
	}
}
</script>

<style lang="scss" scoped>
	.wrap {
		height: 100%;
		display: flex;
		flex-wrap: wrap;
	}
	.wrap > div {
		flex: 0 0 50%;
		height: 50%;
		padding: 15px;
		box-sizing: border-box;
	}
	.demo {
		width: 40vw; height: 36vh;
	}
</style>