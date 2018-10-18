<template>
	<div class="recordListItem-container">
		<p class="time">{{ recordInfo.createTime }}</p>
		<div>
			<p class="carNum">{{ recordInfo.carNumArray }}</p>
			<p class="type">{{ recordInfo.orderType === 1 ? '临停订单' : '包月订单' }}</p>
		</div>
		<div>
			<p class="parkName">{{ recordInfo.parkName }}</p>
			<p class="money"><b>{{ recordInfo.invoiceAmt }}</b><span>元</span></p>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			recordInfo: {
				type: Object
			}
		}
	}
</script>

<style lang="scss" scoped>
	.recordListItem-container {
		position: relative;
		background-color: white;
		margin-top: 3px;
		padding: 13px $margin;
		font-size: 14px;
		.time {
			font-size: 11px;
			margin-bottom: 3px;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
		.carNum {
			float: left;
		}
		.type {
			float: right;
		}
		.parkName {
			float: left;
			width: calc(100% - 75px);
			padding-right: 10px;
			margin-top: 3.5px;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
		.money {
			float: right;
				text-align: right;
				width: 75px;
				font-size: 18px;
				span {
					margin-left: 2px;
					vertical-align: middle;
					font-size: 10px;
				}
		}
	}
</style>