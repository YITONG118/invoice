<template>
	<div class="invoiceInfo-container">

		<group gutter="0" label-width="5em">
			<cell-box>
				<label style="width: 5em;">抬头类型</label>
				<input type="radio" id="company"  v-model="invoiceType" value="2">
				<label for="company">公司抬头</label>
				<input type="radio" id="personal" v-model="invoiceType" value="1">
				<label for="personal">个人抬头</label>
			</cell-box>
			<x-input title="发票抬头" v-model="invoiceTitle" placeholder="填写发票抬头"></x-input>
			<x-input title="税号" v-model="invoiceNumber" placeholder="填写纳税人识别号" v-show="invoiceType === '2'" mask="SSSS SSSS SSSS SSSS SSSS" :max="24"></x-input>
			<x-input title="发票内容" v-model="invoiceContent" disabled></x-input>
			<x-input title="发票金额" v-model="invoiceMoney" disabled></x-input>
			<x-input title="手机号码" v-model='phone' placeholder="填写手机号码"></x-input>
			<cell title="更多信息" is-link :value="moreInfoTip" @click.native="showMoreInfo = true"></cell>
		</group>
		<group gutter="7px" label-width="5em">
			<x-input title="电子邮箱" v-model="email" placeholder="用于向您发送电子发票"></x-input>
		</group>
		<x-button class="submitBtn" type="primary" @click.native="submitAction">提 交</x-button>
		
		
		<!--更多信息弹窗-->
		<popup class="moreInfo" v-model="showMoreInfo" :hide-on-blur="false">
			<div class="moreInfo-tool">
				更多信息
				<div class="tool-closeBtn" @click="showMoreInfo = false"><img src="../../img/icon_close.png"></div>
			</div>
			<group gutter="0" label-width="7em">
				<x-input title="备注说明" v-model="remark" placeholder="填写备注说明"></x-input>
				<x-input title="地址" v-model="address" placeholder="填写地址"></x-input>
				<x-input title="开户行和账号" v-model="blank" placeholder="填写开户行和账号"></x-input>
			</group>
			<x-button class="moreInfo-sureBtn" type="primary" @click.native="showMoreInfo = false">确 定</x-button>
		</popup>
	
		<!--核查信息弹窗:不能使用v-model绑定数据，否则会导致移动端每输入一个字符而失去焦点-->
		<popup class="verifyInfo" v-model="showVerifyInfo" :hide-on-blur="false">
			<div class="verifyInfo-tool">
				开具电子发票
				<div class="tool-closeBtn" @click="showVerifyInfo = false"><img src="../../img/icon_close.png"></div>
			</div>
			<group gutter="0" label-width="5em">
				<x-input title="发票抬头" :placeholder="invoiceTitle" disabled></x-input>
				<x-input title="税号" :placeholder="invoiceNumber" disabled v-show="invoiceType === '2'"></x-input>
				<x-input title="手机号码" :placeholder="phone" disabled></x-input>
				<x-input title="电子邮箱" :placeholder="email" disabled></x-input>
			</group>
			<p class="verifyInfo-email">请确认邮箱无误,电子发票将在系统开具后发送至您的邮箱,请注意查收</p>
			<p class="verifyInfo-type" v-show="invoiceType === '1'">您选择的发票抬头为个人抬头,如需报销,请选择公司抬头发票</p>
			<x-button class="verifyInfo-sureBtn" type="primary" @click.native="sureSubmitAction">确 定</x-button>
		</popup>
		
	</div>
</template>

