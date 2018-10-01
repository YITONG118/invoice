<template>
  <div id="app">
	  	<div class="app-container" :style="{paddingTop: topPadding}">
	  			<view-box ref="viewBox" :bodyPaddingBottom="bottomPadding">
	  				<keep-alive :exclude="noCachedRouters">
	  					<router-view></router-view>
	  				</keep-alive>
			    <tabbar ref="tabbar" slot="bottom" v-if="tabBarStatus">
						<tabbar-item :link="{path:'/', replace: true}" :selected="$route.path === '/'">
							<img slot="icon" src="./img/icon_tab_order_nike.png">
							<img slot="icon-active" src="./img/icon_tab_order.png">
							<span slot="label">停车订单</span>
						</tabbar-item>
						<tabbar-item :link="{path: '/record', replace: true}" :selected="$route.path === '/record'">
							<img slot="icon" src="./img/icon_tab_history_nike.png">
							<img slot="icon-active" src="./img/icon_tab_history.png">
							<span slot="label">开票历史</span>
						</tabbar-item>
						<tabbar-item :link="{path: '/personal', replace: true}" :selected="$route.path === '/personal'">
							<img slot="icon" src="./img/icon_tab_my_nike.png">
							<img slot="icon-active" src="./img/icon_tab_my.png">
							<span slot="label">个人中心</span>
						</tabbar-item>
					</tabbar>
	  			</view-box>
	  	</div>
  </div>
</template>

<script>
	import { Tabbar, TabbarItem,ViewBox } from 'vux'
	import { mapGetters } from 'vuex'

	export default {
	  name: 'App',
	  components: { Tabbar, TabbarItem, ViewBox },
	  computed: {
	  		...mapGetters(['tabBarStatus', 'noCachedRouters']),
	  		key() {
	  			return this.$route.fullPath
	  		},
	  		
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
</style>