<template>
	<div class="login-container">
		<group gutter="0">
			<x-input class="telephone" placeholder="请输入手机号码" v-model="telephone">
				<img slot="label" src="../../img/telephone.png">
			</x-input>
			<x-input class="password" type="password" placeholder="请输入账户密码" v-model="password">
				<img slot="label" src="../../img/code.png">
			</x-input>
		</group>
		<div class="others">
			<label class="forgetPassword" @click="$router.push('/password/findPassword')">忘记密码?</label>
			<label class="register" @click="$router.push('/password/register')">新用户注册</label>
		</div>
		<x-button class="loginBtn" type="primary" :disabled="loginBtnEnable" @click.native="login">登 录</x-button>
		<label class="userProtocol">登录即代表接受<span @click="$router.push('/protocol')">《车享享用户协议》</span></label>
	</div>
</template>

<script>
	import { request_Login } from '@/request/api'
	
	export default {
		name: 'login',
		data() {
			return {
				telephone: '',
				password: ''
			}
		}, 
		computed: {
			loginBtnEnable() {
				return !(this.telephone.length > 0 && this.password.length > 0)
			}
		},
		methods: {
			login() {
				this.$vux.loading.show({
					text: '登录中...'
				})
				
				request_Login(this.telephone, this.password).then((userInfo) => {
					this.$vux.loading.hide()
					this.$store.dispatch('login', Object.assign(userInfo, {phone: this.telephone}))
					this.$router.replace('/')
				}).catch((error) => {
					this.$vux.loading.hide()
				})
			}
		},
		beforeRouteLeave(to, from, next) {
	  		//刷新将要的进入页面,而不是进入缓存的页面
	  		this.$store.dispatch('add_noCachedRouter', 'order')				
			this.$store.dispatch('set_noCachedOrderRoute')						 	
			this.$store.dispatch('add_noCachedRouter', 'record') 
			next()
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
		.password {
			height: 60px;
			img {
				width: 15px;
				margin-right: 10px;
			}
		}
		.loginBtn {
			width: calc(100% - (#{$margin}) * 2);
		}
		.others {
			padding: 12px $margin;
			.register,
			.forgetPassword {
				display: inline-block;
				height: 30px;
				line-height: 30px;
				color: $blue;
			}
			.register {
				float: right;
			}
		}
		.userProtocol {
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
	