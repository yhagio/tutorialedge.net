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
import Snippet from './components/snippets/Snippet.vue';
import config from 'environment';
import Carbon from './components/misc/Carbon.vue'

import 'codemirror/mode/go/go.js'
import VueCodemirror from 'vue-codemirror';

import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/monokai.css' 

import dayjs from 'dayjs'

Vue.filter('formatDate', function(value) {
  if (value) {
    return dayjs(String(value)).format('D MMM, YYYY hh:mm')
  }
});

import { Auth0Plugin } from "./auth";

Vue.use(Auth0Plugin, {
  domain: config.domain,
  clientId: config.clientID
})


Vue.use(VueCodemirror, {})

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
    Snippet,
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
