import axios from "axios"
import router from '@/router'
import qs from "qs"	// 把对象转为拼接参数，或反之
import { Message } from 'view-design';

// 创建axios实例, 配置请求默认参数
let axiosInstance = axios.create({
	timeout: 1000 * 12,
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded'

		// 这里可以统一添加请求头，但是若本地存储没有取到 token, 请求头的 token 的值为空, 就会报错
		// 'token': sessionStorage.getItem('token') || ''
	},
	baseURL: process.env.API_ROOT,

	// 跨域请求时是否需要使用凭证, 默认false
	withCredentials: false,

	// 在请求之前对 params 进行处理, 用于 get
	paramsSerializer: params => {
		// console.log("paramsSerializer", params)
		// params.token = sessionStorage.getItem('token')
		return qs.stringify(params)
	},

	// 在请求之前对请求数据进行处理, 用于 POST, PUT, PATCH 和 DELETE
	transformRequest: [function (data, headers) {
		let token = sessionStorage.getItem('token')
		// data += '&token=' + token	// 查询参数加 token
		// headers.token = token		// 请求头加 token
		// console.log("transformRequest", data, headers)
		return data;
	}]
});

// 请求拦截器, 请求发出前响应
axiosInstance.interceptors.request.use(
	config => {
		// console.log(config)
		let token = sessionStorage.getItem('token') || '';

		if (config.method === 'get') {
			// config.params.token = token		// 添加查询参数
			// config.headers.token = token		// 添加查询参数在请求头
		} else if (config.method === 'post') {
			// config.data += '&token=' + token	// 添加查询参数
			// config.headers.token = token		// 添加查询参数在请求头
		}
		return config
	},
	error => {
		return Promise.reject(error);
	}
);

// 响应拦截器
axiosInstance.interceptors.response.use(
	response => { // 任何 response.status = 2xx 时触发, 2xx 表示服务器成功处理了请求
		console.log("响应拦截器成功", response)
		if (response.data.code === 200 || response.status === 200) {
			return Promise.resolve(response.data.result || response.data)
		} else {
			Message.destroy()
			switch (response.data.code) {
				case 500: 
					sessionStorage.removeItem('token')
					sessionStorage.removeItem('username')
					Message.error("账号已过期")
					break;
				default:
					Message.error(response.data.message)
			}
		}
	},
	error => { // 任何超出 2xx 范围的状态码触发
		console.log("响应拦截器失败", error.response)
		Message.destroy()
		Message.error(error.response.data.message)
	}
);

export default axiosInstance