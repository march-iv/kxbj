<template>
	<div>
		<h4>{{count}}</h4>
		<span @click="fna">doit</span>
		<router-view/>
	</div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'

export default {
	name: "",
	computed: mapState(['year', 'count']),
	methods: {
		fna () {
			console.log(this.$store.dispatch('getdata'))	// Promise
		}
	}
}
</script>

<style scoped>
* {
	user-select: none
}
</style>
