import IndexInfo from '../../components/home/index-info.vue';
import Loading from '../../components/common/loading.vue';
import { getUser } from '../../apis/index.api';

  
var V = new Vue({
	el: 'body',
	created() {
		getUser().then(ret => {
			
		})
	},
	components: {
		IndexInfo,Loading
	}
});
