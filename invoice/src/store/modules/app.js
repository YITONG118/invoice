const app = {
	// 状态
	state: {
		navBarStatus: true,			//是否显示导航栏
		tabBarStatus: true 			//是否显示标签栏
	},
	
	// 状态变更（必须是同步函数）
	mutations: {
		//更改导航栏状态
		TOGGLE_NAVBARSTATUS: (state, navBarStatus) => {
			state.navBarStatus = navBarStatus
		},
		//更改标签栏状态
		TOGGLE_TABBARSTATUS: (state, tabBarStatus) => {
			state.tabBarStatus = tabBarStatus
		}
	},
	
	// 类似于mutations,但是提交的是mutation,而不是直接变更状态(可以包含任意异步操作)
	actions: {
		toggleNavBarStatus({ commit }, navBarStatus) {
			commit('TOGGLE_NAVBARSTATUS', navBarStatus)
		},
		toggleTabBarStatus({ commit }, tabBarStatus) {
			commit('TOGGLE_TABBARSTATUS', tabBarStatus)
		}
	}
}

export default app