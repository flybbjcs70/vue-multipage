<template>
    <div id="loading">
		<!--修改这里试试,所有js都会编译,因为他是common全局公用的-->
		<h4>loading组件 正在加载中,请稍等...</h4>
	</div>
</template>
<style scoped rel="stylesheet/scss" lang="sass">

</style>
<script>
    // common是所有业务模块下的通用组件
	// 修改common下的组件,所有业务模块的入口js都会编译
    export default{
    	ready() {
    		console.log('loading,测试所有入口js都会被编译')
		}
    }
</script>