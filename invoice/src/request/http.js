import axios from 'axios'
import qs from 'qs'
import store from '@/store'

//默认设置
axios.defaults.baseURL = 'http://183.129.183.201:10081/invoice';   	//线上
//axios.defaults.baseURL = 'http://10.12.8.39:10081/invoice';				//本地
axios.defaults.timeout = 8000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

//添加请求拦截器
axios.interceptors.request.use(config => {
	const token = store.getters.token;
	if (token) {
		config.headers['token'] = token;
	}
	if (config.method === 'post') {
		config.data = qs.stringify(config.data);
	}
	return config;
}, error => {
	return Promise.reject(error);
});


axios.interceptors.response.use(response => {
	if (response.data.code === 401) {				//token失效
		store.dispatch('logout')
		window.location.href = '/'
		return Promise.reject(response.data.msg)
	} 
	return response
}, error => {
	return Promise.reject(error)
})

export function post(url, params, autoShowError) {
	return new Promise((resolve, reject) => {
		axios.post(url, params).then(response => {
//			console.log(response)
			if (response.data.code === 6000 || response.data.code === 6001) {	
				resolve(response.data)
			} else {
				!autoShowError || store.dispatch('showText', response.data.msg)
				reject(response.data.msg)	
			}
		}).catch(error => {
//			console.log(error.message)
			!autoShowError || store.dispatch('showText', error.message)
			reject(error)
		})
	})
}

export function get(url, params, autoShowError) {
	return new Promise((resolve, reject) => {
		axios.get(url, params).then(response => {
//			console.log(response)
			if (response.data.code === 6000 || response.data.code === 6001) {	
				resolve(response.data)
			} else {
				!autoShowError || store.dispatch('showText', response.data.msg)
				reject(response.data.msg)	
			}
		}).catch(error => {
//			console.log(error.message)
			!autoShowError || store.dispatch('showText', error.message)
			reject(error)
		})
	})
}

export default axios