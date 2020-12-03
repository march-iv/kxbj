<template>
	<div class="wrap">
		<div ws>
			<h4>柱形图</h4>
			<p>这里演示了如何按需引入模块</p>
			<span class="link" @click="crebar1">创建</span>， 
			<span class="link" @click="reset1">重置</span><br><br>
			<div id="bar" class="demo"></div>
		</div>
		<div le>
			<h4>双柱形图</h4><br><br>
			<div id="twobar" class="demo"></div>
		</div>
		<div bg></div>
		<div tt></div>
	</div>
</template>

<script>
var echarts = require('echarts/lib/echarts');	// 引入 ECharts 主模块
			  require('echarts/lib/chart/bar');	// 引入柱状图组件
			  require('echarts/lib/component/tooltip');	// 引入提示框组件
			  require('echarts/lib/component/title');	// 引入标题组件
			  require('echarts/lib/component/legend');	// 引入图例组件

export default {
	name: 'bar',
	data () {
		return {
			bar1: {
				canvas: null,
				datax: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
			},
			twobar: {
				canvas: null
			}
		}
	},
	mounted () {
		this.crebar1()
		setTimeout(() => { this.creTwoBar() })
	},
	methods: {
		crebar1 () {
			if (this.bar1.canvas) return;

			// 基于准备好的dom，初始化echarts实例
			this.bar1.canvas = echarts.init(document.getElementById('bar'));

			// 配置图表
			let options = {
			    title: {
			        text: 'ECharts 入门示例'
			    },
				legend: {	// 图例组件
					data: ['销量'],
					show: true,
					zlevel: 9
				},
			    tooltip: {	// hover显示内容
					show: true,
					trigger: 'item',
					axisPointer: {
						type: 'cross'
					}
			    },
			    xAxis: {
			    	name: '商品',
			        data: this.bar1.datax,
			        axisLabel: {
						color: 'blue'
					},
					nameTextStyle: {
						color: 'red'
					},
					axisLine: {	// x轴线
					 	show: true,
						lineStyle: {color: "green"}
					},
					 splitLine: {
					 	show: false,
						lineStyle: {color: ["green", "red"]}
					}
			    },
			    yAxis: {	// 直角坐标系Y
			    	splitLine: {
						show: true
					}
			    },
			    series: [{
			        name: '销量',
			        type: 'bar',
					itemStyle: {
						normal: {color: '#fa867e'}
					},
			        data: [5, 20, 26, 10, 10, 20]
			    }]
			}

			// 绘制图表
			this.bar1.canvas.setOption(options);

			// 给图标添加点击事件
			this.bar1.canvas.on("click", params => {
				this.bar1.canvas.showLoading();
				setTimeout(() => { this.bar1.canvas.hideLoading(); }, 2000)
				console.log(params)
			})

			// 给图例添加点击事件
			this.bar1.canvas.on('legendselectchanged', function (params) {
				var i = params.selected[params.name];
				console.log(params.selected)
			})
		},
		reset1 () {
			this.bar1.canvas.setOption({
				xAxis: {
					name: "大大"
				},
				series: [{
					data: [45, 12, 22, 16, 19, 29]
				}]
			});
		},

		creTwoBar () {
			let province = ["广东省", "河南省", "上海市", "湖北省", "湖南省", "江西省"];

			let profmt = province.map(item => {
				return {
					value: item,
					textStyle: { align: "center" }
				};
			})

			var warning = [26, 37, 40, 18, 55, 12]; // 预警次数


			var intercept = [69, 40, 30, 22, 12, 39]; // 拦截次数

			let options = {
				legend: {	// 图例组件
					top: '0', left: 'center',
					itemGap: 160, // 图例每项之间的间隔
					icon: 'rect', // 图例项的 icon
					textStyle: { color: '#555659', fontSize: 14 },
					selectedMode: true, // 否可以通过点击图例改变系列的显示状态
					data: ['预警次数', '拦截次数']
				},
				tooltip: {	// 提示框组件
					show: true,
					trigger: 'axis',
					formatter: '{b}<br/>{a}: {c}',
					axisPointer: { type: 'shadow' }
				},
				grid: [	// 直角坐标系内绘图网格
					{
						show: false,
						left: "8%", top: 80, bottom: 40,
						containLabel: false,
						width: "35%"
					}, {
						show: false,
						left: "51%", top: 80, bottom: 40,
						width: "10%"
					}, {
						show: false,
						right: "8%", top: 80, bottom: 40,
						containLabel: false,
						width: "35%"
					}
				],
				xAxis: [	// 直角坐标系 grid 中的 x 轴
					{
						type: "value",
						inverse: true,
						axisLabel: {
							show: true, // 数值
							textStyle: { color: "#4c5e80", fontSize: 12 }
						},
						axisLine: {
							show: true, // 数值下的横线
							textStyle: { color: "blue", fontSize: 12 }
						},
						axisTick: {
							show: true // 横刻度线上的刻度
						},
						position: "top",
						splitLine: {
							show: false, // 纵线
							lineStyle: { color: "#1F2022", width: 1, type: "solid" }
						}
					},
					{
						gridIndex: 1,
						show: false
					},
					{
						gridIndex: 2,
						type: "value",
						axisLabel: {
							show: true, // 数值
							textStyle: { color: "#4c5e80", fontSize: 12 }
						},
						axisLine: {
							show: true, // 数值下的横线
							textStyle: { color: "#4d5e80", fontSize: 12 }
						},
						axisTick: {
							show: true // 横刻度线上的刻度
						},
						position: "top",
						splitLine: {
							show: false, // 纵线
							lineStyle: { color: "#1F2022", width: 1, type: "solid" }
						}
					}
				],
				yAxis: [	// 直角坐标系 grid 中的 y 轴
					{
						type: "category",
						inverse: true,
						position: "right",
						axisLabel: {
							show: false,
							margin: 0,
							textStyle: { color: "#4c5e80", fontSize: 12 }
						},
						axisLine: {
							show: false,
							textStyle: { color: "#4d5e80", fontSize: 12 }
						},
						axisTick: {
							show: false
						},
						data: province
					},
					{
						gridIndex: 1,
						type: "category",
						inverse: true,
						position: "left",
						axisLabel: {
							show: true,
							textStyle: { color: "#555659", fontSize: 14 }
						},
						axisLine: {
							show: false
						},
						axisTick: {
							show: false
						},
						data: profmt
					},
					{
						gridIndex: 2,
						type: "category",
						inverse: true,
						position: "left",
						axisLine: {
							show: false,
							textStyle: { color: "#4d5e80", fontSize: 12 }
						},
						axisTick: {
							show: false
						},
						axisLabel: {
							show: false,
							textStyle: { color: "#555659", fontSize: 12 }
						},
						data: province
					}
				],
				series: [
					{
						name: "预警次数",
						type: "bar",
						barGap: 20,	// 不同系列的柱间距离
						barWidth: 20, // 柱条的宽度，不设时自适应。
						label: {
							normal: {
								show: true,
								position: "left",
								textStyle: { color: "#7d8fb3", fontSize: 12 }
							},
							emphasis: {
								show: false,
								position: "left",
								offset: [0, 0],
								textStyle: { color: "#555659", fontSize: 12 }
							}
						},
						itemStyle: {
							normal: {
								color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
									offset: 0,
									color: "#05a3b7"
								}])
							},
							emphasis: {
								color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
									offset: 0,
									color: "#05a3b7"
								}])
							}
						},
						data: warning
					},
					{
						name: "拦截次数",
						type: "bar",
						// barGap: 20,
						barWidth: 20,
						xAxisIndex: 2,
						yAxisIndex: 2,
						label: {
							normal: {
								show: true,
								position: "right",
								textStyle: { color: "#7d8fb3", fontSize: 12 }
							},
							emphasis: {
								show: false,
								position: "right",
								offset: [0, 0],
								textStyle: { color: "#555659", fontSize: 12 }
							}
						},
						itemStyle: {
							normal: {
								color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
									offset: 0,
									color: "#ae2b38"
								}])
							},
							emphasis: {
								color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
									offset: 0,
									color: "#ae2b38"
								}])
							}
						},
						data: intercept
					}
				]
			}
			this.twobar.canvas = echarts.init(document.getElementById('twobar'));
			this.twobar.canvas.setOption(options)
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