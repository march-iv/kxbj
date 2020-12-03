<template>
	<div class="lewrap" page="echarts-ABC.vue">
		<div class="menu" id="echartMenu">
			<router-link to="/learn/echarts/bar">柱状图</router-link>
			<router-link to="/learn/echarts/line">折线图</router-link>
			<router-link to="/learn/echarts/scatter">散点图</router-link>
			<router-link to="/learn/echarts/pie">饼状图</router-link>
			<router-link to="/learn/echarts/x3">3系图</router-link>
			<router-link to="/learn/echarts/world">世界地图</router-link>
			<router-link to="/learn/echarts/china">中国地图</router-link>
			<router-link to="/learn/echarts/zuan">下钻图</router-link>
		</div>
		<div class="cont"><router-view/></div>
	</div>
</template>

<script>
export default {
	name: "element-nav",
	data () {
		return {}
	},
	watch: {
		"$route": (o, n) => {
			Array.from(document.querySelectorAll("#echartMenu a")).forEach(item => {
				item.style.color = '#2d8cf0'
				if (item.href.includes(o.path)) item.style.color = 'red'
			})
		}
	},
	mounted () {
		Array.from(document.querySelectorAll("#echartMenu a")).forEach(item => {
				item.style.color = '#2d8cf0'
				if (item.href.includes(this.$route.path)) item.style.color = 'red'
			})
	}
}
</script>

<style lang="scss" scoped></style>