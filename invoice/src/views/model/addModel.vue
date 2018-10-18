<template>
	<div class="addModel-container">
		<group label-width="5em" gutter="0">
			<cell-box>
				<label style="width: 5em;">抬头类型</label>
				<input type="radio" id="company"  v-model="form.invoiceType" value="2">
				<label for="company">公司抬头</label>
				<input type="radio" id="personal" v-model="form.invoiceType" value="1">
				<label for="personal">个人抬头</label>
			</cell-box>
			<x-input title="发票抬头" v-model="form.invoiceName" placeholder="填写发票抬头"></x-input>
			<x-input title="税号" v-model="form.invoiceTaxNum" placeholder="填写纳税人识别号" v-show="form.invoiceType === '2'" mask="SSSS SSSS SSSS SSSS SSSS" :max="24"></x-input>
			<x-input title="手机号码" v-model='form.invoicePhone' placeholder="填写手机号码"></x-input>
		</group>

		<group title="非必填项" label-width="7em">
			<x-input title="备注说明" v-model="form.invoiceRemark" placeholder="填写备注说明"></x-input>
			<x-input title="地址" v-model="form.invoiceAddress" placeholder="填写地址"></x-input>
			<x-input title="开户行及账号" v-model="form.invoiceAccount" placeholder="填写开户行和账号"></x-input>
		</group>

		<x-button class="addModelBtn" type="primary" @click.native="sureAction">{{ $route.params.type === 'edit' ? '确认修改' : '确认添加' }}</x-button>
	
	</div>
</template>

<script>
	import { CellBox } from 'vux'
	import { checkPhone, trim } from '@/utils'
	import { request_addInvoiceModel, request_updateInvoiceModel } from '@/request/api'
	
	export default {
		name: 'addModel',
	  components: { CellBox },
	  data () {
	    return {
	    		form: {
	    			invoiceType: '2',
		    		invoiceName: '',
		    		invoiceTaxNum: '',
		    		invoicePhone: '',
		    		invoiceRemark: '',
		    		invoiceAddress: '',
		    		invoiceAccount: ''	
	    		}
	    }
	  },
	  methods: {
	  		sureAction() {
	  			if (this.form.invoiceName.length <= 0) {
					this.$vux.toast.text('请输入发票抬头')
					return
				}
				
				if (this.form.invoiceType === '2') {
					const number = trim(this.form.invoiceTaxNum)
					if (number.length != 15 && number.length != 18 && number.length != 20) {
						this.$vux.toast.text('纳税人识别号必须为15,18或20位')
						return
					}
				}
				
				if (!checkPhone(this.form.invoicePhone)) {
					this.$vux.toast.text('请输入正确的手机号码')
					return
				}
				
				const params = Object.assign({}, this.form)
					params.invoiceType = +params.invoiceType
					params.templateName = '我的模版'
					params.invoiceContent = '停车费用发票'
					if (params.invoiceType === 1) {
						params.invoiceTaxNum = ''
				}
				
				this.$vux.loading.show()
				if(this.$route.params.type === 'edit') {
					request_updateInvoiceModel(params).then(data => {
						this.$vux.loading.hide()
						this.$vux.toast.text('发票模版修改成功')
						this.$router.replace({name: 'modelList', params: {reload: true}})
						this.$router.go(-1)
					}).catch(error => {
						this.$vux.loading.hide()
					})
				} else {
					request_addInvoiceModel(params).then(data => {
						this.$vux.loading.hide()
						this.$router.replace({name: 'modelList', params: {reload: true, scrollTop: true}})	
						this.$router.go(-1)
					}).catch(error => {
						this.$vux.loading.hide()
					})
				}
				
	  		}
	  },
	  created() {
	  		if (this.$route.params.type === 'edit') {
	  			Object.assign(this.form, this.$route.params)
	  			this.form.invoiceType = String(this.form.invoiceType)
	  		}
	  },
	  beforeRouteLeave(to, from , next) {
	  		if (to.name === 'modelList') {
	  			this.$store.dispatch('delete_noCachedRouter', to.name)
	  		}
	  		next()
	  }
	}
</script>

<style lang="scss">
	.addModel-container {
		.weui-cell {
			height: 50px;
			color: $text;
		}
		
		.vux-x-input input::-webkit-input-placeholder {
			color: $placeholder;
		}
		
		#personal + label {
			margin-left: 30px;
		}
		
		input[type='radio'] {
			position: absolute;
			clip: rect(0, 0, 0, 0);
		}
		
		input[type='radio'] + label:before {
			content: ""; 
	    display: inline-block;
	    width: 12px;
	    height: 12px;
	    margin-right: 6px;
	    border-radius: 50%;
	    background-image: url(../../img/icon_invoice_nochose.png);
	    background-size: 12px 12px;
	    background-repeat: no-repeat;
		}
		
		input[type='radio']:checked +label:before {
			background-image: url(../../img/icon_invoice_chose.png);
		}
		
		.addModelBtn {
			width: calc(100% - (#{$margin} * 2));
			margin-top: 50px;
		}
	}
</style>