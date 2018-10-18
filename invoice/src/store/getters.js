const getters = {
	navBarStatus: state => state.app.navBarStatus,				//导航栏状态
	tabBarStatus: state => state.app.tabBarStatus,				//标签栏状态
	homePath: state => state.app.homePath,							//首页路径

	token: state => state.user.token,											//令牌
	userId: state => state.user.userId,										//用户ID
	phone: state => state.user.phone,											//手机号码
	
	noCachedRouters: state => state.router.noCachedRouters,			//不需要缓存的路由
	noCachedOrderRoute: state => state.router.noCachedOrderRoute,		//不需要缓存的订单路由
	
	show: state => state.toast.show,
	type: state => state.toast.type,
	text: state => state.toast.text
}

export default getters
