<template>
	<div class="login-container">
		<group gutter="0">
			<x-input class="telephone" placeholder="请输入手机号码" v-model="telephone">
				<img slot="label" src="../../img/telephone.png">
			</x-input>
			<x-input class="authcode" placeholder="请输入6位验证码" v-model="authcode" :show-clear="false">
				<img slot="label" src="../../img/code.png">
				<x-button 
					class="getCodeBtn" 
					slot="right" 
					:disabled="getCodeBtnEnable" 
					:style="{backgroundColor: getCodeBtnEnable ? '#d6d6d6' : '#e58700'}" 
					@click.native="getCodeAction">{{ getCodeBtnText }}
				</x-button>
			</x-input>
			<x-input class="password" type="password" :placeholder="this.$route.params.type === 'register' ? '6-20位密码,字母/数字/下划线' : '请输入新密码'" v-model="password">
				<img slot="label" src="../../img/icon_password.png">
			</x-input>
		</group>
		<x-button class="nextBtn" type="primary" :disabled="nextBtnEnable" @click.native="nextAction">{{ this.$route.params.type === 'register' ? '注 册' : '确 定' }}</x-button>
		<label class="userProtocol" v-if="$route.params.type === 'register'">注册即代表接受<span @click="$router.push('/protocol')">《车享享用户协议》</span></label>
	</div>
</template>

<script>
	import { request_CheckSliding, request_Verify, request_GetCode, request_RegisterOrFindPassword, request_getIpAddress } from '@/request/api'
	import { checkPhone, checkAuthcode, checkPassword } from '@/utils'
	import '@/utils/gt'
	
	export default {
		name: 'password',
		data() {
			return {
				timer: null,
				captchaObj: null,
				telephone: '',
				authcode: '',
				password: '',
				getCodeBtnEnable: false,
				getCodeBtnText: '获取验证码',
				
				ipAddress: '127.0.0.1',
				
				showSlidingError: false	,				//是否显示加载滑块验证错误
				showSlidingAuto: false					//是否初始化后自动弹出验证
			}
		},
		computed: {
			nextBtnEnable() {
				return !(checkPhone(this.telephone) && checkAuthcode(this.authcode) && checkPassword(this.password))
			}
		},
		methods: {
			nextAction() {
				const type = this.$route.params.type
				this.$vux.loading.show()
				const _this = this 
				request_RegisterOrFindPassword(type, this.telephone, this.authcode, this.password).then(data => {
					this.$vux.loading.hide()
					if (type === 'register') {				//注册成功,跳转主页(暂不支持)
//						this.$store.dispatch('login', Object.assign(userInfo, {phone: this.telephone}))
						this.$vux.alert.show({
						  title: '操作提示',
						  content: '注册成功,快去登录吧!',
						  onHide () {
						    _this.$router.replace('/login')
						  }
						})
					} else {							//找回密码成功,跳转登录
						this.$vux.alert.show({
						  title: '操作提示',
						  content: '重置密码成功,快去登录吧!',
						  onHide () {
						    _this.$router.replace('/login')
						  }
						})
					}
				}).catch(error => {
					this.$vux.loading.hide()
				})
			},
			//获取验证码
			getCodeAction() {
				if (!checkPhone(this.telephone)) {
					this.$vux.toast.text('请输入正确的手机号码')
					return
				}
				
				if (this.captchaObj) {
					this.captchaObj.verify()	
				} else {
					//假设进入页面初始化滑块对象失败
					this.showSlidingError = true
					this.showSlidingAuto = true
					this.checkSliding()
				}
			},
			//开始倒计时
			startTimer(count) {
				this.timer = setInterval(() => {
					if (count > 0) {
						this.getCodeBtnText = count + 's'
						this.getCodeBtnEnable = true
						count -= 1
					} else {
						this.getCodeBtnText = '获取验证码'
						this.getCodeBtnEnable = false
						if (this.timer) {
							clearInterval(this.timer)
						}
					}
				}, 1000)
			},
			//滑块验证
			checkSliding() {
				const _this = this
				request_CheckSliding().then(data => {
					initGeetest({
	          gt: data.gt,
	          challenge: data.challenge,
	          offline: !data.success,
	          new_captcha: true,
	          product: 'bind',
	          https: true
	      }, function (captchaObj) {
	         	_this.captchaObj = captchaObj
	         
	         	//防止初次进入页面初始化滑块失败后，点击"获取验证码"再次初始化后不弹出验证
						captchaObj.onReady(function () {
							if (_this.showSlidingAuto) {
		         		captchaObj.verify()	
		         	}	
						})
	         	
	         	captchaObj.onSuccess(function () {
	         		const result = captchaObj.getValidate()
	         		if(_this.$route.params.type === 'register') {			//注册
	         			request_Verify(_this.telephone).then(data => {
									_this.getAuthcode(result)
								})	
	         		} else {				//找回密码
	         			_this.getAuthcode(result)
	         		}
	         	})
	      		})
				}).catch(error => {
					if (this.showSlidingError) {
						this.$vux.toast.show({
							type: 'text',
							text: error.message
						})	
					}
				})
			},
			//获取验证码接口
			getAuthcode(geetest) {
				this.$vux.loading.show({
					text: '发送中...'
				})
				
				const params = {
					accountPhone: this.telephone,
					ipAddress: this.ipAddress,
					geetest_challenge: geetest.geetest_challenge,
					geetest_validate: geetest.geetest_validate,
					geetest_seccode: geetest.geetest_seccode
				}
				request_GetCode(params).then((data) => {
					this.$vux.loading.hide()
					this.$vux.toast.show({
						text: '验证码已发送',
						time: 1000
					})
					this.startTimer(60)
				}).catch((error) => {
					this.$vux.loading.hide()
				});
			}
		},
		created() {
			this.checkSliding()
			request_getIpAddress().then(data => {
				this.ipAddress = data.origin
			})
		},
		beforeRouteLeave(to, from, next) {
			//销毁定时器
			if (this.timer) {
				clearInterval(this.timer)
			}
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
		.authcode {
			height: 60px;
			img {
				width: 15px;
				margin-right: 10px;
			}
			.getCodeBtn {
				width: 105px;
				color: white;
				font-size: 15px;
			}
		}
		
		.password {
			height: 60px;
			img {
				width: 15px;
				margin-right: 10px;
			}
		}
		
		.nextBtn {
			width: calc(100% - (#{$margin} * 2));
			margin-top: 50px;
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

