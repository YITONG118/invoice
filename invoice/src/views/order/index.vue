<template>
	<div class="order-container">
		<div style="height:44px">
			<sticky scroll-box="vux_view_box_body" :check-sticky-support="false" :offset="4">
				<tab :line-width="2" custom-bar-width="62px">
					<tab-item>临停订单</tab-item>
					<tab-item>包月订单</tab-item>
				</tab>
			</sticky>
		</div>

		<div class="content-wrapper">
			<p v-for="i in 100">{{i}}</p>
		</div>
		<!-- <div class="bottom-wrapper">开具发票</div> -->
	</div>
</template>

<script>
	import { Tab, TabItem, Sticky } from 'vux'
	
	export default {
		components: { Tab, TabItem, Sticky }
	}
</script>

<style lang="scss" scoped>
	/*.content-wrapper {
		display: inline-block;
		height: 100%;
		background-color: red;
	}*/

	.bottom-wrapper {
		position: absolute;
		background-color: blue;
		bottom: 53px;
	}
</style>