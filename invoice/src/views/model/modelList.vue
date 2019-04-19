<template>
	<div v-show="!isLoading" class="modelList-container">
		<empty 
			v-show="isShowNoNetwork || isShowNoData" 
			:btnShow="isShowNoNetwork" 
			:tipText="emptyTip"
			:emptyIcon="emptyIcon"
			@btnClick="requestModelList">
		</empty>
		
		<model-list-item
			class="modelListItem" 
			v-for="(item, index) in dataArray" 
			:modelInfo="item"
			:index="index" 
			:key="item.templateId"
			@defaultModel = "defaultModel"
			@deleteModel = "deleteModel"
			@editModel = "editModel"
		>
		</model-list-item>
		<x-button 
			class="addModelBtn" 
			type="primary" 
			@click.native="addModelAction" 
			v-show="dataArray.length < 2"
		>新增模版</x-button>
	</div>
</template>

<script>
	import ModelListItem from '@/components/modelListItem'
	import Empty from '@/components/empty'
	import nodataImg from '@/img/icon_nodata.png'
	import nonetworkImg from '@/img/icon_nonetwork.png'
	import { request_getInvoiceTemplate, request_defaultInvoiceModel, request_deleteInvoiceModel } from '@/request/api'
	
	export default {
		name: 'modelList',
		components: { ModelListItem, Empty },
		data() {
			return {
				dataArray: [],
				isLoading: true,
				isShowNoNetwork: false,
				scrollOffset: 0
			}
		},
		computed: {
	  		emptyTip() {
	  			let tip = ''
	  			if (this.isShowNoData) {
	  				tip = '您当前还未添加发票模版'
	  			}  
	  			if (this.isShowNoNetwork) {
	  				tip = '似乎与互联网连接断开了'
	  			}
	  			return tip
	  		},
	  		emptyIcon() {
	  			let icon = ''
				if (this.isShowNoData) {
					icon = nodataImg
				}  
				if (this.isShowNoNetwork) {
					icon = nonetworkImg
				}
				return icon
			},
	  		isShowNoData() {
	  			return this.dataArray.length <= 0
	  		}
	  },
		methods: {
			defaultModel(index) {
				if (this.dataArray[index].defaultType !== 1) {
					this.$vux.loading.show()
					request_defaultInvoiceModel(this.dataArray[index]['templateId']).then(data => {
						this.$vux.loading.hide()
						this.$vux.toast.text('设为默认成功')
						this.requestModelList()
					}).catch(error => {
						this.$vux.loading.hide()
					})
				}
			},
			deleteModel(index) {
				const _this = this
	  			this.$vux.confirm.show({
	  				title: '操作提示',
	  				content: '确定删除该模版吗?',
				  onConfirm () {
				  		_this.$vux.loading.show()
				  		
				  		request_deleteInvoiceModel(_this.dataArray[index]['templateId']).then(data => {
				  			_this.$vux.loading.hide()
				  			_this.requestModelList()
				  		}).catch(error => {
				  			_this.$vux.loading.hide()
				  		})
				  }
				})
			},
			editModel(index) {
				const params = Object.assign(this.dataArray[index], {type: 'edit'})
				this.$router.push({name: 'addModel', params: params})
			},
			addModelAction() {
				this.$router.push('/model/add')
			},
			requestModelList() {
				this.$vux.loading.show()
				request_getInvoiceTemplate().then(data => {
					this.$vux.loading.hide()
					this.isLoading = false
		  			this.isShowNoNetwork = false
					//将默认模版放在首位
					for (let i = 0; i < data.length; i++) {
						if (data[i].defaultType === 1) {
							const deleteArray = data.splice(i, 1)
							data.unshift(deleteArray[0])
							break
						}
					}
					this.dataArray = data
				}).catch(error => {
					this.$vux.loading.hide()
					this.isLoading = false
		  			this.isShowNoNetwork = this.dataArray <= 0
				})
			}
		},
		//从个人中心进入会调用该方法
		created() {
			this.$store.dispatch('delete_noCachedRouter', 'modelList')
			this.requestModelList()
		},
		//从添加和编辑进入会调用该方法
		activated() {
			this.viewBox(this).scrollTo(this.scrollOffset)
			//判断是否需要刷新数据
			if (this.$route.params.reload) {
				this.requestModelList()	
			}
			//判断是否需要滚动到顶部
			if (this.$route.params.scrollTop) {
				this.viewBox(this).scrollTo(0)	
			}
		},
		beforeRouteLeave(to, from, next) {
			this.scrollOffset = this.viewBox(this).getScrollTop()
	  		if (to.params.type === 'edit' && !to.params.templateId) {
	  			//需要将历史记录返回到modelList
					this.$router.go(-1)
	  			return
	  		}
	  		next()
	  },
	}
</script>

<style lang="scss" scoped>
	.modelList-container {
		.modelListItem:not(:first-child) {
			margin-top: 7px;
		}
		.addModelBtn {
			width: calc(100% - (#{$margin} * 2));
			margin-top: 50px;
			margin-bottom: 20px;
		}
	}
</style>
