<template>
	<div class="success">
		<p class="icon-wrap"><icon type="success-circle"></icon></p>
		<p class="success-title">提交成功</p>
		<p class="success-info">电子发票将会发送到您的邮箱，请注意查收~</p>
		<x-button class="goOrder" type="primary" :link="{path: homePath, replace: true}">发票与报销</x-button>
		<x-button class="goRecord" plain :link="{path: '/record', replace: true}">开票历史</x-button>
	</div>
</template>

<script>
	import { Icon } from 'vux'
	import { mapGetters } from 'vuex'
	
	export default {
		name: 'submitSuccess',
	  components: { Icon },
	  computed: {
	  		...mapGetters(['homePath'])
	  },
	  beforeRouteLeave(to, from, next) {
	  		//刷新将要的进入页面,而不是进入缓存的页面
	  		this.$store.dispatch('add_noCachedRouter', 'order')				//无论进入哪个页面刷新订单页面
			this.$store.dispatch('set_noCachedOrderRoute')						 	//由于还有子路由，子路由也要刷新
			this.$store.dispatch('add_noCachedRouter', 'record')      	//无论进入哪个页面刷新历史记录页面
			next()
		}
	}
</script>

<style lang="scss" scoped>
	.success{
		height: 100%;
		padding-top: 70px;
	}
	.icon-wrap{
		text-align: center;
	}
	.icon-wrap .weui-icon-success-circle{
		font-size: 100px;
		color: $blue;
	}
	.success-title{
		padding: 20px 0;
		font-size: 18px;
		line-height: 18px;
		color: $blue;
		text-align: center;
	}
	.success-info{
		font-size: 14px;
		line-height: 14px;
		color: $placeholder;
		text-align: center;
	}
	.goOrder {
		margin-top: 80px;
	}
	.goOrder,
	.goRecord {
		width: calc(100% - (#{$margin} * 2));
	}
</style>