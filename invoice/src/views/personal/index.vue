<template>
	<div>个人中心
		<div>
			<p v-for="i in 100">{{i}}</p>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'personal',
		data() {
			return {
				scrollOffset: 0
			}
		},
		created() {
			console.log('个人中心created')
		},
		mounted() {
			console.log('个人中心mouted')
		},
		updated() {
			console.log('个人中心updated')
		},
		destroyed() {
			console.log('个人中心destroy')
		},
		activated() {
			this.viewBox(this).scrollTo(this.scrollOffset)
			console.log('个人中心activated')
		},
		deactivated() {
			this.scrollOffset = this.viewBox(this).getScrollTop()
			this.viewBox(this).scrollTo(0)
			console.log('个人中心deactivated')
		}
	}
</script>

<style>
</style>