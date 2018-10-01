import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/*
 * name: 路由名字,必须设置,否则使用<keep-alive>会出现问题,并且和组件里面的name需要一致
 * naCache: 如果设置为true,则不会被<keep-alive>缓存
 * title: 导航栏标题
 */
export const routerMap = [	
	{ path: '/login', name: 'login', component: () => import('@/views/login/index'), meta: { title: '登录', noCache: true }},
	{ path: '/protocol', name: 'protocol', component: () => import('@/views/login/userProtocol'), meta: { title: '车享享用户协议' }},
	
	{ 
		path: '/', 
		component: () => import('@/views/order/index'), 
		redirect: '/order/tem',
		children:[
			{ path: 'order/:type', name: 'order', component: () => import('@/views/order/order'), meta:{ title: '停车订单' }}
		]
	},
	
	{ path: '/record', name: 'record', component: () => import('@/views/record/index'), meta: { title: '开票历史' }},
	
	{ path: '/personal', name: 'personal', component: () => import('@/views/personal/index'), meta: { title: '个人中心' }},
]

export default new Router({
	routes: routerMap
})
