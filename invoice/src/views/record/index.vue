<template>
	<div @click="add">开票历史
		<div>
			<p v-for="i in 100">{{i}}</p>
		</div>
	</div>
</template>

<script>	
	export default {
		name: 'record',
		data() {
			return {
				scrollOffset: 0
			}
		},
		methods: {
			add() {
			}
		},
		created() {
			console.log('开票历史created')
		},
		mounted() {
			console.log('开票历史mouted')
		},
		updated() {
			console.log('开票历史updated')
		},
		destroyed() {
			console.log('开票历史destroy')
		},
		activated() {
			this.viewBox(this).scrollTo(this.scrollOffset)
			console.log('开票历史activated')
		},
		deactivated() {
			this.scrollOffset = this.viewBox(this).getScrollTop()
			this.viewBox(this).scrollTo(0)
			console.log('开票历史deactivated')
		}
	}
</script>

<style>
</style>