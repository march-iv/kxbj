<template>
	<div class="wrap"><br>
		<div>wang编辑器：演示</div> <br> <hr> <br>
		<div id="editorElem"></div>
	</div>
</template>

<script>
import Editor from "wangeditor"
export default {
	name: 'ueditor.vue',
	data () {
		return {
			saved: '',
			article: ''
		}
	},
	mounted () {
		this.creataEditor()
	},
	methods: {
		creataEditor () {	// 创建文本编辑器
			this.wangEditor = new Editor("#editorElem");
			// this.wangEditor.customConfig.uploadImgServer = 'http://10.1.0.236:8085'
		    this.wangEditor.customConfig.zIndex = 5
		    this.wangEditor.customConfig.uploadImgShowBase64 = true
			this.wangEditor.customConfig.onchange = (html) => {
				this.saved = 'no';
				this.article = html
			}
			this.wangEditor.create();
		}
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
	/* - - - - - wang文本编辑器 - - - - - */
	#editorElem {
		width: 40vw;
	}
	>>> .ivu-tabs {
		overflow: inherit;	// 防止日期选择框被遮挡
	}
	>>> .w-e-toolbar {
		flex-wrap: wrap;
	}
	>>> .w-e-text-container {
		height: calc(100vh - 420px) !important;
	}
	>>> .w-e-text {
		table { table-layout: fixed; }
		table th {border-bottom: 1px solid #ccc;}
		ol li { list-style: decimal inside; }
		ul li { list-style: disc inside; }
	}
	>>> .w-e-text::-webkit-scrollbar {width: 6px; height: 6px;}
	>>> .w-e-text::-webkit-scrollbar-track {background-color: #ddd;}
	>>> .w-e-text::-webkit-scrollbar-thumb {background-color: #999;}
</style>