<template>
	<div class="thisWrap" page="As.vue">
        <div class="nav">
			<router-link to="/">入口</router-link> | 
			<router-link to="/xiangMu/Home">首页</router-link>
			<span @click="back"><i class="iconfont">&#xe63c;</i></span>
			<span @click="go"><i class="iconfont">&#xe620;</i></span> | 
			<router-link to="/Learn">实验室</router-link>
        </div>
		<div class="cont" setbar><router-view/></div>
	</div>
</template>

<script>
export default {
	data () {
		return {}
	},
	methods: {
	    back () {
			this.$router.go(-1)
	    },
	    go () {
			this.$router.go(1)
	    }
	}
}
</script>

<style lang="scss" scoped>
	.thisWrap {
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: #f9f9f9;

		.nav {
			width: 400px;  height: 26px;
			line-height: 26px;
			text-align: left;
			margin-bottom: 5px;
		}
	    .nav a, .nav span {
	    	display: inline-block;
	    	vertical-align: middle;
	    	font-size: 14px;
			color: blue;
			margin: 0 5px;
			font-family: 'Source Han Sans CN';
			cursor: pointer;
	    }
	    .nav a:hover, .nav span:hover {
			color: chocolate;
	    }

		.cont {
			overflow: auto;
			width: 400px; height: 520px;
			border: 1px solid #ddd;
		}
	}
	@media (max-width: 501px) {
		.thisWrap .nav {
			display: none;
		}
		.thisWrap .cont {
			width: 100%;
			height: inherit;
		}
	}
</style>
