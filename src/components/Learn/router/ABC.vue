<template>
	<div class="lewrap">
		<div class="menu" id="routerMenu">
			<router-link to="/learn/router/base">知识点目录</router-link>
			<router-link to="/learn/router/blog">基本路由</router-link>
			<router-link to="/learn/router/Rvx4">路由嵌套/命名视图</router-link>
			<router-link to="/learn/router/music/《微风》">动态路由</router-link>
			<router-link to="/learn/router/CanShu">路由传参</router-link>
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
			Array.from(document.querySelectorAll("#routerMenu a")).forEach(item => {
				item.style.color = '#2d8cf0'
				if (o.path.split('/').length === 5) {
					let temp = o.path.slice(0, o.path.lastIndexOf('/'))
					if (item.href.includes(temp)) item.style.color = 'red'
				} else if (item.href.includes(o.path)) {
					item.style.color = 'red'
				}
			})
		}
	},
	mounted () {
		Array.from(document.querySelectorAll("#routerMenu a")).forEach(item => {
			item.style.color = '#2d8cf0'
			if (item.href.includes(this.$route.path)) item.style.color = 'red'
		})
	}
}
</script>

<style lang="scss" scoped></style>