<template>
	<div class="empty-container" :style="{ paddingTop: paddingTop }">
		<img class="emptyIcon" :src="emptyIcon">
		<p class="emptyTip">{{ tipText }}</p>
		<label v-if="btnShow" class="emptyBtn" @click="btnClickAction">{{ btnText }}</label>
	</div>
</template>

<script>
	import nodataImg from '@/img/icon_nodata.png'
	import nonetworkImg from '@/img/icon_nonetwork.png'
	
	export default {
		props: {
			paddingTop: {
				type: String,
				default: '30%'
			},
			emptyIcon: {
				type: String,
				default: nodataImg
			},
			tipText: {
				type: String,
				default : '暂无相关数据'
			},
			btnText: {
				type: String,
				default : '点击刷新'
			},
			btnShow: {
				type: Boolean,
				default: true
			}
		},
		methods: {
			btnClickAction() {
				this.$emit('btnClick')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.empty-container {
		color: $text;
		text-align: center;
		.emptyIcon {
			display: inline-block;
			width: 163px;
		}
		.emptyTip {
			margin-top: 10px;
			font-size: 17px;
		}
		.emptyBtn {
			display: inline-block;
			height: 30px;
			line-height: 30px;
			padding: 0 5px;
			color: $blue;
		}
	}
</style>