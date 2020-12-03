<template>
	<div class="wrap">
		<div style="width: 1000px;">
			<h4>中国地图</h4>
		</div>
		<br><br>
		<div id="map"></div>
	</div>
</template>

<script>
import echarts from 'echarts'
import 'echarts/map/js/china.js' 

export default {
	name: 'china',
	data () {
		return {
			zh: null,
			resdata: [{
	        	name: "齐齐哈尔",
	        	value: [123.97, 47.33, 56],
	        	itemStyle: { color: 'red' }
	    	}, {
	        	name: "北京",
	        	value: [120.13, 33.38, 33],
	        	itemStyle: { color: 'blue' }
	    	}]
		}
	},
	mounted: function () {
		this.cre()
	},
	methods: {
		cre () {
			var option = {
			    title: { // 标题组件
			        text: '中国大区分布图',
			        subtext: '中国的八大区分布',	// 副标题
			        sublink: '#',	// 链接地址
			        itemGap: 30,
			        left: 'center',
			        textStyle: {
			            color: '#1a1b4e',
			            fontStyle: 'normal',
			            fontWeight: 'bold',
			            fontSize: 30
			        },
			        subtextStyle: {
			            color: '#58d9df',
			            fontStyle: 'normal',
			            fontWeight: 'bold',
			            fontSize: 16
			        }
			    },
			    tooltip: { trigger: 'item' },
				visualMap: { // 视觉映射组件
				    min: 0, max: 100,
				    left: 'left', top: 'bottom',
				    text: ['高', '低'],
				    calculable: true,
				    inRange: {
				        color: ['#ffffff', '#E0DAFF', '#ADBFFF', '#9CB4FF', '#6A9DFF', '#3889FF']
				    }
				},
				toolbox: { // 右侧工具栏
				    show: true,
				    orient: 'vertical',
				    left: 'right', top: 'center',
				    feature: {
				        dataView: { readOnly: false },
				        restore: {},
				        saveAsImage: {}
				    }
				},
			    geo: { // 地理坐标系组件
			        map: 'china',
			        zoom: 1.2,
			        roam: true,
			        label: {
			            normal: {
			                show: true,
			                color: 'red'
			            }
			        },
			        itemStyle: {
			            normal: {
			                areaColor: 'pink',
			                borderColor: 'transparent'
			            },
			            emphasis: {
			                areaColor: 'skyblue'
			            }
			        }
			    },
				series: [
					{
					    type: 'effectScatter',
					    coordinateSystem: 'geo', // 该系列使用的坐标系
					    name: '供需占比',
					    data: this.resdata,	 // 散点数据1
					    // data: this.convertData(),// 散点数据2
					    symbolSize: 10,
					    showEffectOn: 'render',
					    rippleEffect: {
					        brushType: 'stroke'
					    },
					    hoverAnimation: true,
					    label: {
					        normal: {
					            formatter: '{b}',
					            position: 'right',
					            show: false
					        },
					        emphasis: {
					            show: true
					        }
					    },
					    itemStyle: {
					        normal: {
					            color: 'red',
					            shadowBlur: 10,
					            shadowColor: '#333'
					        }
					    }
					},
					{
						type: 'map',
						map: 'china',
				 		geoIndex: 0,
				        label: {
				            normal: {
				                show: true
				            },
				            emphasis: {
				                show: true
				            }
				        },
				        data: [	// 地图省块数据
					        {name: '北京', value: this.randomData()}, 
					        {name: '天津', value: this.randomData()}, 
					        {name: '上海', value: this.randomData()}, 
					        {name: '重庆', value: this.randomData()}, 
					        {name: '河北', value: this.randomData()}, 
					        {name: '河南', value: this.randomData()}, 
					        {name: '云南', value: this.randomData()}, 
					        {name: '辽宁', value: this.randomData()}, 
					        {name: '黑龙江', value: this.randomData()}, 
					        {name: '湖南', value: this.randomData()}, 
					        {name: '安徽', value: this.randomData()}, 
					        {name: '山东', value: this.randomData()}, 
					        {name: '新疆', value: this.randomData()}, 
					        {name: '江苏', value: this.randomData()}, 
					        {name: '浙江', value: this.randomData()}, 
					        {name: '江西', value: this.randomData()}, 
					        {name: '湖北', value: this.randomData()}, 
					        {name: '广西', value: this.randomData()}, 
					        {name: '甘肃', value: this.randomData()}, 
					        {name: '山西', value: this.randomData()}, 
					        {name: '内蒙古', value: this.randomData()}, 
					        {name: '陕西', value: this.randomData()}, 
					        {name: '吉林', value: this.randomData()}, 
					        {name: '福建', value: this.randomData()}, 
					        {name: '贵州', value: this.randomData()}, 
					        {name: '广东', value: this.randomData()}, 
					        {name: '青海', value: this.randomData()}, 
					        {name: '西藏', value: this.randomData()}, 
					        {name: '四川', value: this.randomData()}, 
					        {name: '宁夏', value: this.randomData()}, 
					        {name: '海南', value: this.randomData()}, 
					        {name: '台湾', value: this.randomData()}, 
					        {name: '香港', value: this.randomData()}, 
					        {name: '澳门', value: this.randomData()}, 
					        {name: '南海诸岛', value: this.randomData()}
				        ]
					}
				]
			}
			this.zh = echarts.init(document.querySelector("#map"));
			this.zh.setOption(option)
		},
		convertData () {
			let data = [
			    {name: '齐齐哈尔'}, {name: '盐城'}, {name: '青岛'},  {name: '金昌'}, 
			    {name: '泉州'}, {name: '拉萨'}, {name: '上海浦东'}, {name: '攀枝花'}, 
			    {name: '威海'}, {name: '承德'}, {name: '汕尾'}, {name: '克拉玛依'},
			    {name: '重庆市'}
			];

			let geoCoordMap = {
			    '齐齐哈尔': [123.97, 47.33],
			    '盐城': [120.13, 33.38],
			    '青岛': [120.33, 36.07],
			    '金昌': [102.188043, 38.520089],
			    '泉州': [118.58, 24.93],
			    '拉萨': [91.11, 29.97],
			    '上海浦东': [121.48, 31.22],
			    '攀枝花': [101.718637, 26.582347],
			    '威海': [122.1, 37.5],
			    '承德': [117.93, 40.97],
			    '汕尾': [115.375279, 22.786211],
			    '克拉玛依': [84.77, 45.59],
			    '重庆市': [108.384366, 30.439702]
			};
		    let res = [];

		    for (let i = 0; i < data.length; i++) {
		        let geoCoord = geoCoordMap[data[i].name];

		        if (geoCoord) {
		            res.push({
		                name: data[i].name,
		                value: geoCoord.concat(data[i].value)
		            });
		        }
		    }
		    return res;
		},
		randomData () {
			return Math.round(Math.random() * 100);
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
	#map {
		width: 80vw; height: 70vh;
	}
</style>