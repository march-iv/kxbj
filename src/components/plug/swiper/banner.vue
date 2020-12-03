<template>
	<div class="main">
		<div class="swiper-container" v-if="usetype === 'props'">
			<div class="swiper-wrapper">
				<div class="swiper-slide"
					 v-for="(v, idx) in items"
					 :key="idx"
					 :style="{backgroundImage: 'url(' + v.imgsrc + ')'}">
					<a :href="v.src" target="_blank" v-if="v.src">
						<div class="des" v-if="v.des">{{v.des}}</div>
					</a>
				</div>
			</div>
		    <!-- Add Pagination -->
		    <div class="swiper-pagination" v-if="pagination"></div>
		    <!-- Add scrollbar -->
		    <div class="swiper-scrollbar" v-if="scrollbar"></div>
		    <!-- Add Arrows -->
		    <template v-if="button">
			    <div class="swiper-button-next"></div>
			    <div class="swiper-button-prev"></div>
		    </template>
		</div>

		<div class="swiper-container" v-else-if="usetype === 'slot'">
			<div class="swiper-wrapper">
				<slot></slot>
			</div>
		    <!-- Add Pagination -->
		    <div class="swiper-pagination" v-if="pagination"></div>
		    <!-- Add scrollbar -->
		    <div class="swiper-scrollbar" v-if="scrollbar"></div>
		    <!-- Add Arrows -->
		    <template v-if="button">
			    <div class="swiper-button-next"></div>
			    <div class="swiper-button-prev"></div>
		    </template>
		</div>

	</div>
</template>

<script>
import Extend from 'extend'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css'

export default {
	props: {
		usetype: {
			type: String,
			default: 'solt'
		},
		items: {	// slide 列表
			type: Array,
			default: () => []
		},
		amend: {	// 接收的配置参数
			type: Object,
			default: () => {}
		},
		pagination: {
			type: Boolean,
			default: true
		},
		scrollbar: {
			type: Boolean,
			default: false
		},
		button: {
			type: Boolean,
			default: false
		}
	},
	data () {
		return {
			swiper: '',
			options: {
				direction: 'horizontal',	// 方向
				spaceBetween: 0,			// slide 间隔
				slidesPerView: 1,			// 一次显示多少个 slide
				pagination: {	// 进度指示器
					el: '.swiper-pagination',
					clickable: true
				}
			}
		}
	},
	created: function () {
		// 合并对象，调用时修改配置参参数
		// 因为使用扩展运算符合并对象不能实现深层扩展，因此我们使用 extend 包
		// this.options = {...this.options, ...this.amend}
		this.options = Extend(true, this.options, this.amend)
	},
	mounted: function () {
		this.swiper = new Swiper('.swiper-container', this.options)
	}
}
</script>

<style scoped>
.main {
	height: 100%;
}
.swiper-container {
	height: 100%; width: 100%;
}
.swiper-slide {
	background-repeat: no-repeat;
	background-position: center;
	background-size: cover;
}
.swiper-slide > a {
	position: relative;
	display: block;
	height: 100%;
	cursor: grab;
}
.swiper-slide > a .des {
	position: absolute;
	bottom: 50px; left: 20px; right: 20px;
	padding: 5px;
	font-size: 12px;
	font-family: 'Source Han Sans CN';
	color: #333;
	background-color: rgba(255, 255, 255, 0.7);
	transition: all 200ms linear;
	opacity: 0;
	transform: scale(0.8);
}
.swiper-slide > a:hover .des {
	opacity: 1;
	transform: scale(1);
}
</style>

<style type="text/css">
.swiper-pagination-bullet {
    width: 20px; height: 20px;
    text-align: center;
    line-height: 20px;
    font-size: 12px;
    color:#000;
    opacity: 1;
    background: rgba(255, 255, 255, 0.2);
}
.swiper-pagination-bullet-active {
    color:#fff;
    background: #007aff;
}
</style>