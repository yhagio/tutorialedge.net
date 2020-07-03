import { loadDeferredImgs } from './utils/images.js'
import { codeguard } from './utils/codeguard.js'
import Comments from './components/comments/Comments.vue';
import Quiz from './components/quiz/Quiz.vue';
import Redirect from './components/profile/Redirect.vue';
import Profile from './components/profile/Profile.vue';
import ProfileNavButton from './components/profile/ProfileNavButton.vue';
import Logout from './components/profile/Logout.vue';
import Register from './components/profile/Register.vue';
import Login from './components/profile/Login.vue';
import Pricing from './components/profile/Pricing.vue';
import FooterSearch from './components/search/FooterSearch.vue';
import Snippet from './components/snippets/Snippet.vue';
import ChallengeHome from './components/challenge/ChallengeHome.vue';
import HallOfFame from './components/halloffame/HallOfFame.vue';
import Challenge from './components/challenge/Challenge.vue';
import VideoPlayer from './components/video/VideoPlayer.vue';
import Githubsvg from './components/misc/Githubsvg.vue';
import config from 'environment';
import Carbon from './components/misc/Carbon.vue'
import 'codemirror/mode/go/go.js';
import 'codemirror/mode/python/python.js';
import VueCodemirror from 'vue-codemirror';
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/monokai.css' 
import dayjs from 'dayjs'
import { Auth0Plugin } from "./auth";

Vue.filter('formatDate', function(value) {
  if (value) {
    return dayjs(String(value)).format('D MMM, YYYY hh:mm')
  }
});

Vue.use(Auth0Plugin, {
  domain: config.domain,
  clientId: config.clientID
})

Vue.use(VueCodemirror, {})

var app = new Vue({
  el: '#dynamicApp',
  components: {
    Profile,
    Challenge,
    ChallengeHome,
    Githubsvg,
    Quiz,
    ProfileNavButton,
    Pricing,
    Login,
    HallOfFame,
    Comments,
    FooterSearch,
    VideoPlayer,
    Redirect,
    Carbon,
    Register,
    Logout,
    Snippet
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
