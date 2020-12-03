import http from '../http.js'
import qs from 'qs'

/*
	更多开发的 API：
	http://jsonplaceholder.typicode.com/  -  虚假的在线REST API，用于测试和原型制作
	https://cnodejs.org/api
*/

export default {
	getWangYiNews (params, headers = {}) { // 网易新闻, 参数: { page: 2, count: 10}
		return http.get('https://api.apiopen.top/getWangYiNews', {
			params: params,
			headers,
			responseType: 'blob'
		})
	},
	getImages (params) {	// 美图推荐, 参数: { page: 2, count: 10}
		return http.get('https://api.apiopen.top/getImages', {params})
	},
	musicRankings (params) { // 音乐榜单, 无参数
		return http.get('https://api.apiopen.top/musicRankings', {params})
	},
	todayVideo (params) {	// 每日推荐视频, 无参数
		return http.get('https://api.apiopen.top/todayVideo', {params})
	},
	meiriyikan (params) {	// 每日一看, 无参数
		return http.get('http://meiriyikan.cn/api/json.php', {params})
	},
	videoHomeTab (params) {	// 视频分类, 无参数
		return http.get('https://api.apiopen.top/videoHomeTab', {params})
	},
	topicArticle (params) {	// 主题首页, 
		// 参数: {page: 1, limit: 8, tab: 'ask\share\job\good', mdrender: 'false\true'}
		return http.get('https://cnodejs.org/api/v1/topics', {params})
	}
}