<template>
	<div class="wrap">
		<div><h5>这里演示了多个 router-view 的使用</h5></div>
		<div><router-view/></div>
		<div><router-view name="apple"/></div>
		<div><router-view name="banana"/></div>
		<div><router-view name="cherry"/></div>
	</div>
</template>

<script>
export default {
	data () {
		return {

		}
	}
}
</script>

<style scoped>
.wrap {
	height: 100%;
	display: flex;
	flex-wrap: wrap;
}
.wrap > div {
	flex: 1 1 49%;
	height: calc(50% - 25px);
	padding: 10px;
	box-sizing: border-box;
	display: flex;
	justify-content: center;
	align-items: center;
}
.wrap > div:first-child {
	flex: 1 1 100%;
	height: 50px;
	border-bottom: 1px solid #ddd;
}
.wrap div + div + div + div {
	border-top: 1px solid #ddd;
}
.wrap > div:nth-child(2n) {
	border-right: 1px solid #ddd;
}
</style>