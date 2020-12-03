<template>
	<div class="wrap">
		<div ws>
			<h4>散点图</h4>
			<span class="link" @click="creScatter1">创建</span>， 
			<span class="link" @click="reset1">重置</span><br><br>
			<div id="scatter" class="demo"></div>
		</div>
		<div le></div>
		<div bg></div>
		<div tt></div>
	</div>
</template>

<script>
import echarts from 'echarts'

export default {
	name: 'bubble.vue',
	data () {
		return {
			bubble1: {
				canvas: null,
				data: [["14.616", "7.241", "0.896"], ["3.958", "5.701", "0.955"], ["2.768", "8.971", "0.669"], ["9.051", "9.710", "0.171"], ["14.046", "4.182", "0.536"], ["12.295", "1.429", "0.962"], ["4.417", "8.167", "0.113"], ["0.492", "4.771", "0.785"], ["7.632", "2.605", "0.645"], ["14.242", "5.042", "0.368"]]
			}
		}
	},
	mounted () {
		this.creScatter1()
	},
	methods: {
		creScatter1 () {
			if (this.bubble1.canvas) return;

			let opt = {
				xAxis: {
			        type: 'value'
			    },
			    yAxis: {
			        type: 'value'
			    },
			    dataZoom: [
			        {   // 第一个dataZoom组件，没有设置控制的轴，默认控制x轴。
			            type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
			            start: 10,      // 左边在 10% 的位置。
			            end: 60         // 右边在 60% 的位置。
			        },
			        {	// 第二个dataZoom组件，控制x轴，使得滚轮可以缩放x轴
			        	type: 'inside',
			        	xAxisIndex: [0]
			        },
			        {	// 第三个dataZoom组件，控制y轴
			        	type: 'slider',
			        	yAxisIndex: [0],
			        	start: 35,
			        	end: 70
			        },
			        {	// 第四个dataZoom组件，控制x轴，使得滚轮可以缩放y轴
			        	type: 'inside',
			        	yAxisIndex: [0]
			        }
			    ],
			    series: [
			        {
			            type: 'scatter',
			            itemStyle: {
			                normal: {
			                    opacity: 0.8
			                }
			            },
			            symbolSize: function (val) {
			                return val[2] * 40;
			            },
			            data: this.bubble1.data
			        }
			    ]
			}
			this.bubble1.canvas = echarts.init(document.querySelector("#scatter"));
			this.bubble1.canvas.setOption(opt)
		},
		reset1 () { }
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