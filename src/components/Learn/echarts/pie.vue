<template>
	<div class="wrap">
		<div ws>
			<h4>饼状图演示</h4>
			<span class="link" @click="crePie1">创建</span><br><br>
			<div id="pie" class="demo"></div>
		</div>
		<div le></div>
		<div bg></div>
		<div tt></div>
	</div>
</template>

<script>
// 引入 ECharts 主模块
import echarts from 'echarts'

export default {
	name: 'pie',
	data () {
		return {
			pie1: {
				canvas: null,
				data: []
			},
			pie2: {
				canvas: null,
				data: []
			}
		}
	},
	mounted () {
		this.crePie1()
	},
	methods: {
		crePie1 () {
			if (this.pie1.canvas) return;

			let opt = {
				title: { // 标题组件
					text: '饼状图',
					textStyle: { color: 'blue' }
				},
				legend: { // 图例组件
					type: 'scroll',
					bottom: '4%', left: '5%', right: '5%',
					data: [	'搜索引擎', '视频广告', '联盟广告', '线上推广', '线下推广',
							'直接访问', '邮件营销', '广告', '传统媒体', '新媒体' ],
					itemGap: 16
				},
				visualMap: { // 视觉映射组件
					show: true,
					min: 80, max: 600,
					inRange: {
				     // colorLightness: [0, 1]
				    }
				},
				tooltip: {	// 提示框组件
					show: true,
					formatter: "{a} <br/>{b}: {c} ({d}%)"
					// formatter: "{d}%"
				},
				graphic: {	// 圆形中间的那个内容
					type: "text",
					left: 'center', top: 'center',
					style: {
						text: '全部访问\n\n' + '12,569',
						textAlign: 'center'
					}
				},
				backgroundColor: "skyblue",
				textStyle: {
					color: '#fff'
				},
				series: [{
					type: 'pie',
					name: '访问来源',		// 系列名称，用于tooltip的显示
					// roseType: 'angle',	// 显示成南丁格尔图
					radius: ['30%', '70%'],	// 饼状图的半径
					// center: ['36%','50%'],	// 饼图中心的位置	
					label: {	// 饼图图形上的文本标签(所有的)
						normal: {
							show: true,
							position: 'outside',	// 标签在文本外侧，通过视觉引导线链接
							textStyle: {			// 标签字体样式
								color: "#fff"
							}
						}
					},
					labelLine: {	// 连接标签和饼状图的引导线(所有的)
						normal: {
							show: true,
							lineStyle: {
								color: "#fff"
							}
						}
					},
					itemStyle: {	// 饼状图的颜色(所有的)
						normal: {},
						emphasis: {
							shadowBlur: 10,
							shadowOffsetX: 10,
							shadowColor: 'rgba(0,0,0,0.5)'
						}
					},
					data: [
						{
							value: 235,
							name: '视频广告',
							label: {	// 饼图图形上的文本标签(单个的)
								normal: {
									textStyle: {
										color: 'darkkhaki'
									}
								}
							},
							itemStyle: {	// 饼图的样式(单个的)
								normal: {
									color: 'darkkhaki'
								}
							},
							tooltip: {	// 饼图的提示标签样式(单个的)
								backgroundColor: 'green',
								padding: 10,
								textStyle: {
									color: 'skyblue'
								}
							}
						},
						{value: 156, name: '联盟广告'},
						{value: 365, name: '邮件营销'},
						{value: 155, name: '直接访问'},
						{value: 108, name: '搜索引擎'},
						{value: 198, name: '广告'},
						{value: 111, name: '传统媒体'},
						{value: 351, name: '新媒体'},
						{value: 178, name: '线上推广'},
						{value: 364, name: '线下推广'}
					]
				}]
			}

			this.pie1.canvas = echarts.init(document.querySelector("#pie"))
			this.pie1.canvas.setOption(opt)

			// 让'视频广告'部分高亮
			this.pie1.canvas.dispatchAction({
				type: 'highlight',
				seriesIndex: 0,
				dataIndex: 0
			});
			// 让视频广告标签显示出来
			this.pie1.canvas.dispatchAction({
				type: 'showTip',
				seriesIndex: 0,
				dataIndex: 0
			});
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