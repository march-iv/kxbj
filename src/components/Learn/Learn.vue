<template>
	<div class="wrap" page="Learn.vue">
    	<div class="nav">
    		<router-link to="/" style="color: green"><b>Home</b></router-link>
            <router-link :class="{curr: path.includes('axios')}" to="/learn/axios/get">Axios</router-link>
            <router-link :class="{curr: path.endsWith('vue') || path.includes('/vue/')}" to="/learn/vue">Vue</router-link>
            <router-link :class="{curr: path.includes('vuex')}" to="/learn/vuex/vuexA">Vuex</router-link>
            <router-link :class="{curr: path.includes('router')}" to="/learn/router/base">Vue路由</router-link>
            <router-link :class="{curr: path.includes('zujian')}" to="/learn/zujian/base">Vue组件</router-link>
            <router-link :class="{curr: path.includes('element')}" to="/learn/element/moving">Element</router-link>
            <router-link :class="{curr: path.includes('iview')}" to="/learn/iview/selectKids">Iview</router-link>
            <router-link :class="{curr: path.includes('echarts')}" to="/learn/echarts/bar">Echarts</router-link>
            <router-link :class="{curr: path.includes('photoswipe')}" to="/learn/photoswipe/hdp">PhotoSwipe</router-link>
            <router-link :class="{curr: path.includes('swiper')}" to="/learn/swiper/banner">Swiper</router-link>
            <router-link :class="{curr: path.includes('map')}" to="/learn/map/bdMap">地图</router-link>
            <router-link :class="{curr: path.includes('editor')}" to="/learn/editor/ueditor">编辑器</router-link>
            <router-link :class="{curr: path.includes('widget')}" to="/learn/widget">npm</router-link>
    	</div>
		<div class="cont"><router-view/></div>
    </div>
</template>

<script>
export default {
    name: 'App',
    data () {
    	return {
    		path: ''
    	}
    },
    watch: {
    	"$route" (to, from) {
    		this.path = to.path
    	}
    },
    mounted () {
    	this.path = this.$route.path
    }
}
</script>

<style lang="scss" scoped>
	.wrap {
		height: 100vh;
		display: flex;
		flex-direction: column;

		.nav {
			flex: 0 0 50px;
			line-height: 50px;
			border-bottom: 1px solid #ddd;
		}
		.nav > a {
			margin-left: 1em;
		}
		.nav > a.curr {
			color: crimson;
			font-weight: bold;
		}
		.cont {
			position: relative;
			flex: 1 1 auto;
		}
	}
</style>
