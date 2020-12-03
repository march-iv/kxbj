<template>
	<div>
		<i class="iconfont caomei" @click="change">&#xe60c;</i>

		<!-- 亦可以使用更简单的方法，直接写在行间，如👇 -->
		<!-- <i class="iconfont caomei" @click="$emit('trigger', today)">new</i> -->
	</div>
</template>

<script>
export default {
	name: "apple",
	data () {
		return {
			today: "2019-08-02 19：47"
		}
	},
	methods: {
		change () {
			this.$emit("trigger", this.today)
		}
	}
}
</script>

<style scoped>
.caomei {
	color: violet;
	font-size: 80px;
	cursor: pointer;
	transition: color 100ms linear;
}
.caomei:hover {
	color: #e161e1;
}
</style>