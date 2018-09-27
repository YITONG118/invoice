<template>
  <div id="app">
  		<div class="app-container">
	    <router-view/>
  		</div>
  </div>
</template>

<script>	
	export default {
	  name: 'App',
	}
</script>

<style lang="less">
	@import '~vux/src/styles/reset.less';
</style>