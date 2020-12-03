<template>
	<div class="wrap">
		<div style="width: 1000px;">
			<h4>世界地图</h4>
			<p>此版本通过设置geoindex && seriesIndex: [1] 属性来实现geo和map共存，来达到hover散点和区域显示tooltip的效果</p>
			<p>默认情况下，map series 会自己生成内部专用的 geo 组件。但是也可以用这个 geoIndex 指定一个 geo 组件。这样的话，map 和 其他 series（例如散点图）就可以共享一个 geo 组件了。并且，geo 组件的颜色也可以被这个 map series 控制，从而用 visualMap 来更改。</p>
			<p>当设定了 geoIndex 后，series-map.map 属性，以及 series-map.itemStyle 等样式配置不再起作用，而是采用 geo 中的相应属性。</p>
		</div>
		<br><br>
		<div id="world"></div>
	</div>
</template>

<script>
import 'echarts/map/js/world.js' 
// import echarts from 'echarts'
// var echarts = require('echarts');
var echarts = require('echarts/lib/echarts'); // 引入 ECharts 主模块

export default {
	name: 'china',
	data () {
		return {
			world: null
		}
	},
	mounted: function () {
		this.setmap();
		// window.onresize = myChart.resize;
	},
	methods: {
		setmap () {
			var option = {
				geo: {
					map: 'world',
			        zoom: 1.2,
			        itemStyle: {	// 地图区域的多边形图形样式
			            normal: {
			                areaColor: 'skyblue',	// 区域颜色
			                borderColor: 'skyblue'	// 界线
			            }
			        },
			        emphasis: {		// 高亮状态下的多边形和标签样式
			        	label: { show: true, color: '#fff' },
			            itemStyle: { areaColor: '' }
			        },
			        aspectScale: 0.8,
			        layoutCenter: ['50%', '50%'],
			        layoutSize: 1000
				},
				series: [
					{	// 地图
						type: 'map',
						map: 'world',
						geoIndex: 0
					},
					{	// 地图上的散点
						type: 'scatter',
						name: '点',
						coordinateSystem: 'geo',
						symbol: 'pin',	// 气泡
						symbolSize: 40,	// 气泡大小
						itemStyle: {
							color: '#D43E00'
						},
						label: {
							show: true
						},
						data: [
							{name: 'China', value: [116.4, 39.9, 177]},
							{name: 'United States', value: [77.3, 38.5, 667]},
							{name: 'Japan', value: [139.1, 35.8, 367]},
							{name: 'Romania', value: [12.2, 14.2, 10]}
						]
					}
				]
			}
			this.world = echarts.init(document.querySelector("#world"));
			this.world.setOption(option)
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
	#world {
		width: 80vw; height: 70vh;
		border: 1px solid #ddd;
	}
</style>