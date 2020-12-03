<template>
	<div class="wrap"><br>
		<div>级联选择器：逐级加载，可选择任意一级</div> <br> <hr> <br>
		<p>逐级加载函数是放在 props 里的，请求的数据会自动存放到 options ，已请求过的数据不会再次请求。</p>
		<p>逐级加载函数不是自己写在节点选中触发函数里的，虽然这样也行，但要确保把请求后的数据放到对应的 options 的结构中。</p>
		<p>
			逐级加载 + 可选择任意一级的前提下，此组件设计的有缺点，表现为：
			<ul>
				<li>勾选文字左边的◯或☑时，不会请求下一级，但下一级的面板会显示，提示暂无数据，因为没有请求数据；</li>
				<li>点击文字，不会勾选左边的◯或☑，只会请求下一级数据；</li>
			</ul>
		</p>
		<br>

		<!-- popper-class: 自定义浮层类名 -->
		<!-- show-all-levels: 输入框中是否显示选中值的完整路径 -->
		<el-cascader v-model="davf"
			:popper-class="'AAA'"
			:props="props" :show-all-levels="false"></el-cascader>

		<br><br><hr><br>

		<p>通过使用 domAPI 处理修正后，可以点击文字的时候，既能请求下一级，又可以选择◯或☑，<br>
		但点击◯或☑的问题还在，这时，通过改变样式，把文字的div覆盖到◯或☑上，点击它相当于点击文字，解决，如下：</p><br>
		<el-cascader v-model="davf"
			:popper-class="'BBB'" @change="setAgain"
			:props="props" :show-all-levels="false"></el-cascader>
		<span class="link"> 勾选结果</span> {{davf}}
	</div>
</template>

<script>
import { mediaService } from '@/request'

export default {
	name: 'moving.vue',
	data () {
		return {
			pageCurr: 1,
			davf: null,
			props: {
				lazy: true,	// 是否启动动态加载
				multiple: false,		// 是否可多选
				checkStrictly: true,	// 是否严格的遵守父子节点不互相关联，表现为可以选择任意一层级节点
				lazyLoad: (node, resolve) => {
					const { level } = node;

					if (node.data && node.data.leaf) {
						let nodes = [{ value: [], label: 'no', leaf: true }]
						resolve(nodes);
						// console.log("已经没有下级了")
					} else {
						let params = {
							page: this.pageCurr++,
							limit: 3
						}
						mediaService.topicArticle(params).then(res => {
							res.data.forEach(item => {
								item.label = item.title.slice(1, 8)
								item.value = item.visit_count
								item.leaf = !item.top || this.pageCurr > 5	// leaf 为 false 时表示它还有子级
							})
							setTimeout(() => { this.setHand() }, 300)
							resolve(res.data);
						})
					}
				}
			}
		}
	},
	mounted () { },
	methods: {
		setHand () {
			document.querySelectorAll(".BBB .el-cascader-node__label").forEach(el => {
				el.onclick = function () {
					if (this.previousElementSibling) this.previousElementSibling.click();
				};
			});
		},
		setAgain () {
			setTimeout(() => { this.setHand() }, 300)
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
	ul {
		color: #999;
		line-height: 1.6;
	}
	span.link {
		color: blue;
		cursor: pointer;
	}

	.BBB .el-radio {
		position: absolute;
	}
	.BBB .el-cascader-node__label {
		position: relative;
		padding-left: 24px;
		z-index: 2;
	}
</style>