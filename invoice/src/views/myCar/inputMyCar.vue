<template>
	<div class="inputMyCar-container">
		<div class="carNumCell">
			<label>车牌号码</label>
			<label class="carNum">{{ carNum }}</label>
		</div>
		<x-button class="sureBtn" type="primary" @click.native="sureAction">{{ $route.params.type === 'edit' ? '保 存' : '添 加' }}</x-button>
		
		<car-num-keyboard @on-changed="carNumChanged" :defaultCarNum="$route.params.carNum"></car-num-keyboard>
	</div>
</template>

<script>
	import CarNumKeyboard  from '@/components/carNumKeyboard'
	import { checkCarNum } from '@/utils'
	import { request_addMyCar, request_updateMyCar } from '@/request/api'
	
	export default {
		name: 'inputMyCar',
		components: { CarNumKeyboard },
		data() {
			return {
				carNum: ''
			}
		},
		methods: {
			sureAction() {
				if (!checkCarNum(this.carNum)) {
					this.$vux.toast.text('请输入正确的车牌号码')
					return
				}
				
				this.$vux.loading.show()
				if(this.$route.params.type === 'edit') {
					request_updateMyCar(this.carNum, this.$route.params.carNumId).then(data => {
						this.$vux.loading.hide()
						this.refreshOtherData()
						this.$router.replace({name: 'myCarList', params: {reload: true}})
						this.$router.go(-1)
					}).catch(error => {
						this.$vux.loading.hide()
					})
				} else {
					request_addMyCar(this.carNum).then(data => {
						this.$vux.loading.hide()
						this.refreshOtherData()
						this.$router.replace({name: 'myCarList', params: {reload: true}})
						this.$router.go(-1)
					}).catch(error => {
						this.$vux.loading.hide()
					})
				}
				
			},
			carNumChanged(carNum) {
				this.carNum = carNum
			},
			refreshOtherData() {
				this.$store.dispatch('add_noCachedRouter', 'order')				
				this.$store.dispatch('set_noCachedOrderRoute')						 	
				this.$store.dispatch('add_noCachedRouter', 'record')
			}
		},
		created() {
			if (this.$route.params.type === 'edit') {
				this.carNum = this.$route.params.carNum
			}
		},
		beforeRouteLeave(to, from , next) {
	  		if (to.name === 'myCarList') {
	  			this.$store.dispatch('delete_noCachedRouter', to.name)
	  		}
	  		next()
	  }
	}
</script>

<style lang="scss" scoped>
	.inputMyCar-container {
		.carNumCell {
			padding: 0 $margin;
			height: 80px;
			line-height: 80px;
			background-color: white;
			.carNum {
				float: right;
			}
		}
		.sureBtn {
			width: calc(100% - (#{$margin}) * 2);
			margin-top: 50px;
		}
	}
</style>