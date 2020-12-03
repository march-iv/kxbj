<template>
	<header>
		<div class="back" @click="back"><i class="iconfont">&#xe63c;</i> 返回</div>
		<div class="title">{{title}}</div>
		<div class="btn"></div>
	</header>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			default: '项目'
		}
	},
	data () {
		return {}
	},
	methods: {
		back: function () {
			this.$router.go(-1)
		}
	}
}
</script>

<style scoped>
header {
	display: flex;
	justify-content: space-between;
	height: 35px; line-height: 35px;
	overflow: hidden;
	text-align: center;
	border-bottom: 1px solid #ddd;
	background-color: #fff;
}
header .back {
	flex: 0 0 60px;
}
header .back i {
	position: relative;
	top: 2px; left: 2px;
	font-size: 18px;
}
header .title {
	flex: 1 1 auto;
}
header .btn {
	flex: 0 0 60px;
}
</style>