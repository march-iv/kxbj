<template>
	<div class="wrap">
		<div><h5>这里演示了组件的基本用法</h5></div>
		<div :class="{active: $route.query.cell == 1}">
			<div class="ttss">
				<Apple></Apple> <br>
				<p>一个纯天然的苹果组件，没有任何修饰</p>
			</div>
		</div>
		<div :class="{active: $route.query.cell == 2}">
			<div>
				<Fruit :icon="'icontiangua1'" :iconsize="'100px'" :iconcolor="'#DF3447'"></Fruit>
				<p>通过引用组件时提供参数，指定水果的种类、颜色和大小</p>
			</div>
		</div>
		<div :class="{active: $route.query.cell == 3}">
			<div>
				<Strawberry @trigger="gettime($event)"></Strawberry><br>
				<p><span class="link" @click="gettime">获取时间</span>{{time}}</p>
			</div>
		</div>
		<div :class="{active: $route.query.cell == 4}">
			<div>
				<Mango ref="refmango"></Mango> <br>
				<p><span class="link" @click="mangoDence">点击调用</span></p>
			</div>
		</div>
	</div>
</template>

<script>
import Apple from '@/components/Learn/fruit/apple'
import Fruit from '@/components/Learn/fruit/fruit'
import Strawberry from '@/components/Learn/fruit/strawberry'
import Mango from '@/components/Learn/fruit/mango'

export default {
	data () {
		return {
			time: ''
		}
	},
	components: { Apple, Fruit, Strawberry, Mango },
	created () {
		console.log(this.$route.query)
	},
	methods: {
		doit (res) {
			console.log(res)
		},
		gettime (arg) {
			console.log(arg)
			this.time = '：' + new Date().toLocaleString()
			this.time += (arg.constructor === String ? "「草莓时间」" : '')
		},
		mangoDence: function (e) {
			this.$refs.refmango.tiao();
		}
	}
}
</script>

<style scoped>
.wrap {
	display: flex;
	height: 500px; width: 900px;
	flex-wrap: wrap;
	margin: 50px 0 0 50px;
	border: 1px solid #ddd;
}
.wrap > div {
	flex: 1 1 49%;
	height: 225px;
	padding: 10px;
	box-sizing: border-box;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	text-align: center;
}
.wrap > div.active {
	animation: flicker 220ms linear 3;
}
@keyframes flicker {
	0% {background-color: transparent}
	50% {background-color: blanchedalmond}
	100% {background-color: transparent}
}
.wrap > div:first-child {
	flex: 1 1 100%;
	height: 50px;
	border-bottom: 1px solid #ddd;
}
.wrap div + div + div + div {
	border-top: 1px solid #ddd;
}
.wrap > div:nth-child(2n) {
	border-right: 1px solid #ddd;
}

.ttss >>> #name {
	color: red;
}
</style>