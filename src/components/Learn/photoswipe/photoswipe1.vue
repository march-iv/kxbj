<template>
	<div class="wrap">
		<div class="main">
			<Gallery ref="photoswipe" :items="items" :amend="peizhi"></Gallery>
		</div>

		<div class="btns">
			<span class="link" @click="openswiper">打开</span>
			<span class="link" @click="swiperPrev">上一张</span>
			<span class="link" @click="swiperNext">下一张</span>
			<span class="link" @click="swiperZoomTo">自定义缩放</span>
			<span class="link" @click="swiperDddImg">添加图片</span>
		</div>
	</div>
</template>

<script>
import Gallery from '@/components/plug/photoswipe/gallery'
export default {
	data () {
		return {
			items: [{	// 提供给 photoswipe 的图像列表
				src: require('./Img/bigImg01.jpg'),
				w: 1600,
				h: 1200,
				pid: 'A',
				title: '图[1] 我爱滑板',
				// 这样就不会显示图片，而会显示下面的HTML内容
				html: '<a href="https://www.baidu.com/" style="color:#fff;text-align:center;line-height:100px;"><h1>这样就不会显示图片，而会显示HTML内容</h1></a>'
			}, {
				src: require('./Img/bigImg02.jpg'),
				w: 1600,
				h: 1200,
				pid: 'B',
				title: '图[2] 我爱烛光晚餐'
			}, {
				src: require('./Img/bigImg03.jpg'),
				w: 1600,
				h: 1200,
				pid: 'C',
				title: '图[3]'
			}],
			peizhi: {	// 提供给 photoswipe 额外的配置参数
				arrowKeys: false
			}
		}
	},
	methods: {
		openswiper: function () {
			this.$refs.photoswipe.openSwipe()
		},
		swiperPrev: function () {
			this.$refs.photoswipe.prev()
		},
		swiperNext: function () {
			this.$refs.photoswipe.next()
		},
		swiperZoomTo: function () {
			this.$refs.photoswipe.zoomTo()
		},
		swiperDddImg: function () {
			this.$refs.photoswipe.addImg({
			    src: require("./Img/bigImg04.jpg"), 
			    w: 2560, h: 1714 
			})
		}
	},
	components: { Gallery }
}
</script>

<style scoped>
.wrap {
	position: relative;
	height: 100%;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-content: space-between;
}
.btns {
	text-align: center;
	flex: 1 1 100%;
	height: 20%; line-height: 50px;
	margin: 0 5px;
}
.main {
	position: relative;
	flex: 1 1 100%;
	height: 90%;
	background-color: rgba(0,0,0,0.8);
}
</style>