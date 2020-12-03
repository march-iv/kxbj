<template>
	<div class="lewrap">
		<div class="menu" id="elementMenu">
			<router-link :to="{path: '/learn/element/moving'}">级联：动态加载</router-link>
			<router-link :to="{path: '/learn/element/needCreate'}">级联：按需创建</router-link>
			<router-link :to="{path: '/learn/element/lazy'}">级联：懒加载默认勾选</router-link>
			<router-link :to="{path: '/learn/element/level1'}">级联：只能选唯一层级</router-link>
			<router-link :to="{path: '/learn/element/backset'}">级联：多层级联回选</router-link>
			<router-link :to="{path: '/learn/element/treeLazy'}">Tree：逐级请求</router-link>
			<router-link :to="{path: '/learn/element/note'}">记事本</router-link>
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
			Array.from(document.querySelectorAll("#elementMenu a")).forEach(item => {
				item.style.color = '#2d8cf0'
				if (item.href.includes(o.path)) item.style.color = 'red'
			})
		}
	},
	mounted () {
		Array.from(document.querySelectorAll("#elementMenu a")).forEach(item => {
			item.style.color = '#2d8cf0'
			if (item.href.includes(this.$route.path)) item.style.color = 'red'
		})
	}
}
</script>

<style lang="scss" scoped></style>