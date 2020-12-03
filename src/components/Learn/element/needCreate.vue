<template>
	<div class="wrap"><br>
		<div>级联选择器：按需创建级联</div> <br> <hr> <br>
		<p>官方给的例子，是打开页面，自动请求懒加载的第一级，然后点击第一级自动选择下一级，现在我们需要按需开始进行懒加载</p>
		<p>思路就是在满足条件之后，再开始渲染此组件</p>
		<p>重新渲染级联组件要重置三件事：重置请求条件为初始，更改key，清空级联选择的数据</p>
		<br><br>

		<el-cascader v-model="davf" v-if="show"
			@change="chose" ref="refHandle"
			:props="props" :show-all-levels="false" :key="key">
		</el-cascader>

		先点击: <span class="link" @click="showit">GO</span> <br><br>
		重新渲染：<span class="link" @click="agin">重新渲染</span>
	</div>
</template>

<script>
import { mediaService } from '@/request'

export default {
	name: 'needLoad.vue',
	data () {
		return {
			pageCurr: 1,
			key: 1,
			show: false,
			davf: null,

			props: {
				lazy: true,
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
								item.leaf = !item.top || this.pageCurr > 5
							})
							resolve(res.data);
						})
					}
				}
			}
		}
	},
	mounted () {
	},
	methods: {
		showit () {
			this.show = true
		},
		agin () {
			this.pageCurr = 1
			this.key++
			this.davf = null
		},
		chose () {
			//  选择后收起下拉
			this.$refs.refHandle.dropDownVisible = false;
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
</style>