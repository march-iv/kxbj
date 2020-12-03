<template>
	<div class="lewrap">
		<div class="menu" id="ZJMenu">
			<router-link to="/learn/zujian/base" style="color: red">组件基础用法</router-link>
			<router-link to="/learn/zujian/x4">示例</router-link>
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
			Array.from(document.querySelectorAll("#ZJMenu a")).forEach(item => {
				item.style.color = '#2d8cf0'
				if (item.href.includes(o.path)) item.style.color = 'red'
			})
		}
	},
	mounted () {
		Array.from(document.querySelectorAll("#ZJMenu a")).forEach(item => {
			item.style.color = '#2d8cf0'
			if (item.href.includes(this.$route.path)) item.style.color = 'red'
		})
	}
}
</script>

<style lang="scss" scoped></style>