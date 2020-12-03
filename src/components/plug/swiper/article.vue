<template>
	<div class="swiper-container">
		<div class="swiper-wrapper">
			<div class="swiper-slide article">
				<slot></slot>
			</div>
		</div>
	    <!-- Add scrollbar -->
	    <div class="swiper-scrollbar article-bar" v-if="scrollbar"></div>
	</div>
</template>

<script>
import Extend from 'extend'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css'

export default {
	props: {
		items: {	// slide 列表
			type: Object,
			default: () => {}
		},
		amend: {	// 接收的配置参数
			type: Object,
			default: () => {}
		},
		scrollbar: {
			type: Boolean,
			default: true
		}
	},
	data () {
		return {
			swiper: '',
			options: {
				direction: 'vertical',
				slidesPerView: 'auto',
				freeMode: true,
				scrollbar: {
					el: '.swiper-scrollbar',
					hide: true
				},
				mousewheel: true
			}
		}
	},
	created: function () {
		// 合并对象，调用时修改配置参参数
		// this.options = {...this.amend, ...this.options}
		this.options = Extend(true, this.options, this.amend)
	},
	mounted: function () {
		this.swiper = new Swiper('.swiper-container', this.options)
	}
}
</script>

<style scoped>
.swiper-container {
	height: 100%; width: 100%;
}
.swiper-slide {
	height: auto;
	box-sizing: border-box;
}
.article-bar {
	/* background-color: #333; */
}
</style>