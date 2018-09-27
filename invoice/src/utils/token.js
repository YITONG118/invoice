import { cookie } from 'vux'

const TokenKey = 'MyToken'

//获取token
export function getToken() {
	return cookie.get(TokenKey)
}

//设置token
export function setToken(token) {
	return cookie.set(TokenKey, token)
}

//移除token
export function removeToken() {
	return cookie.remove(TokenKey)
}
