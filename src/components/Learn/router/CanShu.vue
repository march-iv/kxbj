<template>
	<div class="wrap">
		<div :class="{has: $route.params}">Params：{{$route.params}}</div>
		<div>Query：{{$route.query}}</div>
	</div>
</template>

<script>
export default {
	data () {
		return {}
	},
	created: function () {
		if (JSON.stringify(this.$route.params) !== "{}") {
			console.log("params 👇", this.$route.params)
		} else {
			console.log("query 👇", this.$route.query)
		}
	}
}
</script>

<style scoped>
.wrap {
	display: flex;
	flex-wrap: wrap;
	align-content: center;
	justify-content: center;
	height: 100%;
}
.wrap > div {
	height: 80px; line-height: 80px;
	text-indent: 1em;
	flex: 0 0 70%;
	margin: 20px 0;
	font-size: 22px;
	background-color: skyblue;
}
</style>