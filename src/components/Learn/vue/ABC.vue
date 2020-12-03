<template>
	<div class="lewrap">
		<div class="menu" id="vueMenu">
			<router-link to="/learn/vue/slot" style="color: red">slot</router-link>
		</div>
		<div class="cont"><router-view/></div>
	</div>
</template>

<script>
export default {
	name: "vue-ABC.vue",
	data () {
		return {}
	},
	watch: {
		"$route": (o, n) => {
			Array.from(document.querySelectorAll("#vueMenu a")).forEach(item => {
				item.style.color = '#2d8cf0'
				if (item.href.includes(o.path)) item.style.color = 'red'
			})
		}
	}
}
</script>

<style lang="scss" scoped></style>