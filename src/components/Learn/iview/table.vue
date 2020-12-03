<template>
	<div class="wrap"><br>
		<div>表格：自定义表头，自定义表格内容，表格自定义排序，表格默认排序。 <span class="link" @click="exportFile">导出表格</span></div>
		<br> <hr> <br>
		<div v-loading="geting" class="tableWrap">
			<Table border :columns="ths" v-if="trs.length" :data="trs" stripe
				@on-filter-change="handleFilterChange"
				@on-sort-change="handleSortChange" >
				<!-- 示例：最后一列使用 slot 设置内容 -->
			        <template slot-scope="{ row }" slot="caozuo">
			            <div>
			                <a href="javascript:;" title="查看"><i class="el-icon-view"> </i></a>
			                <a href="javascript:;" title="分享"><i class="el-icon-share"></i></a>
			            </div>
			        </template>
			</Table>
			<Page :current="page.curr" :page-size="page.limit" :total="page.total"
				@on-change="changePage" @on-page-size-change="changeLimit"
				show-total show-elevator show-sizer />
		</div>
	</div>
</template>

<script>
import axios from "axios"

export default {
	name: "iviewTable",
	data () {
		return {
			geting: false,
			sort: "asc",
			type: 'share',	// 'share'-分享, 'ask'-询问, 'job'-求职, 'good'-美食
			types: { 'share': '分享', 'ask': '询问', 'job': '求职', 'good': '美食' },
			ths: [
				{ title: '序号', align: 'center', width: '80px', type: 'index' },
				{	// 作者
					title: '作者', align: 'center', width: '140px',
					render: (h, params) => {	// 示例： 此列的内容使用 render 来设置
						return h("b", {}, params.row.author.loginname)
					}
				},
				{	// 文章标题
					title: '文章标题',
					key: 'title',
					ellipsis: true,		// 开启后，文本将不换行，超出部分显示为省略号
					tooltip: true,		// 启后，文本将不换行，超出部分显示为省略号，并用 Tooltip 组件显示完整内容
					renderHeader: (h, params) => {
						return h('span', {}, '文章标题（' + this.types[this.type] + '类）')
					},
					filters: [
						{label: '分享', value: 'share'},
						{label: '询问', value: 'ask'},
						{label: '求职', value: 'job'},
						{label: '美食', value: 'good'}
					],
					filterMultiple: false,	// false-单条件过滤, true-条件过滤
					// filterMethod (value, row) {}	// 本地过滤
					filterRemote (value) {	// 远程过滤
						console.log(value)
						this.type = value[0]
					}
				},
				{	// 置顶
					title: '置顶',  width: '120px', align: 'center',
					// key: 'top',
					render: (h, params) => {
						let str, color
						switch (params.row.top) {
							case true: 
								str = '置顶'
								color = '#F7494D';
								break;
							case false:
								str = '常规'
								color = '#50CE53'
								break;
						}
						return h('span', {	// 示例： 给 render 设置元素添加类名、样式和属性
							style: {color: color, cursor: 'pointer'},
							class: ['gebaini'],
							domProps: {title: '是否置顶'},
							on: { click: () => { console.log(params) } }
						}, str)
					}
				},
				{	// 置顶状态
					title: '置顶状态', align: 'center', width: '160px',
					render: (h, params) => {	// 这里使用 render ，也可以使用 solt
						return h('i-switch',
							{
								props: {
									size: 'large',
									value: params.row.top 	// 控制 switch 的开关状态
								},
								style: { borderColor: 'green' },
								on: {
									"on-change": value => {
										params.row.top = value
									}
								}
							}, [
								h('span', {slot: 'open'}, '开启'),
								h('span', {slot: 'close'}, '关闭')
							]
						)
					}
				},
				{	// 阅读量
					align: 'center', width: '120px', key: 'visit_count',
					renderHeader: (h, params) => {	// 示例： 标题使用 renderHeader 渲染，并给标题设置事件
						return h("b", {
							style: { cursor: "pointer" },
							on: {
								click: () => {
									if (this.sort === "asc") {	// 升序
										this.trs.sort((a, b) => a.visit_count > b.visit_count ? 1 : -1)
										this.sort = "desc"
									} else if (this.sort === "desc") {	// 降序
										this.trs.sort((a, b) => a.visit_count > b.visit_count ? -1 : 1)
										this.sort = "asc"
									}
								}
							}
						}, "阅读量 " + (this.sort === "asc" ? ' ↑' : ' ↓'))
					}
				},
				{	// 回复量
					title: '回复量', key: 'reply_count', align: 'center', width: '120px',
					sortable: true,		// 如果希望使用远程排序，则应设置为 "custom"
					// sortType: '',	// 默认排序方式, asc-升序, desc-降序
					sortMethod: (a, b, type) => {	// 示例： 指定排序函数
						if (type === 'asc') {
							return a > b ? -1 : 1
						} else {
							return a > b ? 1 : -1
						}
					}
				},
				{	// 创建时间
					title: '创建时间', align: 'center',
					render: (h, params) => {
						return h("span", {
							style: {color: 'blue'}
						}, params.row.create_at)
					},
					sortable: true,		// 开启排序功能，默认使用升序和降序排序
					sortMethod: (a, b, type) => {	// 示例： 指定排序函数
						if (type === 'asc') {
							return new Date(a).getTime() > new Date(b).getTime() ? -1 : 1
						} else {
							return new Date(a).getTime() > new Date(b).getTime() ? 1 : -1
						}
					}
				},
				{
					title: '内容简介', key: 'des', align: 'center',
					render: (h, params) => {
						return h('Tooltip', {
							props: {
								content: params.row.des
							}
						}, params.row.des)
					}
				},
				{	// 操作
					title: '操作', align: 'center', width: '120px',
					slot: 'caozuo'	// 这里有个slot
				}
			],
			trs: [],
			page: {curr: 1, limit: 10, total: 1000}
		}
	},
	created () {
		this.getDate()
	},
	methods: {
		getDate () {
			let params = {
				page: this.page.curr,	// 当前页码
				limit: this.page.limit,	// 每页数量
				tab: this.type,			// 咨询类型,
				mdrender: false			// 是否渲染 MD 文本
			}
			this.geting = true
			axios.get('https://cnodejs.org/api/v1/topics', {params}).then((res) => {
				this.trs = res.data.data
			}).finally(res => {
				this.geting = false
			})
		},
		handleFilterChange () {
			this.page.curr = 1
			this.getDate()
		},
		handleSortChange () {
			console.log('远程排序重新请求数据')
			// 如果希望使用远程排序，那么 sortable 应设置为 "custom"
		},
		changePage (num) {
			this.page.curr = num
			this.getDate()
		},
		changeLimit (size) {
			this.page.limit = size
			this.getDate()
		},
		exportFile () {
			let params = {
				page: this.page.curr,	// 当前页码
				limit: this.page.limit,	// 每页数量
				tab: this.type,			// 咨询类型,
				mdrender: false			// 是否渲染 MD 文本
			}
			axios.get('https://cnodejs.org/api/v1/topics', {
				params: params
				// responseType:'blob'	// 如果返回的是二进制数据，则需要这个声明
			}).then((res) => {
				let cont = res.data.data.map((item, idx) => {
					return "(" + idx + ") " + item.title + '\n'
				})
					cont += '\n\n' + '每行开头都有一个逗号，是因为数组项之间有逗号，先这样吧，问题不大'

				let blob = new Blob([cont]) // 创建 blob 对象
				let link = document.createElement("a") // 创建超链接
					link.download = 'table' + new Date().formatIntl() + '.csv' // 超链接下载文件名字
					link.href = URL.createObjectURL(blob) // 文件路径
					link.click()

				URL.revokeObjectURL(blob); // 释放 URL 对象
			})
		}
	}
}
</script>

<style lang="scss" scoped>
	.wrap {
		line-height: 2;
		font-size: 16px;
	}
	.tableWrap {
		min-height: 400px;
		width: 98%;
		margin-left: 1%;
		background-color: #f9f9f9;
	}
	.table >>> .ivu-table {
		width: 100%;
	}
	// >>> .ivu-table table {	// iview 表格自适应问题修复使用，防止表格宽度会自动持续增大
	// 	width: 100% !important;
	// 	table-layout: fixed;
	// 	td { width: 100% !important; }
	// }
	.ivu-page {
		padding-top: 26px;
		text-align: right;
		background-color: #fff;
	}
</style>