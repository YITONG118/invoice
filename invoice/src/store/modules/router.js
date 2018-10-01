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
		noCachedRouters: filterNoCachedRouters(routerMap).map(item => item.name)		//不需要缓存的路由
	}
}

export default router