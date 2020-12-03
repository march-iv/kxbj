import http from '../http.js'
import qs from 'qs'

export default {
	signUp (params) {	// 开发者注册
		return http.post('developerRegister', qs.stringify(params))
	},

	signIn (params) {	// 开发者登录
		return http.post('developerLogin', qs.stringify(params))
	}
}