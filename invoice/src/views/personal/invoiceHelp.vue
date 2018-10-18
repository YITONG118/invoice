<template>
	<div class="invoiceHelp-container">
			<div class="content-wrapper">
				<ul>
					<li>1. 电子发票开具提交后，请您耐心等待，稍后会将电子发票推送到您填写的电子邮箱。</li>
					<li>2. 如您开具的增值税普通发票用于企业报销，根据国家税务相关政策要求请填写纳税人识别号；如您的单位是非企业性质或您要求开具个人名义发票，您可以选择“个人抬头”的开票选项，则无需填写纳税人识别号。</li>
					<li>3. 缴费出场10分钟后才可进行电子发票开具，请耐心等待。</li>
					<li>4. 停车订单在30天内有效，超过30天的订单无法进行电子发票开具，请及时开具。</li>
				</ul>
			</div>
			<div class="telePhone-wrapper">
				客服服务热线: 400-900-3303
			</div>
		</div>
</template>

<script>
	export default {
		name: 'invoiceHelp'
	}
</script>

<style lang="scss" scoped>
	.invoiceHelp-container {
		.app-wrapper {
			padding-top: 4px;
			height: 100%;
			background-color: #f3f4f5;
		}
		.content-wrapper {
			background-color: white;
			padding: 30px 12px;
		}
		ul li {
			margin-top: 13px;
			color: #444;
			font-size: 14px;
			text-align: justify;
			letter-spacing: 1.5px;
			list-style: none;
		}
		ul li:first-child {
			margin-top: 0;
		}
		.telePhone-wrapper {
			margin-top: 20px; 
			text-align: center;
            color: #b1b1b1;
			font-size: 16px;
		}
	}
</style>