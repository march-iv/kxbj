<template>
	<div>
		<div class="wrap A" v-if="type === 1">
			<div>
				<i class="iconfont">&#xe655;</i>
				<p>{{tip}}</p>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		type: {
			type: Number,
			default: 1
		},
		tip: {
			type: String,
			default: "这里什么都没有"
		}
	},
	data () {
		return {}
	}
}
</script>

<style scoped>
.wrap {
	position: absolute;
	z-index: 9;
	top: 0; left: 0; bottom: 0;
	width: 100%;
	text-align: center;
	background-color: rgba(255,255,255,0.8);
}
.wrap:before {
	content: '';
	display: inline-block;
	vertical-align: middle;
	height: 100%; width: 0;
}
.wrap > div {	/*--wrap，里面是动画容器和文字--*/
	position: relative;
	display: inline-block;
	vertical-align: middle;
}
.A i {
	font-size: 56px;
	color: #999;
}
.A p {
	margin-top: 25px;
	color: #999;
}
</style>