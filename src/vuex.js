import Vue from 'vue'
import Vuex from 'vuex'
// import * as types from './mutation.js'	// mutation.js'本来的内容如下三行 👇
// export const SET_CITY = 'SET_CITY'
// export const SET_COUNT = 'SET_COUNT'
// export const SET_DAY = 'SET_DAY'

Vue.use(Vuex)

let types = {
	SET_CITY: "SET_CITY",		// 设置城市名称
	SET_COUNT: "SET_COUNT",		// 设置总数
	SET_DAY: "SET_DAY"			// 设置日期
}

export default new Vuex.Store({
	state: {		// 全局状态数据
		count: 3,
		year: '2019-07-10',
		tip: '哦欸后',
		city: '深圳南山',
        ynll: [
          { name: 'LCT', nl: 9.8, done: true },
          { name: 'XYX', nl: 11.7, done: false },
          { name: 'JZH', nl: 11.8, done: true },
          { name: 'ZZM', nl: 11.5, done: true },
          { name: 'CYH', nl: 6.8, done: false }
        ],
        fruit: [
        	{ is: '苹果🍎', price: 12.8, season: '秋季', from: '海南' },
        	{ is: '香蕉🍌', price: 2.8, season: '秋季', from: '海南' },
        	{ is: '葡萄🍇', price: 16.8, season: '夏季', from: '海南' },
        	{ is: '西瓜🍉', price: 3, season: '夏季', from: '菲律宾' },
        	{ is: '桃子🍑', price: 4.5, season: '春季', from: '菲律宾' }
        ]
	},
	getters: {		// 相当于 store 的计算属性，可写一些方法对 state 里面的数据进行过滤
		// zong (state) { return `current count is ${state.count}` },	// es5 的写法
		zong: state => `current count is ${state.count}`,				// es6 的写法

		donell: state => state.ynll.filter(todo => todo.done),			// 过滤出已完成的
		youen: state => {
			return state.ynll.filter(todo => todo.nl > 10)				// 过滤出 nl 大于 10 的
		},

		// 过滤出夏季水果，在 vue 组件里调用时，可通过属性访问
		summer: state => state.fruit.filter(fruit => fruit.season === '夏季'),

		// 过滤出产自海南的水果，在 vue 组件里调用时，可通过属性访问
		hainan (state) {
			return state.fruit.filter(f => f.from === '海南')
		},

		// 应通过方法访问，每次访问都会去进行调用，而不会缓存结果
		dijia: (state) => (l, h) => {		// 可传参数
			return state.fruit.filter(f => f.price >= l && f.price <= h)
		},

		dijiacont: (state, getters) => {	// Getter 也可以接受其他 getter 作为第二个参数
			return getters.dijia.length
		}
	},
	mutations: {	// 需用通过这里面的方法来修改全局状态数据，mutation 必须是同步函数
		add (state) {			// 不传参
			state.count++
		},
		less (state) {			// 不传参
			state.count--
		},
		lessx (state, x) {		// 简单传参，参数是一个数字
			state.count -= x
		},
		addx (state, arg) {		// 灵活传参，参数是一个对象
			state.count += arg.num
		},
		addsg (state, f) {		// 添加水果，f 是一个对象
			state.fruit.push(f)
		},
		dayin () {
			console.log("纯粹测试")
		},
		tishi (state) {
			state.tip = "今天是 2019年7月11日"
			console.log(state.tip)
		},
        setCity (state, n) {
            state.city = n
        },
		[types.SET_DAY] (state, day) {	// 使用 mutation.js 中的常量作为 Mutation 事件类型
			state.year = day
		}
	},
	actions: {		// 一些业务逻辑，这里可以是异步的，而上面的 mutations 必须是同步的
		runDayin (context) {				// 不带参数
			// 调用上面的 dayin 方法
			context.commit('dayin')
		},
		runLessx (context, num) {			// 并且传参
			console.log(context)
			context.commit('lessx', num)
		},
		runTishi ({commit, getters}) {		// 解构参数，取 context 中的 commit 和 getters 方法
			console.log(getters.zong)
			commit('tishi')
		},
		runSetCity ({commit, state}, org) {		// 解构参数，并且传参
			commit('setCity', org)
			console.log(state.city)
		},
		async getdata (context) {
			return [1, 2, 3, 4, 5]
		}
	}
})
