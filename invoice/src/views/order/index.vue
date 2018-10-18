<template>
	<div class="home-container" style="height: 100%;">
		<div style="height:44px">
			<sticky scroll-box="vux_view_box_body" :check-sticky-support="false">
				<tab :line-width="2" custom-bar-width="62px" >
					<tab-item @click.native="$router.replace('/order/tem')" :selected="$route.path === '/order/tem'"><b>临停订单</b></tab-item>
					<tab-item @click.native="$router.replace('/order/mon')" :selected="$route.path === '/order/mon'"><b>包月订单</b></tab-item>
				</tab>
			</sticky>
		</div>
		<keep-alive :exclude="noCachedOrderRoute">
			<!--49px为底部标签栏减去顶部偏移(53px-4px)-->
			<router-view :key="key" style="height: calc(100% - 49px); margin-top: 4px;"></router-view>
		</keep-alive>
	</div>
</template>

<script>
	import { Tab, TabItem, Sticky } from 'vux'
	import { mapGetters } from 'vuex'
	
	export default {
		name: 'order',							//此处需要设置name为order，App	.vue里面的<keep-alive>对应的是该名字
		components: { Tab, TabItem, Sticky },
		computed: {
			...mapGetters(['noCachedOrderRoute']),
			key() {
				//不能使用路由路径作为key，否则切换到其他路由时都会重新创建
				//return this.$route.fullPath
				if (this.$route.fullPath === '/order/mon') {
					return this.$route.fullPath
				} 
			}
		}
	}
</script>
