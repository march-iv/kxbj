<template>
	<div class="lewrap">
		<div class="menu" id="editorMenu">
			<router-link :to="{path: '/learn/editor/ueditor'}">百度编辑器</router-link>
			<router-link :to="{path: '/learn/editor/wangEditor3'}">王编辑器</router-link>
			<router-link :to="{path: '/learn/editor/kindeditor'}">金编辑器</router-link>
			<router-link :to="{path: '/learn/editor/simpleMDE'}">SimpleMDE</router-link>
		</div>
		<div class="cont"><router-view/></div>
	</div>
</template>

<script>
export default {
	name: "editor-nav",
	data () {
		return {}
	},
	watch: {
		"$route": (o, n) => {
			Array.from(document.querySelectorAll("#editorMenu a")).forEach(item => {
				item.style.color = '#2d8cf0'
				if (item.href.includes(o.path)) item.style.color = 'red'
			})
		}
	},
	mounted () {
		Array.from(document.querySelectorAll("#editorMenu a")).forEach(item => {
				item.style.color = '#2d8cf0'
				if (item.href.includes(this.$route.path)) item.style.color = 'red'
			})
	}
}
</script>

<style lang="scss" scoped></style>