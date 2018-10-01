<template>
	<div class="list-container">
		<div class="left-content">
			<img class="selectedImg" src="../img/code.png">
		</div>
		<div class="right-content" :style="{marginLeft: contentLeftMargin+'px'}">
			<div class="orderTime">2017-05-04 07:37:03</div>
			<div >
				<div class="carNum">A88888</div>
				<div class="accessory">月租A1</div>
			</div>
			<div>
				<div class="parkName">西子4444455455148151515151514车大厦</div>
				<div class="orderMoney">{{ orderInfo.money }}</div>
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
		background-color: red;
		margin-top: 3px;
		padding: 13px $margin;
		.left-content {
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
			.selectedImg {
				width: 12px;
				height: 12px;
			}	
		}
		.right-content {
			font-size: 14px;
			.orderTime {
				font-size: 11px;
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
				background-color: yellow;
				margin-right: 15px;
				white-space: nowrap;
			}
			.orderMoney {
				float: right;
				background-color: gray;
				min-width: 60px;
			}
		}
	}
</style>