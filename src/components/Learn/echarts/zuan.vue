<template>
	<div>
		<span id="back">后退</span>
		<div id="map" style="width: 800px; height: 500px;"></div>
	</div>
</template>

<script>
import axios from "axios"
import 'echarts/map/js/china.js'
import 'echarts/map/js/province/anhui.js'
import 'echarts/map/js/province/guangdong.js'
import 'echarts/map/js/province/jiangxi.js'

var echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/map')

export default {
	name: 'zuan',
	data () {
		return {
			chinaMap: null,
			allprovinceData: [
				{
			        name: "黑龙江",
			        value: 7
			    },
			    {
			        name: "吉林",
			        value: 7
			    },
			    {
			        name: "辽宁",
			        value: 7
			    },
			    {
			        name: "上海",
			        value: 1
			    },
			    {
			        name: "江苏",
			        value: 1
			    },
			    {
			        name: "浙江",
			        value: 9
			    },
			    {
			        name: "安徽",
			        value: 5
			    },
			    {
			        name: "福建",
			        value: 9
			    },
			    {
			        name: "江西",
			        value: 4
			    },
			    {
			        name: "山东",
			        value: 5
			    },
			    {
			        name: "台湾",
			        value: 11
			    },
			    {
			        name: "北京",
			        value: 6
			    },
			    {
			        name: "天津",
			        value: 6
			    },
			    {
			        name: "山西",
			        value: 8
			    },
			    {
			        name: "河北",
			        value: 6
			    },
			    {
			        name: "内蒙古",
			        value: 8
			    },
			    {
			        name: "河南",
			        value: 3
			    },
			    {
			        name: "湖北",
			        value: 4
			    },
			    {
			        name: "湖南",
			        value: 4
			    },
			    {
			        name: "广东",
			        value: 2
			    },
			    {
			        name: "广西",
			        value: 2
			    },
			    {
			        name: "海南",
			        value: 2
			    },
			    {
			        name: "香港",
			        value: 2
			    },
			    {
			        name: "澳门",
			        value: 2
			    },
			    {
			        name: "重庆",
			        value: 10
			    },
			    {
			        name: "四川",
			        value: 10
			    },
			    {
			        name: "贵州",
			        value: 10
			    },
			    {
			        name: "云南",
			        value: 10
			    },
			    {
			        name: "西藏",
			        value: 10
			    },
			    {
			        name: "陕西",
			        value: 3
			    },
			    {
			        name: "甘肃",
			        value: 3
			    },
			    {
			        name: "青海",
			        value: 3
			    },
			    {
			        name: "宁夏",
			        value: 8
			    },
			    {
			        name: "新疆",
			        value: 8
			    },
			    {
			        name: "南海诸岛",
			        value: 11
			    }
		    ]
		}
	},
	created () {},
	mounted () {
		// let url1 = '/static/map/shenzhen.json';


		// axios.get(url1).then(res => {
		// 	console.log(res)
		// 	echarts.registerMap('china', res.data)	// 注册地图
		// 	var mychart = echarts.extendsMap('#map', {})
		// })

		// echarts.registerMap('深圳', require('echarts/map/json/province/guangdong/shenzhen.json'))
		

		this.chinaMap = echarts.init(document.querySelector("#map"));
		this.chinaMap.mapdata = {
			active: 'china',
			maplist: {
				"中国": 'china-cities',
				"广东": 'guangdong',
				"江西": 'jiangxi',
				"湖北": 'hubei',
				"上海": 'hubei',
				'河北': 'hebei',
				'山西': 'shanxi',
				'辽宁': 'liaoning',
				'吉林': 'jilin',
				'江苏': 'jiangsu',
				'浙江': 'zhejiang',
				'安徽': 'anhei',
				'福建': 'fujian',
				'山东': 'shandong',
				'河南': 'henan',
				'湖南': 'hunan',
				'广西': 'guangxi',
				'海南': 'hainan',
				'四川': 'sichuan',
				'贵州': 'guizhou',
				'云南': 'yunnan',
				'西藏': 'xizang',
				'陕西': 'shanxi',
				'甘肃': 'gansu',
				'青海': 'qinghai',
				'宁夏': 'ningxia',
				'新疆': 'xinjiang',
				'北京': 'beijing',
				'天津': 'tianjing',
				'重庆': 'chongqing',
				'香港': 'xianggang',
				'澳门': 'aomen',
				'内蒙古': 'neimenggu',
				'黑龙江': 'heilongjiang'
			}
		}
		this.setmap()
		echarts.extendsMap('#map', {})
	},
	methods: {
		setmap () {
			echarts.extendsMap = function (el, opt) {	// 给 echarts 实例添加方法
				console.log(this)
				// let chart = this.init(document.querySelector(el));
				// console.log(this.chinaMap)
				// 地图数据
				let cityMap = {
					"中国": '/static/map/zhongguo_full.json',
					"广东": 'guangdong',
					"江西": 'jiangxi',
					"湖北": 'hubei',
					"上海": 'hubei',
					'河北': 'hebei',
					'山西': 'shanxi',
					'内蒙古': 'neimenggu',
					'辽宁': 'liaoning',
					'吉林': 'jilin',
					'黑龙江': 'heilongjiang',
					'江苏': 'jiangsu',
					'浙江': 'zhejiang',
					'安徽': 'anhei',
					'福建': 'fujian',
					'山东': 'shandong',
					'河南': 'henan',
					'湖南': 'hunan',
					'广西': 'guangxi',
					'海南': 'hainan',
					'四川': 'sichuan',
					'贵州': 'guizhou',
					'云南': 'yunnan',
					'西藏': 'xizang',
					'陕西': 'shanxi',
					'甘肃': 'gansu',
					'青海': 'qinghai',
					'宁夏': 'ningxia',
					'新疆': 'xinjiang',
					'北京': 'beijing',
					'天津': 'tianjing',
					'重庆': 'chongqing',
					'香港': 'xianggang',
					'澳门': 'aomen'
				}

				let shengfen = null;

				// 默认设置
				let defaultOpt = {
					mapName: ''
				}

				if (opt) opt = this.util.extend(defaultOpt, opt)

				let option = {
					backgroundColor: 'skyblue',
					// graphic: {[]},
					geo: {
						map: 'china',
						roam: true,
						zoom: 1
						// data: this.allprovinceData
					},
		            visualMap: {
		                min: 0,
		                max: 11,
		                left: 'left',
		                top: 'bottom',
		                text: ['高', '低'],
		                calculable: true,
		                seriesIndex: '1',
		                show: false,
		                inRange: {
		                    color: [
		                        "#ffffff",
		                        "#ffc188",
		                        "#479fd2",
		                        "#fba853",
		                        "#48c7c0",
		                        "#fa8737",
		                        "#4bbdd6",
		                        "#ff6f5b",
		                        "#F4D5B1",
		                        "#ADE1E3",
		                        "#F4B387",
		                        "#F0F3F4"
		                    ]
		                }
		            },
					series: [{
						type: 'map',
						geoIndex: 0
						// data: this.allprovinceData
					}]
				}

				var handleEvents = {
					back: function (params) {
						option.geo.map = 'china'
						option.geo.zoom = 1
						this.chinaMap.clear()
						this.chinaMap.setOption(option)
					}
				}

				this.chinaMap.setOption(option);

				this.chinaMap.on("click", function (params) {
					console.log(params)
					var self = this;	// this === chinaMap

					echarts.registerMap(params.name, require('echarts/map/json/province/' + cityMap[params.name] + '.json'))
					option.geo.map = params.name
					option.geo.zoom = 1
					self.clear()
					self.setOption(option)
					// chinaMap.resetOption(self, option)
				})

				document.querySelector("#back").addEventListener("click", function () {
					handleEvents.back()
				})
			}
		}
	}
}
</script>

<style>
	
</style>