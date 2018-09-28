<template>
	<div class="login-container">
		<group gutter="0">
			<x-input class="telephone" placeholder="请输入手机号码" type="number" @on-change="telephoneChanged" v-model="telephone">
				<img slot="label" src="../../img/telephone.png">
			</x-input>
			<x-input class="authcode" placeholder="请输入验证码" type="number" @on-change="authcodeChanged" v-model="authcode" :show-clear="false">
				<img slot="label" src="../../img/code.png">
				<x-button class="getCodeBtn" slot="right" @click.native="getCodeAction">获取验证码</x-button>
			</x-input>
		</group>
		<x-button class="nextBtn" type="primary" :disabled="nextBtnEnable" @click.native="nextAction">下一步</x-button>
		<label>登录即代表接受<span @click="userProtocolAction">《车享享用户协议》</span></label>
		<div>
			<p v-for="i in 100">{{i}}</p>
		</div>
	</div>
</template>

<script>
	import { getToken, setToken, removeToken } from '@/utils/token'
	import { request_Login } from '@/request/api'
	
	export default {
		name: 'login',
		data() {
			return {
				telephone: '',
				authcode: '',
				telephoneEnable: false,
				authcodeEnable: false
			}
		},
		computed: {
			nextBtnEnable() {
				return !(this.telephoneEnable && this.authcodeEnable)
			}
		},
		methods: {
			nextAction() {
				this.$vux.loading.show({
					text: '登录中...'
				})
				setToken('买了否冷')
				this.$router.replace('/')
			},
			getCodeAction() {
				
				if (this.telephone.length !== 11) {
					this.$vux.toast.text('请输入正确的手机号码')
					return
				}
					
				this.$vux.loading.show({
					text: '发送中...'
				})
	
				request_Login().then((data) => {
					this.$vux.loading.hide()
					this.$vux.toast.show({
						text: '验证码已发送',
						time: 1000
					})
				}).catch((error) => {
					this.$vux.loading.hide()
				});
			},
			userProtocolAction() {
				this.$router.push('/protocol')
			},
			telephoneChanged() {
				return this.telephoneEnable = this.telephone.length === 11
			},
			authcodeChanged() {
				return this.authcodeEnable = this.authcode.length === 6
			}
		}
	}
</script>

<style lang="scss" scoped>
	.login-container {
		.telephone {
			height: 60px;
			img {
				width: 12px;
				margin-right: 13px;
			}
		}
		.authcode {
			height: 60px;
			img {
				width: 15px;
				margin-right: 10px;
			}
			.getCodeBtn {
				background-color: $orange;
				font-size: 15px;
			}
		}
		
		.nextBtn {
			width: calc(100% - (#{$margin} * 2));
			margin-top: 50px;
		}	
		
		label {
			display: block;
			text-align: center;
			margin-top: 20px;
			font-size: 14px;
			span {
				color: $blue;
			}
		}
	}
</style>

