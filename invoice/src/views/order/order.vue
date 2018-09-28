<template>
	<div>
		临停订单{{ name }}
	</div>
</template>

<script>
	export default {
		computed: {
			name() {
				return this.$route.fullPath
			}
		},
		created() {
			console.log(this)
		}
	}
</script>