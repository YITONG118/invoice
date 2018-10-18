<template>
  <div id="app">
	  	<div class="app-container" :style="{paddingTop: topPadding}">
	  			<view-box ref="viewBox" :bodyPaddingBottom="bottomPadding">
	  				<keep-alive :exclude="noCachedRouters">
	  					<router-view v-wechat-title="typeof($route.meta.title) === 'object' ?  $route.meta.title[$route.params.type] : $route.meta.title"></router-view>
	  				</keep-alive>
			    <tabbar ref="tabbar" slot="bottom" v-if="tabBarStatus">
						<tabbar-item :link="{path: homePath, replace: true}" :selected="$route.path === homePath">
							<img class="orderImg" slot="icon" src="./img/icon_tab_order_nike.png">
							<img class="orderImg" slot="icon-active" src="./img/icon_tab_order.png">
							<span slot="label">停车订单</span>
						</tabbar-item>
						<tabbar-item :link="{path: '/record', replace: true}" :selected="$route.path === '/record'">
							<img class="recordImg" slot="icon" src="./img/icon_tab_history_nike.png">
							<img class="recordImg" slot="icon-active" src="./img/icon_tab_history.png">
							<span slot="label">开票历史</span>
						</tabbar-item>
						<tabbar-item :link="{path: '/personal', replace: true}" :selected="$route.path === '/personal'">
							<img class="personalImg" slot="icon" src="./img/icon_tab_my_nike.png">
							<img class="personalImg" slot="icon-active" src="./img/icon_tab_my.png">
							<span slot="label">个人中心</span>
						</tabbar-item>
					</tabbar>
	  			</view-box>
	  	</div>
	  	<toast v-model="isShow" :type="type" :text="text"></toast>
  </div>
</template>

<script>
	import { Tabbar, TabbarItem, ViewBox, Toast } from 'vux'
	import { mapGetters } from 'vuex'

	export default {
	  name: 'App',
	  components: { Tabbar, TabbarItem, ViewBox, Toast },
	  computed: {
	  		...mapGetters(['tabBarStatus', 'noCachedRouters', 'homePath', 'show', 'text', 'type']),
	 		isShow: {
	 			get() {
	 				return this.show
	 			},
	 			set(value) {
	 				this.$store.commit('SET_SHOW', value)
	 			}
	 		},
	 		test() {
	 			return this.$route.meta.titile
	 		}
	  },
	  data() {
	  		return {
	  			topPadding: 0,
	  			bottomPadding: 0
	  		}
	  },
	  watch: {
		  	$route(to, from) {
		  		const whiteBottom = ['/', '/record', '/personal', '/order/tem', '/order/mon']
		  		const whiteTop = ['/order/tem', '/order/mon']
		  				  		
		  		if (whiteBottom.indexOf(to.path) !== -1) {
		  			this.$store.dispatch('toggleTabBarStatus', true)
		  			this.$nextTick(function() {
		  				this.bottomPadding = this.$refs.tabbar.$el.clientHeight + 'px'
		  			})
		  		} else {
		  			this.$store.dispatch('toggleTabBarStatus', false)
		  			this.bottomPadding = 0
		  		}
		  		
		  		this.topPadding = whiteTop.indexOf(to.path) !== -1 ? 0 : '4px';
		  		
		  	}
	  }
	}
</script>

<style lang="less">
	@import '~vux/src/styles/reset.less';
	@import '~vux/src/styles/1px.less';
</style>


<style lang="scss" scoped>
	.app-container {
		.orderImg {
			width: 18px;
			height: 20px;
		}
		.recordImg {
			width: 23px;
			height: 20px;
		}
		.personalImg {
			width: 19.5px;
			height: 20.5px;
		}
		img {
			position: relative;
	    top: 50%;
	    transform: translateY(-50%);
	   	margin:0 auto;
		}
	}
</style>