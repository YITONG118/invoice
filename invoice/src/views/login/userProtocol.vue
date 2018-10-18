<template>
	<div class="user">
		<p class="userCotent marginBottom">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;请仔细阅读以下条款，为获得车享享提供的服务，服务使用人（以下称“用户”）应当同意本协议的全部条款并按照页面上的提示完成全部的注册程序。用户在进行注册程序过程中点击“同意”按钮即表示用户完全接受本协议项下的全部条款。</p>
		<h6 class="userTitle">1、使用规则</h6>
		<p class="userCotent">1.1 用户注册成功后，车享享将给予每个用户一个用户帐号及相应的密码，该用户帐号和密码由用户负责保管；用户应当对以其用户帐号进行的所有活动和事件负法律责任。</p>
		<p class="userCotent">1.2 用户不应将其帐号、密码转让或出借予他人使用。如用户发现其帐号遭他人非法使用，应立即通知车享享。因黑客行为或用户的保管疏忽导致帐号、密码遭他人非法使用，车享享不承担任何责任。</p>
		<p class="userCotent">1.3 用户须对在车享享的注册信息的真实性、合法性、有效性承担全部责任，用户不得冒充他人；不得利用他人的名义发布任何信息；不得恶意使用注册帐户导致其他用户误认；否则车享享有权立即停止提供服务，收回其帐号并由用户独自承担由此而产生的一切法律责任。</p>
		<p class="userCotent">1.4 用户承诺不得以任何方式利用车享享直接或间接从事违反中国法律、以及社会公德的行为，车享享有权对违反上述承诺的内容和帐户予以删除。</p>
		<p class="userCotent">1.5 车享享有权对用户使用车享享的情况进行审查和监督，如用户在使用车享享时违反规定，车享享或其授权的人有权要求用户改正或直接采取一切必要的措施（包括但不限于更改或删除用户张贴的内容、暂停或终止用户使用车享享权利）以减轻用户不当行为造成的影响。</p>
		<p class="userCotent marginBottom">1.6 用户同意车享享有权在提供网络服务过程中以各种方式投放各种商业性广告或其他任何类型的商业信息（包括但不限于在车享享网站的任何页面上投放广告），并且，用户同意接受车享享通过短信或其他方式向用户发送商品促销或其他相关商业信。</p>

		<h6 class="userTitle">2、免费声明</h6>
		<p class="userCotent">2.1 车享享不对用户发布的内容或评论的正确性进行保证。</p>
		<p class="userCotent">2.2 鉴于网络服务的特殊性，用户同意车享享有权随时变更、中断或终止部分或全部的网络服务。</p>
		<p class="userCotent">2.3 用户理解，车享享需要定期或不定期地对提供网络服务的平台（如互联网网站、移动网络等）或相关的设备进行检修或者维护，如因此类情况而造成网络服务在合理时间内的中断，车享享无需为此承担任何责任，但车享享应尽可能事先进行通告。</p>
		<p class="userCotent marginBottom">2.4 本声明未涉及的问题参见国家有关法律法规，当本声明与国家法律法规冲突时，以国家法律法规为准。车享享之声明以及其修改权、更新权及最终解释权均属车享享所有。</p>

		<h6 class="userTitle">3、协议修改</h6>
		<p class="userCotent">3.1 根据互联网的发展和有关法律、法规及规范性文件的变化，或者因业务发展需要，车享享有权对本协议的条款作出修改或变更，一旦本协议的内容发生变动，车享享将会直接在车享享客户端公布修改之后的协议内容，该公布行为视为车享享已经通知用户修改内容。车享享也可采用短信或其他传送方式，提示用户协议条款的修改、服务变更、或其它重要事项。</p>
		<p class="userCotent marginBottom">3.2 如果不同意车享享对本协议相关条款所做的修改，用户有权并应当停止使用车享享。如果用户继续使用车享享，则视为用户接受车享享对本协议相关条款所做的修改。</p>

		<h6 class="userTitle">4、隐私保护</h6>
		<p class="userCotent">4.1 保护用户隐私是车享享的一项基本政策，车享享保证不对外公开或向第三方提供单个用户的注册资料及用户在使用网络服务时存储在车享享的非公开内容，但下列情况除外：</p>
		<p class="userCotent">1)事先获得用户的明确授权；</p>
		<p class="userCotent">2)根据有关的法律法规要求；</p>
		<p class="userCotent">3)按照相关政府主管部门的要求；</p>
		<p class="userCotent">4)为维护社会公众的利益；</p>
		<p class="userCotent marginBottom">5)为维护车享享的合法权益。</p>

		<h6 class="userTitle">5、法律声明</h6>
		<p class="userCotent marginBottom">本协议及因本协议产生的一切法律关系及纠纷，均适用于中华人民共和国的法律。用户在此同意以车享享营业所在地的法院管辖。</p>
	</div>
</template>

<script>
	export default {
		name: 'protocol'
	}
</script>

<style lang="scss" scoped>
	.user {
		padding: 0 $margin;
		text-align: justify;
		letter-spacing: 1.5px;
	}
	
	.marginBottom{
		margin-bottom: 30px;
	}
	.userTitle{
		font-size: 15px;
		margin-bottom: 10px;
	}
	.userCotent{
		font-size: 14px;
		color: $text;
	}
	
	p {
		margin-top: 5px;
	}
</style>
