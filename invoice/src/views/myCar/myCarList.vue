<template>
	<div v-show="!isLoading" class="myCarList">
		
		<empty 
			v-show="isShowNoNetwork || isShowNoData" 
			:btnShow="isShowNoNetwork" 
			:tipText="emptyTip" 
			:emptyIcon="emptyIcon"
			@btnClick="requestMyCarList"
		>
		</empty>
		
		<swipeout>
      <swipeout-item 
      		ref="swipItem" 
      		transition-mode="follow" 
      		v-for="(item,index) in dataArray" 
      		:key="index"
      	>
        <div slot="right-menu">
          <swipeout-button @click.native="editCarNum(index)" type="primary">编 辑</swipeout-button>
          <swipeout-button @click.native="deleteCarNum(index)" type="warn">删 除</swipeout-button>
        </div>
        <div slot="content" class="carNum" :class="{'vux-1px-t' : index !== 0}">
        		<label>{{ item.carNum }}</label>
        		<img @click="open(index)" src="../../img/icon_edit.png" style="float: right;">
        </div>
      </swipeout-item>
    </swipeout>
	
		<x-button class="addCarNumBtn" v-show="dataArray.length < 2" type="primary" link="/myCar/add">{{ '添加车牌' }}</x-button>

    <div class="addCarNumTip">
	    	<span>说明 :</span>
	    	<div>
	    		<p>1、每个账户暂支持绑定两辆车</p>
				<p>2、绑定车辆后可在停车订单中选择进行电子发票操作</p>
				<p>3、如绑定车牌时提示车牌已在其他账户绑定，请联系客服处理，服务热线：400-900-3303</p>
	    	</div>
    </div>
	
	</div>
</template>

<script>
	import Empty from '@/components/empty'
	import { Swipeout, SwipeoutItem, SwipeoutButton } from 'vux'
	import { request_getMyCar, request_deleteMyCar } from '@/request/api'
	import nodataImg from '@/img/icon_nodata.png'
	import nonetworkImg from '@/img/icon_nonetwork.png'
	
	export default {
		name: 'myCarList',
		components: {
	    Swipeout,
	    SwipeoutItem,
	    SwipeoutButton,
	    Empty
	  },
	  data () {
	    return {
				dataArray: [],
				isLoading: true,
				isShowNoNetwork: false
	    }
	  },
	  computed: {
	  		emptyTip() {
	  			let tip = ''
	  			if (this.isShowNoData) {
	  				tip = '您当前还未绑定车辆'
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
	  		open(index) {
	  			this.$refs.swipItem[index].open('right')
	  		},
	  		editCarNum(index) {
	  			const params = {
	  				carNum: this.dataArray[index].carNum, 
	  				carNumId: this.dataArray[index].contactId, 
	  				type: 'edit'
	  			}
	  			this.$router.push({name: 'inputMyCar', params})
	  		},
	  		deleteCarNum(index) {
	  			const _this = this
	  			this.$vux.confirm.show({
	  				title: '操作提示',
	  				content: '确定删除该车辆吗?',
				  onConfirm () {
				  		_this.$vux.loading.show()
				  		request_deleteMyCar(_this.dataArray[index]['contactId']).then(data => {
				  			_this.$vux.loading.hide()
				  			_this.dataArray.splice(index, 1)
				  			_this.refreshOtherData()
				  		}).catch(error => {
				  			_this.$vux.loading.hide()
				  		})
				  }
				})
	  		},
	  		requestMyCarList() {
	  			this.$vux.loading.show()
	  			request_getMyCar().then(data => {
		  			this.$vux.loading.hide()
		  			this.isLoading = false
		  			this.isShowNoNetwork = false
		  			this.dataArray = data
		  		}).catch(error => {
		  			this.$vux.loading.hide()
		  			this.isLoading = false
		  			this.isShowNoNetwork = this.dataArray <= 0
		  		})
	  		},
	  		refreshOtherData() {
				this.$store.dispatch('add_noCachedRouter', 'order')				
				this.$store.dispatch('set_noCachedOrderRoute')						 	
				this.$store.dispatch('add_noCachedRouter', 'record')
			}
	  },
	  //从个人中心进入会调用该方法
		created() {
			this.$store.dispatch('delete_noCachedRouter', 'myCarList')
			this.requestMyCarList()
		},
		//从添加和编辑进入会调用该方法
		activated() {
			if (this.$route.params.reload) {
				this.requestMyCarList()
			}
		},
		beforeRouteLeave(to, from, next) {
	  		if (to.params.type === 'edit' && !to.params.carNum) {
	  			this.$router.go(-1)
	  			return 
	  		}
	  		next()
	  },
	}
</script>

<style lang="scss" scoped>
	
	.myCarList {
		.vux-1px-t:before {
			border-color: $viewBg;
		}	
		.carNum {
			padding: 0 $margin;
			color: $text;
			font-size: 18px;
			height: 80px;
			line-height: 80px;
			img {
				width: 18px;
				position: relative;
		    top: 50%;
		    transform: translateY(-50%);
			}
		}
		.addCarNumBtn {
			width: calc(100% - (#{$margin} * 2));
			margin-top: 50px;
		}
		
		.addCarNumTip {
			padding: 0 15px;
			font-size: 12px;
			color: #858585;
			line-height: 18px;
			margin-top: 20px;
			span {
				display: inline-block;
				padding: 5px 0;
			}
			p {
				padding: 3px 0;
			}
		}
	}
	
</style>