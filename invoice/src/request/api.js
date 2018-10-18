import { post, get } from './http'
import axios from './http'
import store from '@/store'

/*-------------登录--------------*/
//滑动验证
export function request_CheckSliding() {
	const path = '/invoiceSys/checkSliding?t=' + (new Date()).getTime()
	return new Promise((resolve, reject) => {
		axios.get(path).then(data => {
			resolve(data.data)
		}).catch(error => {
			reject(error)
		})
	})
}

//验证手机号
export function request_Verify(telephone) {
	const path = '/invoiceSys/verify'
	const params = { accountPhone: telephone }
	return new Promise((resolve, reject) => {
		post(path, params, true).then(data => {
			resolve(data)
		}).catch(error => {
			reject(error)
		})
	})
}

//获取验证码
export function request_GetCode(params) {
	const path = '/invoiceSys/code'
	return new Promise((resolve, reject) => {
		post(path, params, true).then(data => {
			resolve(data)
		}).catch(error => {
			reject(error)
		})
	})
}

//注册和找回密码
export function request_RegisterOrFindPassword(type ,telephone, authcode, password) {
	const path = type === 'register' ? '/invoiceSys/sign' : '/invoiceSys/forgetPwd'
	const params = {
		accountPhone: telephone,
		accountPwd: password,
		code: authcode
	}
	return new Promise((resolve, reject) => {
		post(path, params, true).then(data => {
			resolve(data)
		}).catch(error => {
			reject(error)
		})
	})
}

//修改密码
export function request_ChangePassword(oldPassword, newPassword) {
	const path = '/invoiceSys/updatePwd'
	const params = {
		accountPhone: store.getters.phone,
		oldPwd: oldPassword,
		newPwd: newPassword
	}
	return new Promise((resolve, reject) => {
		post(path, params, true).then(data => {
			resolve(data)
		}).catch(error => {
			reject(error)
		})
	})
}

//登录
export function request_Login(telephone, password) {
	const path = '/invoiceSys/pwdLogin'
	const params = {
		accountPhone: telephone,
		accountPwd: password
	}
	return new Promise((resolve, reject) => {
		post(path, params, true).then(data => {
			resolve(data.data)
		}).catch(error => {
			reject(error)
		})
	})
}

//退出登录
export function request_Logout() {
	const path = '/invoiceSys/logout'
	const params = { accountId: store.getters.userId }
	return new Promise((resolve, reject) => {
		post(path, params, true).then(data => {
			resolve(data)
		}).catch(error => {
			reject(error)
		})
	})
}

/*-------------订单--------------*/
export function request_OrderList(type, curPage, pageSize) {
	const path = type === 'tem' ? '/temporaryOrder/pageList' : '/monthOrder/pageList'
	const params = {
		accountId: store.getters.userId,
		cPage: curPage,
		pSize: pageSize
	}
	return new Promise((resolve, reject) => {
		post(path, params).then(data => {
			resolve(data)
		}).catch(error => {
			reject(error)
		})
	})
}

//提交发票信息
export function request_submitInvoiceInfo(params) {
	const path = '/invoiceInfo/applyInvoice'
	Object.assign(params, {accountId: store.getters.userId , accountPhone: store.getters.phone})
	return new  Promise((resolve, reject) => {
		post(path, params, true).then(data => {
			resolve(data)
		}).catch(error => {
			reject(error)
		})
	})
}


//获取已开发票数量
export function request_opendInvoiceCount() {
	const path = '/invoiceInfo/makeInvoiceNum'
	const params = { accountId: store.getters.userId }
	return new Promise((resolve, reject) => {
		post(path, params).then(data => {
			resolve(data.data)
		}).catch(error => {
			reject(error)
		})
	})
}

/*-------------发票模版--------------*/
//获取发票模版列表
export function request_getInvoiceTemplate() {
	const path = '/invoiceTemplate/list'
	const params = { accountId: store.getters.userId }
	return new Promise((resolve, reject) => {
		post(path, params, true).then(data => {
			resolve(data.data)
		}).catch(error => {
			reject(error)
		})
	})
}


//新增发票模版
export function request_addInvoiceModel(params) {
	const path = '/invoiceTemplate/save'
	Object.assign(params, {accountId: store.getters.userId})
	return new Promise((resolve, reject) => {
		post(path, params, true).then(data => {
			resolve(data)
		}).catch(error => {
			reject(error)
		})
	}) 
}


//删除发票模版
export function request_deleteInvoiceModel(templateId) {
	const path = '/invoiceTemplate/delete'
	const params = { templateId, accountId: store.getters.userId }
	return new Promise((resolve, reject) => {
		post(path, params, true).then(data => {
			resolve(data)
		}).catch(error => {
			reject(error)
		})
	}) 
}

//更新发票模版
export function request_updateInvoiceModel(params) {
	const path = '/invoiceTemplate/update'
	Object.assign(params, {accountId: store.getters.userId})
	return new Promise((resolve, reject) => {
		post(path, params, true).then(data => {
			resolve(data)
		}).catch(error => {
			reject(error)
		})
	}) 
}

//设置默认模版
export function request_defaultInvoiceModel(templateId) {
	const path = '/invoiceTemplate/defaultTemplate'
	const params = { templateId, accountId: store.getters.userId }
	console.log(params)
	return new Promise((resolve, reject) => {
		post(path, params, true).then(data => {
			resolve(data)
		}).catch(error => {
			reject(error)
		})
	})
}



/*-------------我的车辆--------------*/
//获取车辆列表
export function request_getMyCar() {
	const path = '/invoiceSysBound/list'
	const params = {accountId: store.getters.userId}
	return new Promise((resolve, reject) => {
		post(path, params, true).then(data => {
			resolve(data.data)
		}).catch(error => {
			reject(error)
		})
	}) 
}

//添加车辆
export function request_addMyCar(carNum) {
	const path = '/invoiceSysBound/save'
	const params = {carNum, accountId: store.getters.userId}
	return new Promise((resolve, reject) => {
		post(path, params, true).then(data => {
			resolve(data)
		}).catch(error => {
			reject(error)
		})
	}) 
}

//更新车辆
export function request_updateMyCar(carNum, carNumId) {
	const path = '/invoiceSysBound/update'
	const params = {
		carNum, 
		accountId: store.getters.userId,
		contactId: carNumId
	}
	return new Promise((resolve, reject) => {
		post(path, params, true).then(data => {
			resolve(data)
		}).catch(error => {
			reject(error)
		})
	}) 
}

//删除车辆
export function request_deleteMyCar(carNumId) {
	const path = '/invoiceSysBound/delete'
	const params = {contactId: carNumId}
	return new Promise((resolve, reject) => {
		post(path, params, true).then(data => {
			resolve(data)
		}).catch(error => {
			reject(error)
		})
	}) 
}


/*-------------开票记录--------------*/
export function request_getInvoiceRecord(curPage, pageSize) {
	const path = '/invoiceInfo/pageList'
	const params = { 
		accountId: store.getters.userId,
		cPage: curPage,
		pSize: pageSize
	}
	return new Promise((resolve, reject) => {
		post(path, params).then(data => {
			resolve(data)
		}).catch(error => {
			reject(error)
		})
	})
}


/*-------------获取ip地址--------------*/
export function request_getIpAddress() {
	const path = 'http://httpbin.org/ip'
	return new Promise((resolve, reject) => {
		axios.get(path).then(data => {
			resolve(data.data)
		}).catch(error => {
			reject(error)
		})
	})
}
