<template>
		<div class="order-container" style="height: 100%;">
			
			<empty v-show="isShowNodata || isShowNoNetwork" @btnClick="refreshData" :tipText="emptyTip" :emptyIcon="emptyIcon"></empty>
			<mescroll-vue v-show="!(isShowNodata || isShowNoNetwork)"  ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
				<list-cell 
					v-for="(item, index) in dataArray" 
					:key="index" :orderInfo="item" 
					:checkImg="selectedImg(index)" 
					@click.native="selectedIndex = index">
				</list-cell>			
			</mescroll-vue>
			
			<div v-show="this.dataArray.length > 0" class="order-bottom">
				<label>开票金额: ¥<span>{{ invoiceMoney }}</span></label>
				<button :disabled="selectedIndex < 0" @click="writeInvoice" :style="{backgroundColor: selectedIndex < 0 ? '#d6d6d6' : '#49A6FF'}">开具发票</button>
			</div>
		</div>
</template>

<script>
	import MescrollVue from 'mescroll.js/mescroll.vue'
	import ListCell from '@/components/listCell' 
	import Empty from '@/components/empty'
	import choseImg from '@/img/icon_invoice_chose.png'
	import nochoseImg from '@/img/icon_invoice_nochose.png'
	import nodataImg from '@/img/icon_nodata.png'
	import nonetworkImg from '@/img/icon_nonetwork.png'
	import { request_OrderList } from '@/request/api' 
	
	export default {
		name: 'order',
		components: { ListCell, MescrollVue, Empty },
		data() {
			return {
				temScrollOffset: 0,
				monScrollOffset: 0,
				temDataArray: [],
				monDataArray: [],
				temSelectedIndex: -1,
				monSelectedIndex: -1,
				mescroll: null,
				mescrollDown: {},
				mescrollUp: {
					callback: this.upCallback,
					moMoreSize: 1,
					page: {
						num: 0	,		//当前页，回调之前会加1
						size: 10
					},
					htmlNodata: '<p class="upwarp-nodata">-- 暂无更多数据 --</p>'
				},
				isShowNodata: false,
				isShowNoNetwork: false
			}
		},
		computed: {
			dataArray: {
				get() {
					return this.$route.params.type === 'tem' ? this.temDataArray : this.monDataArray
				},
				set(value) {
					if (this.$route.params.type === 'tem') {
						this.temDataArray = value
					} else {
						this.monDataArray = value						
					}
				}
			},
			scrollOffset: {
				get() {
					return this.$route.params.type === 'tem' ? this.temScrollOffset : this.monScrollOffset
				},
				set(value) {
					if (this.$route.params.type === 'tem') {
						this.temScrollOffset = value
					} else {
						this.monScrollOffset = value						
					}
				}
			},
			selectedIndex: {
				get() {
					if (this.$route.params.type === 'tem') {
						return this.dataArray.length - 1 < this.temSelectedIndex ? -1 : this.temSelectedIndex
					} else {
						return this.dataArray.length - 1 < this.temSelectedIndex ? -1 : this.monSelectedIndex
					}
					
				},
				set(value) {
					if (this.$route.params.type === 'tem') {
						this.temSelectedIndex = value
					} else {
						this.monSelectedIndex = value						
					}
				}
			},
			invoiceMoney() {
				const selectedData = this.dataArray[this.selectedIndex]
				if (selectedData) {
					return selectedData['orderCostReal']	
				} else {
					return '0'
				}
			},
			emptyTip() {
				if (this.isShowNodata) {
					return this.$route.params.type === 'tem' ? '暂无临停订单数据' : '暂无包月订单数据'
				} else if (this.isShowNoNetwork) {
					return '似乎与互联网连接断开了'
				}
			},
			emptyIcon() {
				if (this.isShowNodata) {
					return nodataImg
				} else if (this.isShowNoNetwork) {
					return nonetworkImg
				}
			}
		},
		methods: {
			selectedImg(index) {
				return this.selectedIndex === index ? choseImg : nochoseImg
			},
			//过滤已开开票数据(10未开,11已开)
			filterData(array) {
				return array.filter(item => item.invoiceStatus === 10)	
			},
			//点击开具发票按钮事件
			writeInvoice() {
				const selectedData = this.dataArray[this.selectedIndex]
				const params = {
					money: selectedData['orderCostReal'],
					parkId: selectedData['parkId'],
					peyedIdArray: selectedData['payedRecordId'],
					carNumArray: selectedData['carNum'],
					orderType: this.$route.params.type === 'tem' ? 1 : 2
				}
				this.$router.push({name: 'invoiceInfo', params: params})
			},
			//点击刷新重新加载数据
			refreshData() {
				this.isShowNodata = false,
				this.isShowNoNetwork = false
				this.mescroll.showDownScroll();
				setTimeout(() => {
					this.mescroll.resetUpScroll()
				}, 500)
			},
			mescrollInit (mescroll) {
				this.mescroll = mescroll
			},
			upCallback(page, mescroll) {
				request_OrderList(this.$route.params.type, page.num, page.size).then(data => {
					const arr = data.data
					if (page.num === 1) this.dataArray = []
					this.dataArray = this.filterData(this.dataArray.concat(arr))
					this.isShowNodata = this.dataArray.length <= 0
					this.$nextTick(() => {
						mescroll.endBySize(arr.length, data.totals)
					})
				}).catch(error => {
					mescroll.endErr()
					this.isShowNoNetwork = this.dataArray.length <= 0
				})
			}
		},
		created() {
			this.$store.dispatch('delete_noCachedRouter', 'order')
			this.$store.dispatch('delete_noCachedOrderRoute')
		},
		activated() {
			//保存主页路径
			this.$store.dispatch('setHomePath', this.$route.fullPath)			
	}
	}
</script>

<style lang="scss" scoped>
	$bottom-height: 50px;

	.order-container {
		position: relative;
		.mescroll {
			position: absolute;
			top: 0;
			bottom: $bottom-height;
			height: auto;
		}
		.order-bottom {
			position: absolute;
			left: 0;
			bottom: 0px;
			width: 100%;
			height: $bottom-height;
			background-color: white;
			box-shadow: 0 -1px 0px #efefef;
			label {
				float: left;
				width: calc(100% - 100px);
				height: 100%;
				line-height: $bottom-height;
				padding-left: 20px;
				font-size: 17px;
			}
			button {
				float: right;
				width: 100px;
				height: 100%;
				border: none;
				color: white;
				font-size: 17px;
			}
		}
	}
</style>