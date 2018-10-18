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
	{ path: '/password/:type', name: 'password', component: () => import('@/views/login/register'), meta: {title: {register: '账户注册', findPassword: '找回密码'}, noCache: true}},
	{ path: '/protocol', name: 'protocol', component: () => import('@/views/login/userProtocol'), meta: { title: '车享享用户协议', noCache: true }},
	{ path: '/changePassword', name: 'changePassword', component: () => import('@/views/login/changePassword'), meta: { title: '修改密码', noCache: true }},
	
	{ 
		path: '/', 
		component: () => import('@/views/order/index'), 
		redirect: '/order/tem',
		children:[
			{ path: 'order/:type', name: 'order', component: () => import('@/views/order/order'), meta:{ title: '停车订单' }}
		]
	},
	
	{ path: '/invoiceInfo', name: 'invoiceInfo', component: () => import('@/views/order/invoiceInfo'), meta: { title: '开具电子发票', noCache: true }},
	{ path: '/submitSuccess', name: 'submitSuccess', component: () => import('@/views/order/submitSuccess'), meta: { title: '开具电子发票', noCache: true }},
		
	{ path: '/record', name: 'record', component: () => import('@/views/record/index'), meta: { title: '开票历史' }},
	{ path: 'recordDetail', name: 'recordDetail', component: () => import('@/views/record/recordDetail'), meta: { title: '发票详情', noCache: true }},
	
	{ path: '/personal', name: 'personal', component: () => import('@/views/personal/index'), meta: { title: '个人中心' }},
	{ path: '/invoiceHelp', name: 'invoiceHelp', component: () => import('@/views/personal/invoiceHelp'), meta: { title: '发票帮助', noCache: true }},
	
	{ path: '/modelList', name: 'modelList' ,component: () => import('@/views/model/modelList'), meta: { title: '发票模版'}},
	{ path: '/model/:type', name:'addModel', component: () => import('@/views/model/addModel'), meta: { title: {add: '添加发票模版', edit: '编辑发票模版'}, noCache: true }},
	
	{ path: '/myCarList', name: 'myCarList', component:() => import('@/views/myCar/myCarList'), meta: { title: '我的车辆' }},
	{ path: '/myCar/:type', name: 'inputMyCar', component:() => import('@/views/myCar/inputMyCar'), meta:{ title: { add: '添加车辆', edit: '编辑车辆' }, noCache: true }}
]

export default new Router({
	routes: routerMap
})
