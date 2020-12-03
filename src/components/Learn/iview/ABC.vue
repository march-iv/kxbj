<template>
	<div class="lewrap">
		<div class="menu" id="iviewMenu">
			<router-link to="/learn/iview/selectKids">子父级关联选择</router-link>
			<router-link to="/learn/iview/table">表格的基本用法</router-link>
			<router-link to="/learn/iview/upload">图片压缩和上传</router-link>
			<router-link to="/learn/iview/note">note</router-link>
			<router-link to="/learn/iview/demo">demo</router-link>
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
			Array.from(document.querySelectorAll("#iviewMenu a")).forEach(item => {
				item.style.color = '#2d8cf0'
				if (item.href.includes(o.path)) item.style.color = 'red'
			})
		}
	},
	mounted () {
		Array.from(document.querySelectorAll("#iviewMenu a")).forEach(item => {
				item.style.color = '#2d8cf0'
				if (item.href.includes(this.$route.path)) item.style.color = 'red'
			})
	}
}
</script>

<style lang="scss" scoped></style>