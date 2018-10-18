import { routerMap } from '@/router'

/*
 * 过滤路由
 */
function filterNoCachedRouters(routerMap) {
	const filterRouters = []
	const tempRouters = routerMap.filter(router => {
		if (router.children) {
			Array.prototype.push.apply(filterRouters, filterNoCachedRouters(router.children))
		}
		return router.meta && router.meta.noCache
	})
	Array.prototype.push.apply(filterRouters, tempRouters)
	return filterRouters
}

const router = {
	state: {
		noCachedRouters: filterNoCachedRouters(routerMap).map(item => item.name),		//不需要缓存的路由
		noCachedOrderRoute: ''
	},
	mutations: {
		SET_CACHEDROUTERS: (state, routers) => {
			state.noCachedRouters = routers
		},
		SET_CACHEDORDERROUTE: (state, name) => {
			state.noCachedOrderRoute = name
		}
	},
	actions: {
		add_noCachedRouter({ commit, state }, name) {
			const routers = state.noCachedRouters.slice(0)
			routers.push(name)
			commit('SET_CACHEDROUTERS', [...new Set(routers)])
		},
		delete_noCachedRouter({ commit,state }, name) {
			const routers = state.noCachedRouters.slice(0)
			const index = routers.indexOf(name)
			if (index !== -1) {
				routers.splice(index, 1)
			}
			commit('SET_CACHEDROUTERS', routers)
		},
		set_noCachedOrderRoute({ commit }) {
			commit('SET_CACHEDORDERROUTE', 'order')
		},
		delete_noCachedOrderRoute({ commit }) {
			commit('SET_CACHEDORDERROUTE', '')
		}
	}
}

export default router