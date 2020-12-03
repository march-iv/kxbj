<template>
	<div class="lewrap">
		<div class="menu" id="ps">
			<router-link to="/learn/photoswipe/hdp">幻灯片</router-link>
			<router-link to="/learn/photoswipe/hualang">画廊</router-link>
		</div>
		<div class="cont"><router-view/></div>
	</div>
</template>

<script>
export default {
	name: "photoswipe-nav",
	data () {
		return {}
	},
	watch: {
		"$route": (o, n) => {
			Array.from(document.querySelectorAll("#ps a")).forEach(item => {
				item.style.color = '#2d8cf0'
				if (item.href.includes(o.path)) item.style.color = 'red'
			})
		}
	},
	mounted () {
		Array.from(document.querySelectorAll("#ps a")).forEach(item => {
				item.style.color = '#2d8cf0'
				if (item.href.includes(this.$route.path)) item.style.color = 'red'
			})
	}
}
</script>

<style lang="scss" scoped></style>