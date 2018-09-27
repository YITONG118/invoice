import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const routerMap = [	
	{ path: '/login', component: () => import('@/views/login/index'), meta: { title: '登录' }},
	{ path: '/protocol', component: () => import('@/views/login/userProtocol'), meta: { title: '车享享用户协议' }},
	
	{ path: '/', component: () => import('@/views/order/index'), meta: { title: '停车订单' }},
	
	{ path: '/record', component: () => import('@/views/record/index'), meta: { title: '开票历史' }},
	
	{ path: '/personal', component: () => import('@/views/personal/index'), meta: { title: '个人中心' }},
]

export default new Router({
	routes: routerMap
})
