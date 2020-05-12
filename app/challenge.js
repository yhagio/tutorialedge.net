import 'codemirror/mode/javascript/javascript.js'
import VueCodemirror from 'vue-codemirror';

import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/base16-dark.css' 

import Challenge from './components/challenges/Challenge.vue';

Vue.use(VueCodemirror, {
    options: { theme: 'base16-dark' }
})

var challengeApp = new Vue({
  el: '#challengeApp',
  components: {
    Challenge
  }
});
