

```js

--- src
	|--- assets // 资源文件目录
		|--- images
			|--- home
				|--- xx.{jpe?g,png,...}
				yy.{jpe?g,png...}
			...
		|--- fonts
			xxx.{eot,svg,ttf...}
	|--- components
		|--- common // 全局公用组件 会编译所有入口js
			|--- loading.vue
		|--- home  // home业务模块组件
			|--- home-xxx.vue // home业务模块下通用组件 修改这个会编译所有home业务模块下的入口js
			|--- index-list.vue // index页面组件,只会编译 home/index.js
		|--- shopping // shopping 业务模块组件
			|--- shopping-xxx.vue // shopping业务模块下通用组件 修改这个会编译所有home业务模块下的入口js
			|--- buy-xxx.vue // 只有buy页面用的组件 只会编译 shopping/buy.js
	|--- js
		|--- home // home业务模块
			|--- index.js // home/index.html 页面的路口js
		|--- lib  // 公用库,这文件的所有js都不会编译,把你不需要编译的js放进来
			|--- vue.js
		|--- shopping  // shopping业务模块
			|--- buy.js // shopping/buy.html 页面的路口js
		tools.js // 需要编译的公用库,修改公用库会编译所有路口js文件(不分目录放,直接放在js文件夹下)
	|--- sass
		|--- home // home 业务模块所需样式
			|--- _index-info.scss // index-info组件样式 组件样式带_ 为组件私有
			|--- _index-xxx.scss // index-xxx 组件样式
			|--- _home-xxx.scss // home业务模块公用样式 带_
			|--- index.scss // home/index.html页面的样式文件(static/home/css/index.css)
			...
		|--- shopping // 同上
			|---
			...
 		_reset.scss // (全局公用私有工具sass,直接放在sass目录下并且带_)
		_p2r.scss
		...
	|--- static // (经过编译处理后的静态资源文件,线上也是使用这目录下的文件)
		|--- css // scss编译后的css
			|--- home
				|--- index.css // home/index.html 的css文件
			|--- maps
			|--- shopping
				|--- buy.css // shopping/buy.html 的css文件
		|--- es6 // 编译后的js 除了lib目录不会编译
			|--- home
				|--- index.js
			|--- lib
				|--- vue.js
			|--- shopping
				|--- buy.js
			1.js // require.ensure 生成的js
			tools.js
			...
		|--- fonts // 处理后的fonts
		|--- images // 处理后的图片
	|--- views
		|--- home // home业务模块下的页面
			|--- index.html
		|--- shopping // shopping业务模块下的页面
			|--- buy.html

--- public // 服务端需要的文件 相当于我们SPA里的dist,可在gulp里重命名
	|--- static
		|--- css
		|--- es6
		|--- images
		|--- fonts
	|--- views
		|--- home
		|--- shopping
```