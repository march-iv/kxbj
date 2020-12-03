<template>
	<div>
		<div class="main">
			<Slide :items="items"></Slide>
		</div>
	</div>
</template>

<script>
import Slide from '@/components/plug/photoswipe/slide'

export default {
	data () {
		return {
			items: []
		}
	},
	created: function () {
		// 如果是取本地的图片，就在取得时候 require 进来，网络图片则不需要 require，
		this.items = [{
			big: require('./Img/bigImg01.jpg'),
			small: require('./Img/smallImg01.jpg'),
			des: "今天很热"
		}, {
			big: require('./Img/bigImg02.jpg'),
			small: require('./Img/smallImg02.jpg'),
			des: "今天我只吃了一个披萨"
		}, {
			big: require('./Img/bigImg03.jpg'),
			small: require('./Img/smallImg03.jpg'),
			des: "而且我今天没有出门"
		}, {
			big: 'http://wx2.sinaimg.cn/large/67c53c97gy1ftbfw2cnlvj22bc1jke81.jpg',
			small: 'http://wx2.sinaimg.cn/large/67c53c97gy1ftbfw2cnlvj22bc1jke81.jpg',
			des: "马上要考试了"
		}];
	},
	mounted () { },
	components: { Slide }
}
</script>

<style scoped>

.wrap {
	position: relative;
	height: 100%;
}
</style>