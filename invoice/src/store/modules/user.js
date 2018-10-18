import { getToken, setToken, removeToken, getUserId, setUserId, removeUserId, getPhone, setPhone, removePhone } from '@/utils/token'

const user = {
	state: {
		token: getToken(),   				//令牌
		userId: getUserId(),				//用户ID,
		phone: getPhone()					//手机号码
	},
	
	mutations: {
		SET_TOKEN: (state, token) => {
			state.token = token
		},
		SET_USERID: (state, userId) => {
			state.userId = userId
		},
		SET_PHONE: (state, phone) => {
			state.phone = phone
		}
	},
	
	actions: {
		//登录成功
		login({ commit }, userInfo) {
			commit('SET_TOKEN', userInfo.token)
			commit('SET_USERID', userInfo.userId)
			commit('SET_PHONE', userInfo.phone)
			setToken(userInfo.token)
			setUserId(userInfo.userId)
			setPhone(userInfo.phone)
		},
		//退出登录
		logout({ commit }) {
			commit('SET_TOKEN', '')
			commit('SET_USERID', '')
			commit('SET_PHONE', '')
			removeToken()
			removeUserId()
			removePhone()
		}
	}
}


export default user