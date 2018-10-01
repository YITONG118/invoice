<template>
	<div class="home-container">
		<div style="height:44px">
			<sticky scroll-box="vux_view_box_body" :check-sticky-support="false">
				<tab :line-width="2" custom-bar-width="62px" >
					<tab-item @click.native="$router.push('/order/tem')" :selected="$route.path === '/order/tem'">临停订单</tab-item>
					<tab-item @click.native="$router.push('/order/mon')" :selected="$route.path === '/order/mon'">包月订单</tab-item>
				</tab>
			</sticky>
		</div>
		<keep-alive>
			<router-view></router-view>
		</keep-alive>
	</div>
</template>

<script>
	import { Tab, TabItem, Sticky } from 'vux'
	
	export default {
		components: { Tab, TabItem, Sticky },
		computed: {
			key() {
		  		return this.$route.fullPath
		  	}	
		}
	}
</script>
