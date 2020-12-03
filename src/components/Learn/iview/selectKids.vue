<template>
	<div class="wrap"><br>
		<div>级联选择器：不同级别只能单选</div> <br> <hr> <br>
		<Collapse style="width: 400px;">
			<template v-for="item of navList">
				<Panel v-if="item.children" :key="item.id">
					<Checkbox v-model="item.checked" @on-change="yiji(item)" @click.stop.native>
						<span>{{item.label}}</span>
					</Checkbox>
					<div slot="content">
						<ul class="liets">
							<li v-for="list of item.children" :key="list.id">
								<div class="group">
									<div class="zuo">
										<Checkbox v-model="list.checked" @on-change="erji({parent:item, self:list})">
										{{list.label}}</Checkbox>
									</div>
									<div class="you">
										<template v-for="dl of list.son">
											<Checkbox v-model="dl.checked" :key="dl.id" @on-change="sanji({parent:item, middle:list, self: dl})">
											{{dl.label}}</Checkbox>
										</template>
									</div>
								</div>
							</li>
						</ul>
					</div>
				</Panel>
			</template>
			<p class="nodata" v-if="!navList.length">先请求数据</p>
		</Collapse><br>
		<div class="btns">
			<Button type="primary" @click="getData">请求数据</Button>
			<Button type="primary" @click="getChecked">获取勾选</Button>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
export default {
	name: 'checkbox',
	data () {
		return {
			navList: []
		}
	},
	created () {},
	methods: {
		getData () {
			let res = [{
				id: 1,
				label: "用户管理",
				children: [
					{id: 10, label: "列表"},
					{id: 11, label: "用户", son: [{id: 110, label: "删除"}]}
				]
			}, {
				id: 2,
				label: "系统管理",
				children: [
					{id: 20, label: "接口管理"},
					{id: 21, label: "导航管理", son: [{id: 210, label: "角色删除"}]}
				]
			}]
			
			this.navList = this.addMark(res)
		},
		addMark (arr) {		// 给每个数据添加一个 checked 属性，以便每一个复选框 v-model 绑定它
			arr.forEach(item => {
				item.checked = false;

				if (item.children) {
					item.children.forEach(p => {
						p.checked = false;

						if (p.son) p.son.forEach(k => { k.checked = false; })
					})
				}

				if (item.son) item.son.forEach(h => { h.checked = false; })
			})
			return arr
		},
		yiji (dataNode) {
			let me = dataNode.checked;
			// 父级勾选状态决定子级状态
			// 父子可能有三级，dataNode > children > son , 对应一级导航 > 二级导航 > 功能节点
			if (dataNode.children) {
				dataNode.children.forEach(node => {
					node.checked = me
					if (node.son) {
						node.son.forEach(item => { item.checked = me })
					}
				})
			}
			// 父子可能只有两级，dataNode > son , 对应一级导航 > 功能节点
			if (dataNode.son) {
				dataNode.son.forEach(node => {
					node.checked = me
				})
			}
		},
		erji ({parent, self}) {
			if (self.checked) {
				parent.checked = true;	// 自己勾选，父级也需要勾选
			}

			let me = self.checked;
			if (self.son) {
				self.son.forEach(node => {
					node.checked = me 	// 自己勾选或取消，子级也勾选或取消
				})
			}
		},
		sanji ({parent, middle, self}) {
			if (self.checked) {
				parent.checked = middle.checked = true;	// 自己勾选，父级也需要勾选
			}
		},

		// 获取勾选项
		getChecked () {
			let ch = []
			this.navList.forEach(mm => {
				if (mm.checked) ch.push(mm.id)
				if (mm.children) {
					mm.children.forEach(pp => {
						if (pp.checked) ch.push(pp.id)
						if (pp.son) {
							pp.son.forEach(zz => {
								if (zz.checked) ch.push(zz.id)
							})
						}
					})
				}
				if (mm.son) {
					mm.son.forEach(ii => {
						if (ii.checked) ch.push(ii.id)
					})
				}
			})
			console.log(ch)
			return ch.toString();
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
	ul.liets {
		li { padding: 12px 0; }
		li +li { border-top: 1px solid #ddd; }
		li .group {
			display: flex;

			.zuo {
				flex: 0 0 180px;
			}
			.you {
				flex: 1 1 auto;
			}
		}
	}
	.nodata {
		text-indent: 1em;
		line-height: 34px;
		color: #999;
		background-color: #ECF4FD;
	}
</style>
