<template>
	<div>
		<tabbar>
			<tabbar-item link='/order' selected>
				<img slot="icon" src="../../img/icon_tab_order_nike.png">
				<img slot="icon-active" src="../../img/icon_tab_order.png">
				<span slot="label">停车订单</span>
			</tabbar-item>
			<tabbar-item link='/record'>
				<img slot="icon" src="../../img/icon_tab_history_nike.png">
				<img slot="icon-active" src="../../img/icon_tab_history.png">
				<span slot="label">开票历史</span>
			</tabbar-item>
			<tabbar-item link='personal'>
				<img slot="icon" src="../../img/icon_tab_my_nike.png">
				<img slot="icon-active" src="../../img/icon_tab_my.png">
				<span slot="label">个人中心</span>
			</tabbar-item>
		</tabbar>
	</div>
</template>

<script>
	import { Tabbar, TabbarItem } from 'vux'
	
	export default {
		name: 'home',
		components: { Tabbar, TabbarItem },
		
	}
</script>

<style lang="scss" scoped>
</style>