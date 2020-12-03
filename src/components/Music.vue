<template>
	<div class="xmwrap">
        <router-link tag="div" to="/xiangMu/Home">
			<i class="iconfont">&#xe604;</i>
			<p>音乐</p>
		</router-link>
	</div>
</template>

<script>
export default {
	data () {
		return {}
	},
	methods: {}
}
</script>

<style scoped>
.xmwrap {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.iconfont {
	font-size: 120px;
	color: #999;
}
p {
	font-size: 26px;
	margin-top: 15px;
	text-align: center;
	color: #999;
}
</style>
