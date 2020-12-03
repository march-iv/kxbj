<template>
	<dl class="main">
		<dd class="wrap">
			<Banner :items="items" :usetype="'props'"></Banner>
		</dd>
		<dd class="wrap">
			<Banner :usetype="'slot'" :button="true" :amend="peizhi">
				<div class="swiper-slide" style="background-image: url(http://image.ngchina.com.cn/2019/0810/20190810011313103.jpg)">
					<a href="http://www.ngchina.com.cn/photography/photo_of_the_day/6003.html" target="_blank">
						<div class="des">风暴过后的迷信山</div>
					</a>
				</div>
				<div class="swiper-slide" style="background-image: url(http://image.ngchina.com.cn/2019/0809/20190809024423234.jpg)">
					<a href="http://www.ngchina.com.cn/photography/photo_of_the_day/6002.html" target="_blank">
						<div class="des">肯尼亚的马赛马拉大草原上，一只外出捕猎的母狮子正在踱步，背景里意想不到地出现了三只好奇的长颈鹿。马赛长颈鹿是长颈鹿里最大型的种类，这也意味着它们是最高的陆地动物。</div>
					</a>
				</div>
				<div class="swiper-slide" style="background-image: url(http://image.ngchina.com.cn/2019/0808/20190808021958301.jpg)">
					<a href="http://www.ngchina.com.cn/photography/photo_of_the_day/6001.html" target="_blank">
						<div class="des">密西西比州，姐妹俩在一家老式餐馆分享一份圣代冰激凌。</div>
					</a>
				</div>
				<div class="swiper-slide" style="background-image: url(http://image.ngchina.com.cn/2019/0805/20190805022118151.jpg)">
					<a href="http://www.ngchina.com.cn/photography/photo_of_the_day/6001.html" target="_blank">
						<div class="des">位于斯洛文尼亚的一处酒庄旁边的道路形状像一颗爱心。</div>
					</a>
				</div>
			</Banner>
		</dd>
		<dd tt style="flex: 1 1 100%;width: 100%;margin: 0 20px 20px;">上面的例子中，是当前的组件调用两个相同的组件，根据条件载入不同组件的内容，这导致了一些问题，比如分页器小点不跟随变换，右边的切换按钮控制了两个swiper，没事，因为很少会在一个页面上显示两个swiper，</dd>
	</dl>
</template>

<script>
import Banner from '@/components/plug/swiper/banner'

export default {
	data () {
		return {
			peizhi: {	// 提供给 photoswipe 额外的配置参数
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev'
				}
			},
			items: [{
				imgsrc: 'https://www.nasa.gov/sites/default/files/styles/full_width_feature/public/thumbnails/image/potw1929a.jpg',
				src: 'https://www.nasa.gov/image-feature/goddard/2019/hubble-snaps-a-galactic-potpourri-of-particles',
				des: '哈勃望远镜拍摄了一个颗粒状的银河百花香',
				html: false
			}, {
				imgsrc: 'https://www.nasa.gov/sites/default/files/styles/full_width_feature/public/thumbnails/image/potw1931a.jpg',
				src: 'https://www.nasa.gov/image-feature/goddard/2019/hubble-catches-2-galaxies-at-play',
				des: '在这张照片中发挥作用的这对奇怪的发光生物实际上是星系 - 数百万颗恒星的领域。',
				html: false
			}, {
				imgsrc: 'https://www.nasa.gov/sites/default/files/styles/full_width_feature/public/thumbnails/image/potw1930a.jpg',
				src: 'https://www.nasa.gov/image-feature/goddard/2019/hubble-traces-a-galaxy-s-outer-reaches',
				des: '哈勃追踪银河系的外部空间，NGC 3432星系',
				html: false
			}, {
				imgsrc: 'https://www.nasa.gov/sites/default/files/styles/full_width_feature/public/thumbnails/image/iss060e020144.jpg',
				src: 'https://www.nasa.gov/mission_pages/station/images/index.html',
				des: '俄罗斯进步73再补给船接近国际空间站的Pirs对接舱',
				html: false
			}]
		}
	},
	components: { Banner }
}
</script>

<style scoped>
.main {
	height: 100%;
	display: flex;
	flex-wrap: wrap;
}
.main dd {
	flex: 0 0 50%;
	width: 50%; height: 50%;
	padding: 20px;
	box-sizing: border-box;
}
</style>