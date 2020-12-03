<template>
	<div class="wrap"><br>
		<div>github 地址：<a href="https://github.com/zenorocha/clipboard.js" target="_blank">zenorocha/clipboard.js</a>
		</div> <br> <hr> <br>
		<div>
			点击复制 👉 <span class="clipboardBtn" :data-clipboard-text="'明天梭哈，满仓干！'">明天梭哈，满仓干！</span>
		</div>
	</div>
</template>

<script>
import Clipboard from 'clipboard'

export default {
	name: 'clipboard.vue',
	data () {
		return {}
	},
	mounted () {
		let fuzhi = new Clipboard('.clipboardBtn');
		fuzhi.on('success', () => {
			this.$Message.success("文章链接已复制到剪切板")
		});
	}
}
</script>

<style lang="scss" >
	.wrap {
		line-height: 2;
		font-size: 16px;
	}
	.clipboardBtn {
		color: blue;
		cursor: pointer;
	}
</style>