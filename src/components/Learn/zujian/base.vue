<template>
	<div class="wrapzz">
		<div style="border-right: 1px solid #ddd; margin-right: 5px;">
			<dl class="cellx3">
				<dd>
					<h5>组件基础用法</h5>
					<p>
						组件使用三步，import 引入 > conponent 注册 > 标签调用 <br>
						此页面演示了如何调用一个组件：
						<router-link :to="{path: '/learn/zujian/x4', query: {cell: 1}}">点此查看</router-link>
					</P>
				</dd>
				<dd>
					<h5>向组件传参</h5>
					<p>
						在引用组件时，通过属性/属性值的方式可以向组件传参，组件需要设置porps接收参数 <br>
						此页面演示如何向组件传递参数：
						<router-link :to="{path: '/learn/zujian/x4', query: {cell: 2}}">点此查看</router-link>
					</p>
				</dd>
				<dd>
					<h5>监听组件事件</h5>
					<p>
						引用组件时可设置一个事件绑定到子组件的 $emit 函数，如果子组件 $emit 函数被执行，那么该父级组件的事件被触发，看起来就是监听组件事件，或者说子组件调用父级组件函数，<router-link :to="{path: '/learn/zujian/x4', query: {cell: 3}}">点此查看</router-link>
					</p>
				</dd>
				<dd>
					<h5>调用组件事件</h5>
					<p>
						引用组件时，可给它设置一个 ref 属性，然后通过它可以调用组件内的函数，
						<router-link :to="{path: '/learn/zujian/x4', query: {cell: 4}}">点此查看</router-link>
					</p>
				</dd>
			</dl>
		</div>
		<div></div>
	</div>
</template>

<script>
export default {
	name: "zuBase",
	data () {
		return {}
	}
}
</script>

<style lang="scss" scoped>
	.wrapzz {
		width: 96%;
		margin: 20px 2% 0;
		display: flex;
		border: 1px solid #ddd;
		> div {
			flex: 0 0 50%;
		}
	}
	dl[class*="cellx"] dd p {
		line-height: 1.6;
		padding: 8px;
	}
	dl[class*="cellx"] dd p[c] {
		text-align: center;
	}

	.cellx3 {
		display: flex;
		flex-wrap: wrap;
	}
	.cellx3 dd {
		height: 33.33%;
		flex: 1 1 100%;
		box-sizing: border-box;
	}
	.cellx3 dd + dd {
		border-top: 1px solid #ddd;
	}
	.cellx3 dd h5 {
		margin: 5px 0 0 10px;
		color: green;
	}
</style>