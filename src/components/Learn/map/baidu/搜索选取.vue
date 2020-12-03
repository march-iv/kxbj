<template>
	<div class="thiswrap">
		<div>
			<div id="map"></div><br>
			<Button type="primary" @click="createMap">创建</Button>
			<br><br>
			<p>引用百度地图时，会在控制台提升一个关于 Cookie 的 SameSite 属性的警告，这需要百度处理添加此属性，所以暂时无解，详见
				<a href="https://www.cnblogs.com/everlose/p/13261433.html" target="_blank">百度地图控制台警告</a></p>
		</div>
		<div style="margin-left: 20px;">
			搜索城市：
			<el-radio-group v-model="mapSearchArea" size="mini" @change="change">
				<el-radio-button v-for="city in cities" :label="city" :key="city">{{city}}</el-radio-button>
		    </el-radio-group>
		    <br><br>
			<Input v-model="searchStr" style="width: 250px"
				@on-clear="clearMap"
				clearable placeholder="输入地名搜索"
				@on-enter="searchMap" />
			<Button type="primary" @click="searchMap">搜索</Button>
			<div style="font-size: 16px;margin: 10px 0;">
				<p>地名：{{posName}}</p>
				<p>经纬度：{{pos}}</p>
			</div>

			<br>

			<Button type="primary" @click="setMap">设置一个标注</Button>

			<ul class="mapList" setbar>
				<li v-for="item in searchList" :key="item.title" @click="openInfoMap(item)">{{item.title}}</li>
				<!-- <li v-for="item in searchList" :key="item.title" @click="searchMap(item.point)">{{item.title}}</li> -->
			</ul>
		</div>

	</div>
</template>

<script>
export default {
	name: "bdMap.vue",
	data () {
		return {
			map: null,
			mapSearch: null,
			cities: ['上海市', '北京市', '广州市', '深圳市'],
			mapSearchArea: '深圳市',
			searchStr: '图书馆',
			posName: '',
			pos: null,
			searchList: []
		}
	},
	mounted () {
		this.createMap()
	},
	methods: {
		createMap () {	// 创建地图
			// 创建地图实例
			this.map = new window.BMap.Map("map", {
				enableMapClick: true	// 开启底图可点，点击会弹信息框
			});

			// 设置地图显示的城市，此城市与下面的坐标应该一致 此项是必须设置的
			this.map.setCurrentCity("北京");

			// 初始化地图,设置中心点坐标和地图级别
			this.map.centerAndZoom(new window.BMap.Point(116.404, 39.915), 11);

			// 添加地图类型控件
			this.map.addControl(new window.BMap.MapTypeControl({
				type: window.BMAP_MAPTYPE_CONTROL_HORIZONTAL,	// mapTypes 按钮水平方式展示，默认值
				mapTypes: [
					window.BMAP_NORMAL_MAP,		// 街道视图
					window.BMAP_SATELLITE_MAP,	// 卫星视图
					window.BMAP_HYBRID_MAP		// 卫星和路网的混合视图
				]
			}));

			// 开启鼠标滚轮缩放
			this.map.enableScrollWheelZoom(true);

			// 创建一个地址解析器的实例，用于根据坐标获取的地址
			var geoc = new window.BMap.Geocoder();

			// 给地图增加点击事件，用来获取点击坐标和地名
			this.map.addEventListener("click", (e) => {
				console.log(e)
				if (e.overlay) {
					console.log("点击的是地图搜索结果，或者其它地图上的覆盖物")
					this.pos = e.overlay.point
				} else {
					console.log("点击的市地图地图")
					this.pos = e.point
				}

				if (e.overlay && e.overlay.K.title) {
					this.posName = e.overlay.K.title
				} else {
					// 只有点击搜索结果才能获取到地名，不点击搜索结果，或者点击地图，都需要根据 getLocation 来获取地址解析
					let point = !e.overlay ? e.point : e.overlay.point
					geoc.getLocation(point, res => { // 根据点击的坐标获取地址名
						// console.log(res)
						if (res.surroundingPois.length) {
							this.posName = res.surroundingPois[0].title
						} else {
							this.posName = res.address
						}
					})
				}
			})
		},
		searchMap (point) {	// 搜索地图
			if (!this.map) this.createMap()

			if (this.mapSearch) {
				this.mapSearch.search(this.searchStr)
			} else {
				this.mapSearch = new window.BMap.LocalSearch(this.mapSearchArea.toString(), {
					renderOptions: {map: this.map},
					autoViewport: true,	// 检索结束后自动调整地图视野
					onSearchComplete: res => {
						if (res.Zq && !res.Zq.length) {
			                this.searchList = [];
			              	this.$Message.info("请输入更详细的地址")
			            } else {
							this.searchList = res.Zq;
			            }
					}
				})
				// let target = point.constructor === MouseEvent ? this.searchStr : new window.BMap.Point(point.lng, point.lat);
				this.mapSearch.search(this.searchStr)
			}
		},
		clearMap () {
			if (this.mapSearch) this.map.clearOverlays()
		},
		change () {
			this.map = null
			this.mapSearch = null
		},
		setMap () {	// 地图上设置一个标注
			let addMarker = (point) => {	// 编写自定义函数,创建标注
				// 创建一个图像标注实例
				let marker = new window.BMap.Marker(point);
				// 将覆盖物添加到地图中
				this.map.addOverlay(marker);
			}

			let pointers = [
				{
					name: "万象天地",
					pos: {
						lng: 113.96541331341973,
						lat: 22.547945031151766
					}
				}, {
					name: "华润总部大厦",
					pos: {
						lng: 113.96477264193022,
						lat: 22.54840798910517
					}
				}
			]

			for (let item of pointers) {
				// 分别建地理点坐标，并添加标注到地图上
				let p = new window.BMap.Point(item.pos.lng, item.pos.lat)
				addMarker(p)
			}

			// 设置地图显示的中心位置
			let zx = new window.BMap.Point(113.96541331341973, 22.547945031151766)
			this.map.centerAndZoom(zx, 20)	// 设初始化地图
		},
		openInfoMap (item) {
			console.log(item)
			var searchInfoWindow = new window.BMapLib.SearchInfoWindow(this.map, item.address, {
				title: item.title,		// 标题
				width: 150,				// 宽度
				height: 40,				// 高度
				panel: "panel",			// 检索结果面板
				enableAutoPan: true,	// 自动平移
				searchTypes: []
			});
			searchInfoWindow.open(new window.BMap.Point(item.point.lng, item.point.lat));
		}
	}
}
</script>

<style lang="scss" scoped>
.thiswrap {
	display: flex;
	height: 100%;

	#map {
		width: 700px; height: 500px;
		background-color: #f9f9f9;
	}

	ul.mapList {
		padding: 10px 0;
		max-height: 300px;
		overflow-y: auto;
		li {
			padding: 5px 0;
			margin-bottom: 5px;
			color: blue;
			cursor: pointer;
		}
		li:hover {
			background-color: skyblue;
		}
	}
}
</style>