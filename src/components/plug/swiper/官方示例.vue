<template>
	<div class="wrap">
		<swiper :options="swiperOption" ref="mySwiper">
			<swiper-slide>I'm Slide 1</swiper-slide>
			<swiper-slide>I'm Slide 2</swiper-slide>
			<swiper-slide>I'm Slide 3</swiper-slide>
			<swiper-slide>I'm Slide 4</swiper-slide>
			<swiper-slide>I'm Slide 5</swiper-slide>
			<swiper-slide>I'm Slide 6</swiper-slide>
			<swiper-slide>I'm Slide 7</swiper-slide>
			<div class="swiper-pagination"  slot="pagination"></div>
			<div class="swiper-button-prev" slot="button-prev"></div>
			<div class="swiper-button-next" slot="button-next"></div>
			<div class="swiper-scrollbar"   slot="scrollbar"></div>
		</swiper>
	</div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
	name: 'carrousel',
	data () {
		return {
			swiperOption: {
				pagination: {
					el: '.swiper-pagination'
				}
			}
		}
	},
	components: { swiper, swiperSlide },
	computed: {
		swiper () {
			return this.$refs.mySwiper.swiper
		}
	},
	mounted () {
		console.log('this is current swiper instance object', this.swiper)
		this.swiper.slideTo(3, 1000, false)
	}
}
</script>

<style scoped>
.wrap {
	height: 260px;
}
.swiper-container {
	height: 100%;
}
</style>