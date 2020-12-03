<template>
	<div class="wrap"><br>
		<div>github 地址：<a href="https://github.com/soldair/node-qrcode" target="_blank">soldair/node-qrcode</a>
		</div> <br> <hr> <br>
		<div>
			<p>「今天零食吃的有点多」转 canvas 类型二维码 ↓</p>
	    	<canvas id="canvas" style="border: 1px solid #ddd;"></canvas>
	    </div><br>
	    <div>
			<p>「今晚吃鸡，大吉大利」转 data:image 类型二维码 ↓</p>
	    	<div id="qrcodediv" :style="{backgroundImage: 'url(' + imgurl + ')'}"></div>
	    </div>
	</div>
</template>

<script>
import QRCode from 'qrcode'

export default {
	name: 'qrcode.vue',
	data () {
		return {
			imgurl: ''
		}
	},
	mounted () {
		QRCode.toCanvas(document.querySelector("#canvas"), '今天零食吃的有点多', function (error) {
			if (error) console.error(error)
			console.log('success!');
		})
		QRCode.toDataURL('今晚吃鸡，大吉大利').then(url => {
			this.imgurl = url
		})
	}
 }
</script>

<style lang="scss" scoped>
	.wrap {
		line-height: 2;
		padding: 0 1em;
		font-size: 16px;
	}
	#qrcodediv {
		display: block;
		width: 148px; height: 148px;
		border: 1px solid #ddd;
		background-position: center;
		background-size: cover;
		background-repeat: no-repeat;
	}
</style>