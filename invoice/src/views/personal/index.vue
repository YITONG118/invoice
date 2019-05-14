<!--<template>
	<div>个人中心
		<div>
			<p v-for="i in 100">{{i}}</p>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'personal',
		data() {
			return {
				scrollOffset: 0
			}
		},
		created() {
			console.log('个人中心created')
		},
		mounted() {
			console.log('个人中心mouted')
		},
		updated() {
			console.log('个人中心updated')
		},
		destroyed() {
			console.log('个人中心destroy')
		},
		activated() {
			this.viewBox(this).scrollTo(this.scrollOffset)
			console.log('个人中心activated')
		},
		deactivated() {
			//将该方法写在deactivated导致的问题:当要切换到的路由没有滚动条时,获取的始终为0，即下次进入该界面时滚动条还是始终在顶部
//			this.scrollOffset = this.viewBox(this).getScrollTop()
		},
		beforeRouteLeave(to, from , next) {
			this.scrollOffset = this.viewBox(this).getScrollTop()
			next()
		}
	}
</script>-->

<template>
	<div class="personal-container">
		<div class="personalInfo">
			<img src="../../img/personal-logo.png">
			<p class="phone">{{ phone }}</p>
		</div>
		
		<div class="invoiceCount">
			<div class="invoiceCount-bulge">
				<p class="bulge-message">已开票订单</p>
				<p class="bulge-count">{{ invoiceCount }}</p>
			</div>
		</div>
		
		<div class="tableView">
			<group gutter="4px">
		      <cell title="发票模板" is-link link="/modelList">
		        <img slot="icon" width="18" src="../../img/icon_my_template.png">
		      </cell>
		      <cell title="我的车辆" is-link link="/myCarList">
		        <img slot="icon" width="19" src="../../img/icon_my_car.png">
		      </cell>
		      <cell title="修改密码" is-link link="/changePassword">
		        <img slot="icon" width="18" src="../../img/icon_editPassword.png">
		      </cell>
		      <cell title="发票帮助" is-link link="/invoiceHelp">
		        <img slot="icon" width="18" src="../../img/icon_my_qus.png">
		      </cell>
		      <cell title="车享享《用户服务协议》" is-link link="/protocol">
		        <img slot="icon" width="18" src="../../img/icon_my_agreement.png">
		      </cell>
		    </group>
			</div>
			
			<x-button class="logoutBtn" type="primary" @click.native="logoutAction">退出登录</x-button>
		</div>
	</div>
</template>

<style lang="scss">
	.personal-container {
		color: $text;
		/*个人信息部分*/
		.personalInfo {
			background-color: black;
			img {
				margin: 53px auto 0 auto;
				width: 58px;
			}
			.phone {
				margin: 10px 0;
				padding-bottom: 20px;
				text-align: center;
				color: white;
			}
		}
		
		/*已开发票信息*/
		.invoiceCount {
			background-color: white;
			height: 88px;
			text-align: center;
			padding: 0 $margin;
			overflow: visible;
			.invoiceCount-bulge {
				position: relative;
				top: -20px;
				height: 100%;
				background-color: white;
				box-shadow: 0 0 10px #dfdfdf;
				.bulge-message {
					margin-top: 14px;
					font-size: 15px;
				}
				.bulge-count {
					font-weight: bold;
					font-size: 23px;
				}	
			}
		}
		
		/*列表*/
		.tableView {
			img {
				margin-right: 12px;
			}
		}
		
		.weui-cell {
			height: 50px;
		}
		
		/*解决overflow:hiddle会导致箭头不显示*/
		.weui-cell_access .weui-cell__ft {
			overflow: visible;
		}
		
		.weui-cells {
			font-size: 14px;
		}
		
		/*退出登录*/
		.logoutBtn {
			width: calc(100% - (#{$margin} * 2));
			margin-top: 50px;
			margin-bottom: 20px;
		}
	}
</style>

<script>
	import { request_Logout, request_opendInvoiceCount } from '@/request/api'  
	import { setInvoiceCount, getInvoiceCount } from '@/utils/token'
	import { mapGetters } from 'vuex' 
	
	export default {
		name: 'personal',
		data() {
			return {
				scrollOffset: 0,
				invoiceCount: 0
			}
		},
		computed: {
			...mapGetters(['phone'])
		},
	  methods: {
	  		logoutAction() {
	  			const _this = this
	  			this.$vux.confirm.show({
	  				title: '操作提示',
	  				content: '确定退出吗?',
				  onConfirm () {
				  		_this.$vux.loading.show()
				  		request_Logout().then(data => {
				  			_this.$vux.loading.hide()
				  			_this.$store.dispatch('logout')
				  			_this.$router.replace('/')
				  		}).catch(error => {
				  			_this.$vux.loading.hide()
				  		})
				  }
				})
	  		}
	  },
	  activated() {
		  	this.viewBox(this).scrollTo(this.scrollOffset)
		  	if (getInvoiceCount()) {
		  		this.invoiceCount = getInvoiceCount()	
		  	}
		  	request_opendInvoiceCount().then(data => {
		  		setInvoiceCount(data)
		  		this.invoiceCount = data
		  	})
	  },
	  beforeRouteLeave(to, from , next) {
	  		this.scrollOffset = this.viewBox(this).getScrollTop()      //记录滚动条不能写在deactivated中
	  		if (['modelList', 'myCarList'].indexOf(to.name) > -1) {
	  			this.$store.dispatch('add_noCachedRouter', to.name)
	  		}
	  		next()
	  }
	}
</script>

