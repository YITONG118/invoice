<template>
	<div class="changePassword-container">
		<group gutter="0">
			<x-input title="旧密码" type="password" v-model="oldPassword" placeholder="请输入旧密码"></x-input>
			<x-input title="新密码" type="password" v-model="newPassword" placeholder="请输入新密码"></x-input>
			<x-input title="新密码" type="password" v-model="againNewPassword" placeholder="请再次输入新密码"></x-input>
		</group>
		<x-button class="sureBtn" type="primary" @click.native="sureAction" :disabled="sureBtnEnable">确 认</x-button>
	</div>
</template>

<script>
	import { request_ChangePassword } from '@/request/api'
	import { checkPassword } from '@/utils'
	
	export default {
		name: 'changePassword',
		data() {
			return {
				oldPassword: '',
				newPassword: '',
				againNewPassword: ''
			}
		},
		computed: {
			sureBtnEnable() {
				return !(this.oldPassword.length > 0 && this.newPassword.length > 0 && this.againNewPassword.length > 0)
			}
		},
		methods: {
			sureAction() {
				if (!checkPassword(this.newPassword)) {
					this.$vux.toast.show({
							type: 'text',
							text: '请输入正确的新密码'
						})	
					return
				}
				
				if (this.newPassword !== this.againNewPassword) {
					this.$vux.toast.show({
							type: 'text',
							text: '两次输入的密码不一致'
						})	
					return
				}
				
				if (this.oldPassword === this.newPassword) {
					this.$vux.toast.show({
							type: 'text',
							text: '旧密码和新密码不能一致'
						})	
					return
				}
				
				this.$vux.loading.show()
				const _this = this
				request_ChangePassword(this.oldPassword, this.newPassword).then(data => {
					this.$vux.loading.hide()
					this.$vux.alert.show({
					  title: '操作提示',
					  content: '密码修改成功',
					  onHide () {
					    _this.$router.replace('/personal')
					  }
					})
				}).catch(error => {
					this.$vux.loading.hide()
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.changePassword-container {
		.weui-cell {
			height: 50px;
		}
		.sureBtn {
			width: calc(100% - (#{$margin}) * 2);
			margin-top: 50px;
		}
	}
</style>