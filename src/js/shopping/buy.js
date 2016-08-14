

import List from '../../components/shopping/buy-list.vue';
import Loading from '../../components/common/loading.vue';
import { getList } from '../../apis/shopping.api';


var V = new Vue({
	el: 'body',
	created() {
		getList().then(ret => {
			
		})
	},
	components: {
		List,Loading
	}
});
