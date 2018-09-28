<template>
	<div>
		<tab :line-width="2">
			<tab-item>临停订单</tab-item>
			<tab-item>包月订单</tab-item>
		</tab>
		<div class="content-wrapper">
			<p v-for="i in 100">{{i}}</p>
		</div>
		<div class="bottom-wrapper">开具发票</div>
	</div>
</template>

<script>
	import { Tab, TabItem } from 'vux'
	
	export default {
		components: { Tab, TabItem }
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