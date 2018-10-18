import { cookie } from 'vux'

const TokenKey = 'MyToken'
const UserIdKey = 'MyUserId'
const PhoneKey = 'MyPhone'
const InvoiceCountKey = 'MyInvoiceCount'

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

//获取userId
export function getUserId() {
	return cookie.get(UserIdKey)
}

//设置userId
export function setUserId(userId) {
	return cookie.set(UserIdKey, userId)
}

//移除userId
export function removeUserId() {
	return cookie.remove(UserIdKey)
}


//获取phone
export function getPhone() {
	return cookie.get(PhoneKey)
}

//设置phone
export function setPhone(phone) {
	return cookie.set(PhoneKey, phone)
}

//移除phone
export function removePhone() {
	return cookie.remove(PhoneKey)
}


//设置invoiceCount
export function setInvoiceCount(invoiceCount) {
	return cookie.set(InvoiceCountKey, invoiceCount)
}

//获取invoiceCount
export function getInvoiceCount() {
	return cookie.get(InvoiceCountKey)
}

//移除invoiceCount
export function removeInvoiceCount() {
	return cookie.remove(InvoiceCountKey)
}