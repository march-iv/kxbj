<template>
	<div>
		<span :class="sk9"><i class="iconfont mango">&#xe614;</i></span>
	</div>
</template>

<script>
export default {
	name: 'mango',
	data () {
		return {
			icon: "🍋",
			sk9: ''
		}
	},
	methods: {
		tiao () {
			this.sk9 = this.sk9 ? '' : 'dence'
		}
	}
}
</script>

<style scoped>
.mango {
	color: coral;
	font-size: 80px;
}
.dence {
	display: inline-block;
	animation: denceAni 1s linear infinite;
}
@keyframes denceAni {
	0% {transform: scale(1)}
	50% {transform: scale(1.4)}
	100% {transform: scale(1)}
}
</style>