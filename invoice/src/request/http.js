import axios from 'axios'
import store from '@/store'
import { getToken } from '@/utils/token'

//默认设置
axios.defaults.baseURL = 'http://127.0.0.1:3004';
axios.defaults.timeout = 3000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

//添加请求拦截器
axios.interceptors.request.use(config => {
//	const token = store.getters.token;
//	const token = getToken();
//	if (token) {
//		config.headers['token'] = token;
//	}
	return config;
}, error => {
	return Promise.reject(error);
});


export function get(url, params) {
	return new Promise((resolve, reject) => {
		axios.get(url, {
			params: params
		}).then(response => {
			resolve(response.data)
		}).catch(error => {
			reject(error)
		})
	})
}

//export function post(url, params,) {
//	
//}

