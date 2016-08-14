<template>
	<div>
		<h1>我是用户信息</h1>
		<figure>
			<img src="../../assets/images/home/logo.jpg" alt="头像">
		</figure>
		<div id="bg">
			<h3>这里是测试背景图片</h3>
			<p></p>
		</div>
	</div>
</template>
<style rel="stylesheet/scss" lang="sass">
	@import "../../sass/home/index-info";
    #bg h3 {
		background: url("../../assets/images/holmes.jpg");
	}
</style>
<script>
    // home业务模块下  只有index页面 用的组件
    export default{
		ready() {
        	console.log('修改这里测试实时编译');
		},
    }
</script>