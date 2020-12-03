<template>
	<div class="wrap"><br>
		<div>级联选择器： 懒加载，默认勾选</div> <br> <hr> <br>
		<p>因为懒加载的第二级数据是点击第一级数据后请求的，所以，如果要默认勾选第二级数据，需要先请求第二级数据；</p>
		<p>要实现勾选，需要先有层级数据，然后设置绑定值才行；</p>
		<p>
			懒加载会在初始化时先请求第一级的数据，所以可以实现默认勾选， <br>
			然后请求第二级的数据后，如果有勾选的，在请求数据返回后，先清空级联的绑定数据，再赋值，实现第一、二级的自动勾选。
		</p> <br>
		<el-cascader v-model="davf" :props="props" :show-all-levels="false"></el-cascader> {{davf}} <br> <br>
		<ul>
			<li>注意，级联多级多选的值是这样的 [ [A, B], [B, B1] ]，表示第一级选择了2个选项A和B，第二级选择了1个，在 B 下面的 B1 </li>
			<li>做本例实验，要先在控制台获取第一级的 visit_count 数据，然后获取第二级的 visit_count 数据，然后填到第57行，刷新，级联点到第二级</li>
			<li>注意第二级的数据和第一级数据是父子关系</li>
		</ul>
	</div>
</template>

<script>
import { mediaService } from '@/request'

export default {
	name: 'lazy.vue',
	data () {
		return {
			resData: [],
			davf: null,
			pageCurr: 1,

			props: {
				lazy: true,
				multiple: true,			// 是否可多选
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
							limit: 3,
							tab: 'good',
							mdrender: true
						}
						mediaService.topicArticle(params).then(res => {
							this.resData = res.data;
							res.data.forEach(item => {
								item.label = item.title.slice(1, 8)
								item.value = item.visit_count
								item.leaf = !item.top || this.pageCurr > 5	// leaf 为 false 时表示它还有子级
							})
							this.davf = null
							setTimeout(() => {
								this.davf = [["26131"], ["12216", "2849"]]
								// this.davf = [["第一级的 visit_count A "],[ "第一级的 visit_count B ", "B第二级的 visit_count B1 " ]]
							}, 0)
							resolve(res.data);
						})
					}
				}
			}
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