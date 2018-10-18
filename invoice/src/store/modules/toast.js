const toast = {
	state: {
		show: false,
		type: 'text',
		text: ''
	},
	
	mutations: {
		SET_SHOW: (state, show) => {
			state.show = show
		},
		SET_TYPE: (state, type) => {
			state.type = type
		},
		SET_TEXT: (state, text) => {
			state.text = text
		}
	},
	
	actions: {
		showText({ commit }, text) {
			commit('SET_SHOW', true)
			commit('SET_TYPE', 'text')
			commit('SET_TEXT', text)
		},
		showError({ commit }, text) {
			commit('SET_SHOW', true)
			commit('SET_TYPE', 'cancel')
			commit('SET_TEXT', text)
		}
	}
}


export default toast