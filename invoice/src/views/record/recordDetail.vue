<template>
	<div class="recordDetail-container">
		<group gutter="0">
			<cell-box>
				<label class="title">电子邮箱</label>
				<label>{{ recordInfo.invoiceEmail }}</label>
			</cell-box>
		</group>
		<group gutter="4px">
			<cell-box>
				<label class="title">发票抬头</label>
				<label>{{ recordInfo.parkName }}</label>
			</cell-box>
			<cell-box v-if="recordInfo.invoiceTaxNum">
				<label class="title">税号</label>
				<label>{{ recordInfo.invoiceTaxNum }}</label>
			</cell-box>
			<cell-box>
				<label class="title">发票内容</label>
				<label>{{ recordInfo.invoiceContent }}</label>
			</cell-box>
			<cell-box>
				<label class="title">手机号码</label>
				<label>{{ recordInfo.invoicePhone }}</label>
			</cell-box>
			<cell-box>
				<label class="title">发票金额</label>
				<label>{{ recordInfo.invoiceAmt }}元</label>
			</cell-box>
			<cell-box>
				<label class="title">申请时间</label>
				<label>{{ recordInfo.createTime }}</label>
			</cell-box>
		</group>
	</div>
</template>

<script>
	import { CellBox } from 'vux'
	
	export default {
		name: 'recordDetail',
		components: { CellBox },
		data() {
			return {
				recordInfo: {}	
			}
		},
		mounted() {
			this.recordInfo = this.$route.params
		}
	}
</script>

<style lang="scss" scoped>
	.recordDetail-container {
		.title {
			width: 100px;
		}
		.weui-cell {
			height: 50px;
		}
	}
</style>