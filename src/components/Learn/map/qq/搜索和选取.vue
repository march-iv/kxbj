<template>
	<div class="thiswrap">
		<div id="map"></div>
	</div>
</template>

<script>
export default {
	name: "base.vue",
	data () {
		return {
			map: null
		}
	},
	mounted () {
		this.map = new window.qq.maps.Map(document.getElementById("map"), {
			center: new window.qq.maps.LatLng(39.916527, 116.397128),
			zoom: 8
		});
	}
}
</script>

<style lang="scss" scoped>
.thiswrap {
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;

	#map {
		width: 600px; height: 400px;
		background-color: #f9f9f9;
	}
}
</style>