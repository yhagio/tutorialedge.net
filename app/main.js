import { loadDeferredImgs } from './utils/images.js'
import { codeguard } from './utils/codeguard.js'

import Comments from './components/comments/Comments.vue';
import Quiz from './components/misc/Quiz.vue';
import Redirect from './components/profile/Redirect.vue';
import Profile from './components/profile/Profile.vue';
import ProfileNavButton from './components/profile/ProfileNavButton.vue';
import Logout from './components/profile/Logout.vue';
import Forum from './components/forum/Forum.vue';
import FooterSearch from './components/search/FooterSearch.vue';
import config from 'environment';
import Carbon from './components/misc/Carbon.vue'

import { Auth0Plugin } from "./auth";

Vue.use(Auth0Plugin, {
  domain: config.domain,
  clientId: config.clientID
})

var app = new Vue({
  el: '#dynamicApp',
  components: {
    Profile,
    ProfileNavButton,
    Comments,
    FooterSearch,
    Redirect,
    Carbon,
    Logout,
    Forum,
    Quiz
  },
  created: function() {

    anchors.options = {
      visible: "always",
      placement: "right"
    };
    anchors.add(
      ".content > h1, .content > h2, .content > h3, .content > h4"
    );

    codeguard();
    loadDeferredImgs();
  }
});
