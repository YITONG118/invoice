/*
 * 获取viewBox对象
 * component: VueComponent对象
 */
export function viewBox(component) {
	let viewBox = component.$refs.viewBox
	while(!viewBox) {
		component = component.$parent
		viewBox = component.$refs.viewBox
	}
	return viewBox
}

/*
 *	验证手机号码 
 */
export function checkPhone(phone) {
	const phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/
  return phoneReg.test(phone)
}

/*
 * 验证电子邮箱
 */
export function checkEmail(email) {
	const emailReg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
	return emailReg.test(email)
}

/*
 * 验证验证码
 */
export function checkAuthcode(authcode) {
	const codeReg = /^[0-9]{6}$/
	return codeReg.test(authcode)
}

/*
 * 验证密码
 */
export function checkPassword(password) {
	const passwordReg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![_]+$)[\da-zA-Z_]{6,20}$/
	return passwordReg.test(password)
}

/*
 * 验证车牌号码
 */
export function checkCarNum(carNum) {
	const carNumReg = /^(([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z](([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳使领]))$/
	return carNumReg.test(carNum)
}

/*
 * 删除所有空格
 */
export function trim(str) {
	return str.replace(/\s/g, "")

}
