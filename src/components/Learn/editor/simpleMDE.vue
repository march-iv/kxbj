<template>
	<div class="wrap"><br>
		<div>简单MD文本编辑器。</div> <br> <hr> <br>
		<p>资料： 
			① <a href="https://github.com/sparksuite/simplemde-markdown-editor" target="_blank">github</a>(8k★) ，
			② <a href="https://simplemde.com/" target="_blank">官网</a>
		</p>
		<br>
		<div id="demo" style="width: 800px; height: 400px;">
			<textarea id="smde">![Yes](http://dwz.date/c3GJ) <br> [谷歌](https://google.com).</textarea>
		</div>
		<br><br>
		<p>更多编辑器： 
			<a href="https://github.com/benweet/stackedit"  target="_blank">benweet/stackedit</a> ，
			<a href="https://github.com/surmon-china/vue-quill-editor"  target="_blank">vue-quill-editor</a>
		</p>
	</div>
</template>

<script>
import SimpleMDE from 'simplemde'
import 'simplemde/dist/simplemde.min.css'

export default {
	name: 'simpleMDE.vue',
	data () {
		return {}
	},
	mounted () {
		new SimpleMDE({
			element: document.querySelector("#smde")
		});
	}
}
</script>

<style lang="scss" scoped>
.wrap {
	line-height: 2;
	padding: 0 1em;
	font-size: 16px;
}
span.link {
	color: blue;
	cursor: pointer;
}
</style>