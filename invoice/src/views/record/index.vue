<!--<template>
	<div>开票历史
		<div>
			<p v-for="i in 100">{{i}}</p>
		</div>
	</div>
</template>

<script>	
	export default {
		name: 'record',
		data() {
			return {
				scrollOffset: 0
			}
		},
		methods: {
		
		},
		created() {
			console.log('开票历史created')
		},
		mounted() {
			console.log('开票历史mouted')
		},
		updated() {
			console.log('开票历史updated')
		},
		destroyed() {
			console.log('开票历史destroy')
		},
		activated() {
			this.viewBox(this).scrollTo(this.scrollOffset)
			console.log('开票历史activated')
		},
		deactivated() {
//			this.scrollOffset = this.viewBox(this).getScrollTop()
			console.log('开票历史deactivated')
		},
		beforeRouteLeave(to, from, next) {
			this.scrollOffset = this.viewBox(this).getScrollTop()
			next()
		}
	}
</script>-->
	

<template>
	<div class="record-container">
		<empty v-show="isShowNodata || isShowNoNetwork" @btnClick="refreshData" :tipText="emptyTip" :emptyIcon="emptyIcon"></empty>
		
		<mescroll-vue v-show="!(isShowNodata || isShowNoNetwork)" ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
			<record-list-item 
				v-for="(item, index) in dataArray" 
				:key="item.invoiceId" 
				:recordInfo="dataArray[index]"
				@click.native="detailInfo(index)"
			>
			</record-list-item>
		</mescroll-vue></mescroll-vue>
	</div>
</template>

<script>	
	import MescrollVue from 'mescroll.js/mescroll.vue'
	import Empty from '@/components/empty'
	import RecordListItem from '@/components/recordListItem'
	import nodataImg from '@/img/icon_nodata.png'
	import nonetworkImg from '@/img/icon_nonetwork.png'
	import { request_getInvoiceRecord } from '@/request/api'
	
	export default {
		name: 'record',
		components: { RecordListItem, MescrollVue, Empty },
		data() {
			return {
				scrollOffset: 0,
				dataArray: [],
				isShowNodata: false,
				isShowNoNetwork: false,
				mescroll: null,
				mescrollDown: {},
				mescrollUp: {
					callback: this.upCallback,
					noMoreSize: 1,
					page: {
						num: 0	,		//当前页，回调之前会加1
						size: 10
					},
					htmlNodata: '<p class="upwarp-nodata">-- 暂无更多数据 --</p>'
				},
			}
		},
		computed: {
			emptyTip() {
				if (this.isShowNodata) {
					return '您当前没有开票历史记录'
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
			detailInfo(index) {
				this.$router.push({name: 'recordDetail', params: this.dataArray[index]})
			},
			mescrollInit (mescroll) {
				this.mescroll = mescroll
			},
			upCallback(page, mescroll) {
				request_getInvoiceRecord(page.num, page.size).then(data => {
					const arr = data.data
					if (page.num === 1) this.dataArray = []
					this.dataArray = this.dataArray.concat(arr)
					this.isShowNodata = this.dataArray.length <= 0
					this.$nextTick(() => {
						mescroll.endBySize(arr.length, data.totals)
					})
				}).catch(error => {
					mescroll.endErr()
					this.isShowNoNetwork = this.dataArray.length <= 0
				})
			},
			refreshData() {
				this.isShowNodata = false
				this.isShowNoNetwork = false
				this.mescroll.showDownScroll();
				setTimeout(() => {
					this.mescroll.resetUpScroll()
				}, 500)
			},
		},
		created() {
			this.$store.dispatch('delete_noCachedRouter', 'record')
		},
		activated() {
			this.viewBox(this).scrollTo(this.scrollOffset)
		},
		beforeRouteLeave(to, from , next) {
			this.scrollOffset = this.viewBox(this).getScrollTop()
			next()
		}
	}
</script>

<style lang="scss" scoped>
	.record-container {
		position: relative;
		height: 100%;
		.mescroll {
			position: absolute;
			top: 0;
		}
	}
</style>