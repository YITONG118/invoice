import { get } from './http'

/*-------------登录--------------*/
//获取验证码

//登录
export function request_Login(telephone, authcode) {
	const path = '/orderList'
	const params = {
		phone: telephone,
		code: authcode
	}
	return new Promise((resolve, reject) => {
		get('/orderList').then(data => {
			resolve(data)
		}).catch(error => {
			reject(error)
		})
	})
}
