<template>
	<div class="keyboard">
		<div class="keyboard-province" v-show="showProvinceKeyboard">
			<ul>
				<li>京</li>
				<li>津</li>
				<li>晋</li>
				<li>冀</li>
				<li>蒙</li>
				<li>辽</li>
				<li>吉</li>
			</ul>
			<ul>
				<li>黑</li>
				<li>沪</li>
				<li>苏</li>
				<li>浙</li>
				<li>皖</li>
				<li>闽</li>
				<li>赣</li>
			</ul>
			<ul>
				<li>鲁</li>
				<li>豫</li>
				<li>鄂</li>
				<li>湘</li>
				<li>粤</li>
				<li>桂</li>
				<li>琼</li>
			</ul>
			<ul>
				<li>渝</li>
				<li>川</li>
				<li>贵</li>
				<li>云</li>
				<li>藏</li>
				<li>陕</li>
				<li>甘</li>
			</ul>
			<ul>
				<li>青</li>
				<li>宁</li>
				<li>新</li>
				<li>港</li>
				<li>澳</li>
				<li>台</li>
				<li class="other placeholder">占</li>
			</ul>
		</div>
		
		<div class="keyboard-text" v-show="showTextKeyboard">
			<ul>
				<li>学</li>
				<li>警</li>
				<li>港</li>
				<li>澳</li>
				<li>领</li>
			</ul>
			<ul>
				<li>0</li>
				<li>1</li>
				<li>2</li>
				<li>3</li>
				<li>4</li>
				<li>5</li>
				<li>6</li>
				<li>7</li>
				<li>8</li>
				<li>9</li>
			</ul>
			<ul>
				<li>Q</li>
				<li>W</li>
				<li>E</li>
				<li>R</li>
				<li>T</li>
				<li>Y</li>
				<li>U</li>
				<li>I</li>
				<li>O</li>
				<li>P</li>
			</ul>
			<ul>
				<li>A</li>
				<li>S</li>
				<li>D</li>
				<li>F</li>
				<li>G</li>
				<li>H</li>
				<li>J</li>
				<li>K</li>
				<li>L</li>
				<li>Z</li>
			</ul>
			<ul>
				<li>X</li>
				<li>C</li>
				<li>V</li>
				<li>B</li>
				<li>N</li>
				<li>M</li>
				<li class="other clear">清空</li>
				<li class="other delete">删除</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			defaultCarNum: {
				type: String,
			},
			limit: {
				type: Number,
				default: 8
			}
		},
		data() {
			return {
				carNum: '',
				showProvinceKeyboard: true,
				showTextKeyboard: false
			}
		},
		watch: {
			carNum: function(value) {
				this.showProvinceKeyboard = value.length <= 0
				this.showTextKeyboard = !this.showProvinceKeyboard
				this.$emit('on-changed', value)
			}
		},
		methods: {
			//键盘点击处理方法
			handleKeyboard(str) {
				if (this.carNum.length < this.limit){
					this.carNum = this.carNum + str
				}
			}
		},
		mounted() {
			
			if (this.defaultCarNum) {
				this.carNum = this.defaultCarNum
			}
			
			const provinceItem = document.querySelectorAll('.keyboard ul li:not(.other)')
			provinceItem.forEach((item) => {
				item.onclick = () => {
					this.handleKeyboard(item.innerText)
				}
			})
			
			const deleteItem = document.getElementsByClassName('delete')[0]
			deleteItem.onclick = () => {
				this.carNum = this.carNum.substring(0, this.carNum.length - 1)
			}
			
			const clearItem = document.getElementsByClassName('clear')[0]
			clearItem.onclick = () => {
				this.carNum = ''
			}
		}
	}
</script>

<style lang="scss" scoped>
	.keyboard {
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 210px;
	}
	
	.keyboard-province, .keyboard-text  {
		position: absolute;
		bottom: 0;
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 210px; 
		padding: 15px;
		box-sizing: border-box;
		background-color: white;
	}
	
	.keyboard ul {
		display: flex;
		flex-basis: 100%;		
		margin-bottom: 7px; 
	} 
	
	.keyboard ul li {
		flex-grow: 1;
		width: 1px;
		font-size: 14px;
		border-radius: 3px;
		line-height: 220%;
		text-align: center;
		color: #444;
		background-color: #ebebeb;
	}
	
	.keyboard-text ul li.delete,
	.keyboard ul li.clear {
		flex-grow: 2.2;
	}
	
	
	.keyboard-province ul li {
		margin-left: 2.93%;    
	}
	
	.keyboard-text ul li {
		margin-left: 1.33%;   
	}
	
	/*最后一行ul元素*/
	.keyboard-province ul:last-child,
	.keyboard-text ul:last-child {
		margin-bottom: 0;
	}
	
	/*第一列li元素*/
	.keyboard-province ul li:first-child,
	.keyboard-text ul li:first-child {
		margin-left: 0;
	}
	
	/*占位元素*/
	.placeholder {
		opacity: 0;
	}
</style>