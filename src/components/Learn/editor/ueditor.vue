<template>
	<div class="wrap"><br>
		<div>百度编辑器</div> <br> <hr> <br>
		<p>百度编辑器 ueditor 官方没有封装 vue 版本, 这里使用了网友封装的vue版本</p>
		<p>ueditor 使用方法见【📕】Npm Yarn Git...md</p><br>
		<div class="yulan" v-html="content"></div>
		<div style="float: left">
			<vue-ueditor-wrap v-model="content" @ready="ueditorReady"
				:destroy="true" :config="ueditorConfig"></vue-ueditor-wrap>
			<br>
			<span class="link">保存</span>
			<span class="link" @click="huo">获取内容</span>
			<span class="link" @click="chun">获取纯文本内容</span>
			<span class="link" @click="jia">追加内容</span>
		</div>
	</div>
</template>

<script>
import VueUeditorWrap from 'vue-ueditor-wrap'

export default {
	name: 'ueditor.vue',
	data () {
		return {
			ueditorConfig: {
				autoHeightEnabled: false,	// 不设置自动高度，防止不出现滚动条
				enableContextMenu: false,	// 取消右键菜单功能
				elementPathEnabled: false,	// 不显示元素路径
				enableAutoSave: false,		// 取消自动保存
				imagePopup: false,			// 关闭图片操作的浮层开关
				imageScaleEnabled: false,	// 关闭调节图先的操作框
				tableDragable: true,		// 表格不能拖动
				initialFrameWidth: 500,		// 初始宽度, 可以为 100%
				initialFrameHeight: 'auto'	// 初始高度, 不能设置 100%
			},
			bdueditor: null,
			content: ''
		}
	},
	components: { VueUeditorWrap },
	methods: {
		ueditorReady (editorInstance) {
			this.bdueditor = editorInstance	// 编辑器对象
			editorInstance.addListener('contentChange', editor => {
				console.log("内容改变")
				this.saved = 'no'
			});
			editorInstance.addListener('focus', editor => {
				console.log("获得焦点")
			});
		},
		huo () {
			let html = this.bdueditor.getContent();
			console.log(html)
			console.log(this.content)
		},
		chun () {
			let str = this.bdueditor.getContentTxt();
			console.log(str)
		},
		jia () {
			this.bdueditor.setContent('<p>new text</p>', true);
		}
	}
}
</script>

<style lang="scss" scoped>
	.wrap {
		padding: 0 1em;
		font-size: 16px;
		overflow: hidden;
	}
	.yulan {
		float: left;
		width: 500px; height: calc(100vh - 345px);
		box-sizing: border-box;
		padding: 10px;
		margin-right: 20px;
		border: 1px solid #ddd;
		>>> img, video, iframe {
			max-width: 100%;
		}
	}
	
	>>> .edui-editor-iframeholder {	// 设置编辑器的高度
		height: calc(100vh - 600px);
		min-height: 300px;
	}
</style>