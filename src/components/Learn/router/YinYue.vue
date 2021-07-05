<template>
	<div>
		曲名：{{$route.params.musicName}}
	</div>
</template>

<script>
export default {
	data () {
		return { }
	},
	created () {
		console.log(this.$route.params)
	}
}
</script>

<style scoped></style>