<template>
  <div id="app">
  	<div class="app-container">
	    <router-view></router-view>
	    <tabbar v-if="tabBarStatus">
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
  	</div>
  </div>
</template>

<script>
	import { Tabbar, TabbarItem } from 'vux'
	import { mapGetters } from 'vuex'

	export default {
	  name: 'App',
	  components: { Tabbar, TabbarItem },
	  computed: {
	  	...mapGetters(['tabBarStatus'])
	  },
	  watch: {
	  	$route(to, from) {
	  		console.log(to.path)
	  		if (to.path === '/' || to.path === '/record' || to.path === '/personal') {
	  			this.$store.dispatch('toggleTabBarStatus', true)
	  		} else {
	  			this.$store.dispatch('toggleTabBarStatus', false)
	  		}
	  	}
	  }
	}
</script>

<style lang="less">
	@import '~vux/src/styles/reset.less';
</style>