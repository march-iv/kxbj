<template>
	<div class="lewrap">
		<div class="menu" id="vuexMenu" style="color: red">
			<router-link to="/learn/vuex/vuexA" style="color: red">vuexA</router-link>
			<router-link to="/learn/vuex/vuexWrap">vuexWrap</router-link>
		</div>
		<div class="cont"><router-view/></div>
	</div>
</template>

<script>
export default {
	name: "vuNav.vue",
	data () {
		return {}
	},
	watch: {
		"$route": (o, n) => {
			Array.from(document.querySelectorAll("#vuexMenu a")).forEach(item => {
				item.style.color = '#2d8cf0'
				if (item.href.includes(o.path)) item.style.color = 'red'
			})
		}
	},
	mounted () {
		Array.from(document.querySelectorAll("#vuexMenu a")).forEach(item => {
			item.style.color = '#2d8cf0'
			if (item.href.includes(this.$route.path)) item.style.color = 'red'
		})
	}
}
</script>

<style lang="scss" scoped>
	
</style>