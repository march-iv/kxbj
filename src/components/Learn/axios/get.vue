<template>
	<div style="padding: 30px;">
		<p>基本操作：<span @click="getNews">网易新闻</span></p>
		<p>使用 async ：<span @click="getTopics">主题首页</span></p>
		<p>多个并发请求：<span @click="bingfa">图片和天气</span></p>
		<p>取消请求：<span @click="shili">axios 实例</span></p>

		<br><hr><br>
		<ul>
			<li v-for="(item, idx) of news" :key="idx">{{item.title}}</li>
		</ul>
	</div>
</template>

<script>
import { mediaService } from '@/request'
import axios from "axios"
import qs from "qs"

export default {
	data () {
		return {
			news: []
		}
	},
	methods: {
		// 基本操作: 获取网易新闻
		getNews () {
			let url = 'https://api.apiopen.top/getWangYiNews'
			let params = {page: 2, count: 8}

			mediaService.getWangYiNews(params).then((res) => {
				console.log('res', res)
				this.news = res
			})

			// axios.get(url, {params})
			// axios.get(url + '?' + qs.stringify(params))

			// 完整配置
            // axios({
            //     method: 'get',
            //     url: url,
            //     timeout: 10000,
            //     params: params
            // }).then((res) => {
            //     console.log(res.config)
            // })
		},

		// 使用 async ：主题首页
		async getTopics () {
			let params = {page: 1, limit: 5, tab: 'share'}
			mediaService.topicArticle(params).then((res) => {})
		},

		// 多个并发请求: 图片和天气
		bingfa: function () {
			function meitu () {
				return axios.get('https://api.apiopen.top/getImages?page=2&count=8');
			}
			function tianqi () {
				return mediaService.getWangYiNews({page: 2, count: 4})
				// return axios.get('https://api.apiopen.top/getWangYiNews?page=2&count=4');
			}
			axios.all([meitu(), tianqi()])
				.then(axios.spread(function (meitu, tianqi) {
					console.log(meitu, tianqi)
				}))
		},

		// 取消请求
		shili: function () {
			var source = axios.CancelToken.source();
			var sl = axios.create({
				baseURL: "https://api.apiopen.top",
				timeout: 1000,
				cancelToken: source.token
			})
			sl.get("/musicRankings", {}).then(res => {
				console.log(res)
			})
			source.cancel('Operation canceled by the user.');
		}
	}
}
</script>

<style scoped>
	span {
		display: inline-block;
		color: blue;
		cursor: pointer;
		margin: 5px;
	}
</style>
