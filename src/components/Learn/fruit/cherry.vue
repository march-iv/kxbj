<template>
	<div>
		<i class="iconfont" :style="{color: iconcolor, fontSize: iconsize}">&#xe602;</i>
	</div>
</template>

<script>
export default {
	name: "apple",
	data () {
		return {
			iconcolor: "#E34361",
			iconsize: "50px"
		}
	}
}
</script>

<style scoped></style>