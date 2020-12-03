<template>
	<div class="body">
		<h4># VueB.vue</h4>

		<p>store 中 count 为：{{count}}</p>
		<p>今年的日期是：{{year}}</p>

		<b>Mutations：</b>
		<span @click="doAdd">加1</span> == <span @click="add">加1</span> |
		<span @click="doLessx">减2</span> == <span @click="lessx(2)">减2</span> |
		<span @click="addx({id: 2, num: 3})">addx</span>
		<span @click="typeAdd">加2</span>
		<span @click="SET_DAY('2010-10-10')">SET_DAY</span> <br>

		<b>Actions：</b>
		<span @click="getd">getd</span>
		<span @click="runLessx(3.3)">runLessx</span>
		<span @click="runTishi">runTishi</span> |
		<span @click="runSetCity">runSetCity</span>

		<hr>

		<p>她们的名字是：</p>
		<ul><li v-for="(list, index) in youen" :key="index">{{list.name}}</li></ul>

		<hr>
		
		<p>全部的水果：<a v-for="(sg, idx) in fruit" :key="idx"> {{sg.is}} </a></p>
		<p>添加水果：
			<span @click="addsg({is: '樱桃🍒', price: 39.8, season: '夏季', from: '海南'})">🍒</span>
			<span @click="addsg({is: '芒果🍋', price: 7.8, season: '夏季', from: '泰国'})">🍋</span>
		</p>
		<p>夏季水果是：</p>
		<ul><li v-for="(sg, idx) in summer" :key="idx">{{sg.is}}，价格：{{sg.price}} 元每斤</li></ul>
		<p>价格为 3 - 10 元的水果是（共 {{dijiacont}} 种）:</p>
		<ul><li v-for="(sg, idx) in dijia" :key="idx">{{sg.is}}</li></ul>
		<p>来自海南的水果是</p>
		<ul><li v-for="(sg, idx) in hainan" :key="idx">{{sg}}</li></ul>
	</div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
	computed: {
		count () {	// （A/E）通过属性访问 state
			return this.$store.state.count
		},
		...mapState(['fruit']),	// （B/E）通过 mapState([]) 访问 state
		...mapState({			// （C/E）通过 mapState({}) 访问 state
			year: state => state.year + ' ☀'
		}),

		summer () {	// (1/4)通过属性访问 getters
			return this.$store.getters.summer
		},

		dijia () {	// (2/4)通过方法访问 getters，可传参
			return this.$store.getters.dijia(3, 10)
		},

		// (3/4) 通过 ...mapGetters([]) 访问 getters
		// ...mapGetters(['youen', 'hainan', 'dijiacont'])

		// (4/4)通过 ...mapGetters({}) 访问 getters，方便将 getter 属性重新取名字
		...mapGetters({
			youen: 'youen',
			hainan: 'hainan',
			dijiacont: 'dijiacont'
		})
	},

	// computed: mapState({	// (D/E) 通过 computed:mapState({}) 访问 state
	// 	nian: state => state.year,
	// 	countAlias: 'count',
	// 	after (state) {	// 这里必须写成常规函数，以便 this 获取局部状态
	// 		return state.count + this.num
	// 	}
	// }),

	// (E/E) 通过 computed:mapState([]) 访问 state
	// computed: mapState(['count', 'year']),

	methods: {
		// (1) 使用 store.commot ，简单提交，无需传参
		doAdd () {
			this.$store.commit('add')
		},
		// (2) 使用 store.commot，简单传参
		doLessx () {
			this.$store.commit('lessx', 2)
		},
		// （3）使用 store.commot，使用对象形式传参
		// addx () { this.$store.commit('addx',{num: 3}) },
		// 或者不写这个，直接在 HTML 内写 <span @click="addx({id: 2, num: 3})">加三</span>
		// (4) 使用 store.commot，使用对象形式传参，包含 type 属性
		typeAdd () {
			this.$store.commit({
				type: "addx",
				num: 2,
				more: '...'
			})
		},
		// (5) 使用 ...mapMutations 将函数映射到 methods
		// 这样映射进来，就相当于在 methods 写了这些函数，就可以直接在 html 上用 @lick 调用了
		...mapMutations(['add', 'addx', 'lessx',  'addsg', 'SET_DAY']),
		...mapMutations({
			okadd: 'add'	// 改个名字
		}),

		// (1) 通过 store.dispatch 方法触发 store.action 中的函数
		runSetCity () {
			// this.$store.dispatch('runSetCity', '厦门市✈')
			// this.$store.dispatch('runSetCity', {
			//   cityname: '南昌',
			//   id: 69
			// })
			this.$store.dispatch({
				type: 'runSetCity',
				cityname: '南昌',
				id: 69
			})
		},
		async getd () {
	      var res = await this.getdata()
	      console.log(res)
	    },

	    // （2）使用 ...mapActions，将函数映射到 methods，就相当于在 methods 写了这些函数
		...mapActions(['runDayin', 'runLessx', 'runTishi', 'getdata']),
		...mapActions({
			okayrunDayin: 'runDayin'	// 改个名字
		})
	}
}
</script>

<style scoped>
.body {
	border: 1px solid #ddd;
	margin: 20px;
	padding: 20px;
}
span {
	color: blue;
	margin: 10px;
	cursor: pointer;
}
</style>
