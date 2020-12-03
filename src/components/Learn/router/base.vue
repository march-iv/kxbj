<template>
	<div>
		<dl class="item1 cellx4">
			<dd aq>
				<h5>基本路由</h5>
				<p>
					「路由」简单的说，就是页面跳转，详细点的说就是根据 url，将指定 vue 组件载入到指定的 router-view 内。 <br>
					<router-link to="/learn/router/blog">点此查看</router-link> 小说节选（HTML）<br>
					<span class="link" @click="blog">点此查看</span> 小说节选（JS）
				</p>
			</dd>

			<dd bg>
				<h5>路由嵌套 & 命名视图</h5>
				<p>
					路由嵌套就是vue组件里含有一个 router-view 容器，命名命名试图就是 vue 组件里含有多个 router-view 容器，需要分别给这些容器命名。
					<router-link to="/learn/router/Rvx4/four">点此查看</router-link> 示例。
				</p>
			</dd>

			<dd lb>
				<h5>动态路由</h5>
				<p>比如音乐网站，不同歌都是进入一个播放页里，然后通过获取动态路由的路径参数进行服务器请求</p>
				<p c><input type="text" placeholder="输入歌名，然后ENTER" @keyup.enter="music"><span></span></p>
			</dd>

			<dd ab>
				<h5>路由传参</h5>
				<p>
					有两种方式可以通过路由向组件传参：query & params
					<br>
					params：
					<router-link :to="{ name: 'canshu', params: {name: '香蕉', price: '4.98'}}">香蕉</router-link>、
					<span class="link" @click="xiangjiao">香蕉 - JS</span>

					<br>
					query：
					<router-link :to="{ path: '/learn/router/CanShu', query: kador }">监听员</router-link>、
					<span class="link" @click="santi">监听员 - JS</span>
				</p>
			</dd>
		</dl>
	</div>
</template>

<script>
export default {
	name: "roBase",
	data () {
		return {
			kador: {id: 1379, level: 9, name: '卡尔多'}
		}
	},
	methods: {
		// 基本路由
		blog () {
			this.$router.push('/learn/router/blog')
		},

		// 动态路由
		music () {
			if (event.target.value) {
				// this.$router.push({name: 'yinyue', params: {music: event.target.value}})
				this.$router.push('/learn/router/music/' + event.target.value)
			}
		},

		// 路由传参
		xiangjiao () {
			this.$router.push({name: 'canshu', params: {name: '香蕉', price: '4.98'}})
		},
		santi () {
			this.$router.push({path: '/learn/router/CanShu', query: this.kador})
		}
	}
}
</script>

<style lang="scss" scoped>
	dl[class*="cellx"] dd p {
		line-height: 1.6;
		padding: 8px;
	}
	dl[class*="cellx"] dd p[c] {
		text-align: center;
	}

	.cellx4 {
		width: 600px;
		display: flex;
		flex-wrap: wrap;
	}
	.cellx4 dd {
		flex: 1 1 50%;
		min-height: 200px;
		box-sizing: border-box;
	}
	.cellx4 dd h5 {
		text-align: center;
		padding: 8px 0;
		border-bottom: 1px solid #fff;
	}
	.cellx4 dd:nth-child(1),
	.cellx4 dd:nth-child(2) {
		border-bottom: 1px solid #fff;
	}
	.cellx4 dd:nth-child(1),
	.cellx4 dd:nth-child(3) {
		border-right: 1px solid #fff;
	}
</style>