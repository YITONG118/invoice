<template>
	<div class="modelListItem-container">
		<ul>
			<li>
				<p class="title">抬头类型</p>
				<p class="value">{{ modelInfo.invoiceType === 1 ? '个人抬头' : '公司抬头' }}</p>
			</li>
			<li>
				<p class="title">发票抬头</p>
				<p class="value">{{ modelInfo.invoiceName }}</p>
			</li>
			<li v-if="modelInfo.invoiceType === 2">
				<p class="title">税号</p>
				<p class="value">{{ modelInfo.invoiceTaxNum }}</p>
			</li>
			<li>
				<p class="title">手机号码</p>
				<p class="value">{{ modelInfo.invoicePhone }}</p>
			</li>
		</ul>

		<div class="button-grounp" style="height: 20px;" v-if="modelInfo.invoiceRemark || modelInfo.invoiceAddress || modelInfo.invoiceAccount">
			<span class="showMoreInfoBtn" @click="showMoreInfoAction">
				<img :src="showMoreInfo ? upImg : downImg" style="width: 10px; height: 5px;">
				<label class="showMoreInfoTip">{{ showMoreInfo ? '隐藏' : '显示更多' }}</label>
			</span>
		</div>

		<ul v-if="showMoreInfo">
			<li v-if="modelInfo.invoiceRemark">
				<p class="title">备注说明</p>
				<p class="value">{{ modelInfo.invoiceRemark }}</p>
			</li>
			<li v-if="modelInfo.invoiceAddress">
				<p class="title">地址</p>
				<p class="value">{{ modelInfo.invoiceAddress }}</p>
			</li>
			<li v-if="modelInfo.invoiceAccount">
				<p class="title">开户行及账号</p>
				<p class="value">{{ modelInfo.invoiceAccount }}</p>
			</li>
		</ul>

		<div class="line"></div>

		<div class="button-grounp">
			<!-- 左边按钮组 -->
			<span class="button-grounp-left">
				<!-- 设为默认按钮 -->
				<span class="defaultBtn" @click="defaultAction">
					<img :src="modelInfo.defaultType === 1 ? choseImg : nochoseImg" style="width: 17px; height: 17px;">
					<label>设为默认</label>
				</span>
			</span>
			<!-- 右边按钮组 -->
			<span class="button-grounp-right">
				<!-- 编辑按钮 -->
				<span class="editBtn" @click="editAction">
					<img src="../img/icon_edit.png" style="width: 18px; height: 18px;">
					<label>编辑</label>
				</span>
				<!-- 删除按钮 -->
				<span class="deleteBtn" @click="deleteAction">
					<img src="../img/icon_delete.png" style="width: 18px; height: 18px;">
					<label>删除</label>
				</span>
			</span>
		</div>
	</div>
</template>

<script>
	import upImg from '@/img/icon_upper.png'
	import downImg from '@/img/icon_down.png'
	import choseImg from '@/img/icon_invoice_chose.png'
	import nochoseImg from '@/img/icon_invoice_nochose.png'

	export default {
		name: 'modelListItem',
		props: {
			modelInfo: {
				type: Object,
				required: true
			},
			index: {
				type: Number,
				required: true
			}
		},
		data() {
			return {
				showMoreInfo: false,
				upImg,
				downImg,
				choseImg,
				nochoseImg
			}
		},
		methods: {
			defaultAction() {
				this.$emit('defaultModel', this.index)
			},
			editAction() {
				this.$emit('editModel', this.index)
			},
			deleteAction() {
				this.$emit('deleteModel', this.index)
			},
			showMoreInfoAction() {
				this.showMoreInfo = !this.showMoreInfo
			}
		}
	}
</script>

<style lang="scss" scoped>
	.modelListItem-container {
		padding: 0 $margin;
		background-color: white;
		font-size: 14px;
		white-space: pre-line;
		word-break: break-all;
		ul {
			list-style: none;
		}
		// 第一组文字顶部距离
		ul:first-child {
			margin-top: 20px;
		}
		// 每行文字间距(除最后一行)
		ul li:not(:first-child) {
			margin-top: 3px;
		}
		.title {
			float: left;
			width: 86px;
			margin-right: 30px;
			color: $text;
		}
		.value {
			color: $placeholder;
		}
		.line {
			height: 1px;
			background-color: $viewBg;
			margin-top: 10px;
			margin: 10px -15px 0 -15px;
		}
		.button-grounp {
			height: 50px;
			font-size: 0;
			img {
				float: left;
				position: relative;
		    top: 50%;
		    transform: translateY(-50%);
			}
			label {
				margin-left: 6px;
				font-size: 12px;
				font-weight: bold;
			}
			.button-grounp-left {
				float: left;
				height: 100%;
			}
			.button-grounp-right {
				float: right;
				height: 100%;
			}
			.defaultBtn,
			.editBtn,
			.deleteBtn,
			.showMoreInfoBtn {
				position: relative;
		    top: 50%;
		    transform: translateY(-50%);
				display: inline-block;
				height: 30px;
				line-height: 30px;
				padding: 0 5px;
				overflow-x: visible;
			}
			.showMoreInfoTip {
				color: $blue;
			}
			.deleteBtn {
				margin-left: 12px;
			}
			.showMoreInfoBtn {
				float: right;
				height: 20px;
				line-height: 20px;
			}
		}
	}
</style>