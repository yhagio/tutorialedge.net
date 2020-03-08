import SearchPage from './components/search/SearchPage.vue';
import { loadDeferredImgs } from './utils/images.js'

import InstantSearch from 'vue-instantsearch'

Vue.use(InstantSearch)

var searchApp = new Vue({
  el: '#searchApp',
  components: {
    SearchPage
  },
  created: function() {
    loadDeferredImgs();
  }
});
