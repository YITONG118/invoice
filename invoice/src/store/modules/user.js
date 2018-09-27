import { getToken, setToken, removeToken } from '@/utils/token'

const user = {
	state: {
		token: getToken(),   				//令牌
		userId: '',								//用户ID,
		phone: ''									//手机号码
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
		
	}
}


export default user