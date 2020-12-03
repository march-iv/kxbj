<template>
	<div class="wrap"><br>
		<div>树形控件：逐级加载</div> <br> <hr> <br>
		<p>因为没有可用的接口，所以在函数里写死了两个数组作为模拟请求的数据</p> <br>
		<div class="main">
			<div class="head">
				<span style="text-align: left; text-indent: 3em;">舰船名称</span>
				<span>护盾值</span>
				<span>装甲值</span>
				<span>结构值</span>
			</div>
			<div>
				<el-tree ref="tableTree" class="el-tree-table" node-key="id"
					:load="loadNode" lazy :props="{label: 'name', isLeaf: 'leaf'}" icon-class=" ">
					<div class="table-tree-node" slot-scope="{ node, data }">
						<i class="icon" :class="node.expanded ? 'el-icon-folder-remove' : (!data.leaf ? 'el-icon-folder-add' : 'el-icon-folder')"></i>
						<div class="mz">
							<Tooltip :content="data.name">{{ data.name }}</Tooltip>
						</div>
						<span>{{ data.shield }}</span>
						<span>{{ data.armor }}</span>
						<span>{{ data.fabric }}</span>
					</div>
				</el-tree>
				<el-tree 
  :data="data2" ref="tree"
  show-checkbox
  node-key="id"
  :default-expanded-keys="[2, 3]"
  :default-checked-keys="[260100,440303]"
  :props="defaultProps">
</el-tree>
<el-button @click="getCheckedNodes">通过 node 获取</el-button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'treeLazy.vue',
		data () {
			return {
				res: {
					name: '蝎尾怪级', id: 1, shield: 459, armor: 380, fabric: 250,
					children: [
						{ name: '净化级', id: 11, shield: 369, armor: 460, fabric: 370, children: [] },
						{ name: '猎犬级', id: 12, shield: 440, armor: 360, fabric: 295, children: [] },
						{ name: '纳美西斯级', id: 13, shield: 395, armor: 480, fabric: 360,
						  children: [
						  	{ name: '小鬼级', id: 131, shield: 690, armor: 415, fabric: 390, children: [] }
						  ]
						}
					]
				},
		        defaultProps: {
		          children: 'children',
		          label: 'label'
		        }
		      };
		},
		mounted () {},
		methods: {
			getCheckedNodes () {
				let hasChild = []	// 所有有子级的项
				let resArr = []		// 处理后的数据
		        let arr = this.$refs.tree.getCheckedNodes();
		        	arr.forEach(item => {
		        		if (item.children) hasChild.push(item.id)
		        	})
		        	arr.forEach(item => {
		        		if (hasChild.indexOf(item.parent) === -1) resArr.push(item.id)
		        	})

	        	console.log(resArr)
		      },
			loadNode (node, resolve) {
				if (node.level === 0) {
					// 假设 level1 是请求到的第1级数据
					console.log("加载1级数据")
					let level1 = [ { name: '蝎尾怪级', id: 1, shield: 459, armor: 380, fabric: 250, leaf: false, children: [] } ]
					return resolve(level1)
				} else {
					// 假设 level2 是请求到的第2级数据
					console.log("加载2级数据")
					let level2 = [
						{ name: '净化级', id: 11, shield: 369, armor: 460, fabric: 370, leaf: true, children: [] },
						{ name: '猎犬级', id: 12, shield: 440, armor: 360, fabric: 295, leaf: true, children: [] },
						{ name: '纳美西斯级', id: 13, shield: 395, armor: 480, fabric: 360, leaf: true,
						  children: [ { name: '小鬼级', id: 131, shield: 690, armor: 415, fabric: 390, leaf: true, children: [] } ]
						}
					]
					return resolve(level2)
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
	.main {
		width: 800px;
		min-height: 400px; max-height: 800px;
		overflow: auto;
		border: 1px solid #ddd;
	}
	.main .head {
		display: flex;
		border-bottom: 1px solid #ddd;
		background-color: #f5f8ff;
		span {
			flex: 1 0 25%;
			text-align: center;
		}
	}

	>>> .el-tree-table {
		.el-tree-node__content {
			height: 56px;
   			border-bottom: 1px solid #ddd;
		}
		.table-tree-node {
			display: flex;
			align-items: center;
			width: 100%;
			.icon {
				display: inline-block;
			    vertical-align: middle;
			    font-size: 20px;
			    margin-right: 10px;
			    color: #13c19f;
			}
			span {
				flex: 1 1 100px;
				font-size: 16px;
				text-align: center;
			}
			div.mz {
				flex: 0 0 150px;
				font-size: 16px;
				text-align: left;
				>>> .ivu-tooltip-rel {
					vertical-align: middle;
					max-width: 250px;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				>>>.ivu-tooltip-inner {
					max-width: inherit;
				}
			}
		}
		.el-tree-node__children {	// 二级缩进调整
			div.mz {
				flex: 0 0 130px;
				.ivu-tooltip-rel { max-width: 130px;}
			}
			.el-tree-node__children div.mz {	// 三级缩进调整
				flex: 0 0 100px;
				.ivu-tooltip-rel { max-width: 100px; }
			}
		}
	}
</style>