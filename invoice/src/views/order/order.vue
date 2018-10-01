<template>
		<div class="order-container">
			<list-cell v-for="item in dataArray" :key="item.money" :orderInfo="item"></list-cell>
		</div>
</template>

<script>
	import ListCell from '@/components/listCell' 
	
	export default {
//		name: 'order',
		components: { ListCell },
		data() {
			return {
				temScrollOffset: 0,
				monScrollOffset: 0,
				temDataArray: [],
				monDataArray: []
			}
		},
		computed: {
			dataArray: {
				get() {
					return this.$route.params.type === 'tem' ? this.temDataArray : this.monDataArray
				},
				set(value) {
					if (this.$route.params.type === 'tem') {
						this.temDataArray = value
					} else {
						this.monDataArray = value						
					}
				}
			},
			scrollOffset: {
				get() {
					return this.$route.params.type === 'tem' ? this.temScrollOffset : this.monScrollOffset
				},
				set(value) {
					if (this.$route.params.type === 'tem') {
						this.temScrollOffset = value
					} else {
						this.monScrollOffset = value						
					}
				}
			}
		},
		created() {
			if (this.$route.params.type === 'tem') {
				this.dataArray = [{money: '8'}, {money: '7'}, {money: '6'}, {money: '5'},{money: '10'}, {money: '22'}, {money: '266'}, {money: '26'}]	
			} else {
				this.dataArray = [{money: '4'}, {money: '3'}, {money: '2'}, {money: '1'}]
			}
			console.log(this.$route.params.type + ' created')
		},
		activated() {
			this.viewBox(this).scrollTo(this.scrollOffset)
			console.log(this.$route.params.type + ' activated')
//			console.log(this)
		},
		deactivated() {
			this.scrollOffset = this.viewBox(this).getScrollTop()
			console.log(this.$route.params.type + ' deactivated')
//			console.log(this)
		},
		watch: {
			$route() {
				console.log(this.$route)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.order-container {
		margin-top: 4px;
	}
</style>