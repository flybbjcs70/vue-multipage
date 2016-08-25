import myHead from '../../components/home/home-header.vue';
import IndexInfo from '../../components/home/index-info.vue';
import Loading from '../../components/common/loading.vue';

var V = new Vue({
	el: 'body',
	methods : {
		sayHi() {
			require.ensure([], function () {
				var say = require('../tools').say;
				say('hi');
			});
		}
	},
	components: {
		IndexInfo,Loading,myHead
	}
});
