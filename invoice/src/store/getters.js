const getters = {
	navBarStatus: state => state.app.navBarStatus,				//导航栏状态
	tabBarStatus: state => state.app.tabBarStatus,				//标签栏状态
	
	token: state => state.user.token,											//令牌
	userId: state => state.user.userId,										//用户ID
	phone: state => state.user.phone											//手机号码
}

export default getters
