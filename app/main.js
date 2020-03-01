import { setupTippy } from './utils/tippy.js'
import { loadDeferredImgs } from './utils/images.js'
import { codeguard } from './utils/codeguard.js'

import Comments from './components/comments/Comments.vue';
import Quiz from './components/misc/Quiz.vue';
import Profile from './components/profile/Profile.vue';
import Redirect from './components/profile/Redirect.vue';
import config from 'environment';

import { Auth0Plugin } from "./auth";

Vue.use(Auth0Plugin, {
  domain: config.domain,
  clientId: config.clientID
})

var app = new Vue({
  el: '#dynamicApp',
  components: {
    Profile,
    Comments,
    Redirect,
    Quiz
  },
  created: function() {
    codeguard();
    setupTippy();
    loadDeferredImgs();
  }
});