<script>
	import { CellBox, Popup } from 'vux'
	import { checkPhone, checkEmail, trim } from '@/utils'
	import { request_getInvoiceTemplate, request_submitInvoiceInfo } from '@/request/api' 
	
	export default {
		name: 'invoiceInfo',
		components: { CellBox, Popup },
		computed: {
			moreInfoTip() {
				let writeCount = 0
				if (this.remark.length > 0) writeCount += 1
				if (this.address.length > 0) writeCount += 1
				if (this.blank.length > 0) writeCount += 1
				return writeCount === 0 ? '填写备注、地址等(非必填)' : '共3项 已填写' + writeCount + '项'
			}
		},
		data() {
			return {
				invoiceType: '2',            //'1'为个人抬头，'2'为公司抬头
				invoiceTitle: '',
				invoiceNumber: '',
				invoiceContent: '停车费用发票',
				invoiceMoney: '',
				phone: '',
				remark: '',
				address: '',
				blank: '',
				email: '',
				
				showMoreInfo: false,
				showVerifyInfo: false
			}
		},
		methods: {			
			submitAction() {
				if (this.invoiceTitle.length <= 0) {
					this.$vux.toast.text('请输入发票抬头')
					return
				}
				
				if (this.invoiceType === '2') {
					const number = trim(this.invoiceNumber)
					if (number.length != 15 && number.length != 18 && number.length != 20) {
						this.$vux.toast.text('纳税人识别号必须为15,18或20位')
						return
					}
				}
				
				if (!checkPhone(this.phone)) {
					this.$vux.toast.text('请输入正确的手机号码')
					return
				}
				
				if (!checkEmail(this.email)) {
					this.$vux.toast.text('请输入正确的电子邮箱')
					return
				}
				
				this.showVerifyInfo = true
				
			},
			
			sureSubmitAction() {
				this.$vux.loading.show()	
				const params = {
					parkId: this.$route.params.parkId,
					invoiceType: +this.invoiceType,
					invoiceName: this.invoiceTitle,
					invoiceAmt: this.$route.params.money,
					invoicePhone: this.phone,
					invoiceContent: this.invoiceContent,
					invoiceRemark: this.remark,
					invoiceAddress: this.address,
					invoiceAccount: this.blank,
					invoiceEmail: this.email,
					peyedIdArray: this.$route.params.peyedIdArray,
					carNumArray: this.$route.params.carNumArray,
					orderType: this.$route.params.orderType
				}
				
				if (this.invoiceType === '2') {
					Object.assign(params, {invoiceTaxNum: trim(this.invoiceNumber)})
				}
								
				request_submitInvoiceInfo(params).then(data => {
					this.$vux.loading.hide()
					this.$router.replace('/submitSuccess')
				}).catch(error => {
					this.$vux.loading.hide()
					this.showVerifyInfo = false     //需隐藏，否则会导致遮罩层在最上面，z-index问题
				})
			},
			
			fetchData() {
				this.$vux.loading.show()
				request_getInvoiceTemplate().then(data => {
					this.$vux.loading.hide()
					const templateInfo = data.find((element) => {
						return element.defaultType === 1
					})
					if (templateInfo) {
						this.invoiceType = String(templateInfo.invoiceType)
						this.invoiceTitle = templateInfo.invoiceName || ''
						this.invoiceNumber = templateInfo.invoiceTaxNum || ''
						this.phone = templateInfo.invoicePhone || ''
						this.remark = templateInfo.invoiceRemark || ''
						this.address = templateInfo.invoiceAddress || ''
						this.blank = templateInfo.invoiceAccount || ''	
					}
				}).catch(error => {
					this.$vux.loading.hide()
				})
			}
		},
		created() {
			this.invoiceMoney = this.$route.params.money + '元'
			this.fetchData()
		},
		beforeRouteEnter(to, from, next) {
			//若无parkId则不让进入该页面,可防止物理前进该页面
			if (to.params.parkId) {
				next()	
			}
		}
	}
</script>
	
<style lang="scss">
	.invoiceInfo-container {
		.weui-cell {
			height: 50px;
			color: $text;
		}
		
		.verifyInfo {
			.weui-cell {
				color: $placeholder;
			}
		}
		
		/*不可输入提示颜色*/
		.vux-x-input.disabled {
			.weui-input {
				text-fill-color: #444;
				-webkit-text-fill-color: #444;
			}
		}
		
		/*提示文字颜色*/
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
		
		.submitBtn {
			width: calc(100% - (#{$margin} * 2));
			margin-top: 50px;
		}
		
		.moreInfo,
		.verifyInfo {
			background-color: white;
			.moreInfo-tool,
			.verifyInfo-tool {
				position: relative;
				text-align: center;
				height: 50px;
				line-height: 50px;
				font-size: 18px;
				color: $text;
				.tool-closeBtn {
					position: absolute;
					left: $margin;
					top: 50%;
    			transform: translateY(-50%);
					width: 30px;
					height: 30px;
					img {
						position: absolute;
				    top: 50%;
				    transform: translateY(-50%);
						width: 15px;
						height: 15px;
					}
				}
			}
			
			.moreInfo-sureBtn,
			.verifyInfo-sureBtn {
				width: calc(100% - (#{$margin} * 2));
				margin: 20px auto 10px auto;
			}	
			
			.verifyInfo-email,
			.verifyInfo-type {
				margin: 15px $margin;
				color: $placeholder;
			}	
		}
	}
</style>
