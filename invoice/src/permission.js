import router from './router' 
import { getToken } from '@/utils/token'

//免登录白名单
const whiteList = ['/login', '/protocol'];

/*
 * 全局前置守卫
 * to: 即将要进入的目标路由对象
 * from: 当前导航正要离开的路由对象
 * next: 必须执行的方法,决定执行效果
 */
router.beforeEach((to, from, next) => {
	if (getToken()) {    //有token
		next()
	} else {							//无token
		if (whiteList.indexOf(to.path) !== -1) {			//在免登录白名单中,直接进入
			next()
		} else {			//否则全部重定向至登录页
			next('/login')
		}
	}
})
