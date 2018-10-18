<template>
	<div class="list-container">
		<div class="left-content">
			<img class="checkImg" :src="checkImg">
		</div>
		<div class="right-content" :style="{marginLeft: contentLeftMargin+'px'}">
			<div class="orderTime">{{ orderInfo.enterTime }}</div>
			<div>
				<div class="carNum">{{ orderInfo.carNum }}</div>
				<div class="accessory">{{ orderInfo.type }}</div>
			</div>
			<div>
				<div class="parkName">{{ orderInfo.parkName }}</div>
				<div class="orderMoney"><b>{{ orderInfo.orderCostReal }}</b><span>元</span></div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'listCell',
		props: {
			//内容左侧边距
			contentLeftMargin: {
				type: Number,
				default: 24
			},
			//单选框图片
			checkImg: {
				type: String
			},
			//信息数据
			orderInfo: {
				type: Object
			}
		}
	}
</script>

<style lang="scss" scoped>
	.list-container {
		position: relative;
		background-color: white;
		margin-top: 3px;
		padding: 13px $margin;
		.left-content {
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			.checkImg {
				width: 12px;
				height: 12px;
			}	
		}
		.right-content {
			font-size: 14px;
			.orderTime {
				font-size: 11px;
				margin-bottom: 3px;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
			.carNum {
				float: left;
			}
			.accessory {
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
			.orderMoney {
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
	}
	.list-container:first-child {
		margin-top: 0;
	}
</style>