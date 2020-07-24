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
import Navbar from './components/nav/Nav.vue';
import config from 'environment';
import Carbon from './components/misc/Carbon.vue'
import dayjs from 'dayjs'
import codemirror from 'vue-codemirror';
import { Auth0Plugin } from "./auth";
import SearchPage from "./components/search/SearchPage.vue";

import InstantSearch from "vue-instantsearch";

Vue.use(InstantSearch);
Vue.use(codemirror);

Vue.filter('formatDate', function(value) {
  if (value) {
    return dayjs(String(value)).format('D MMM, YYYY hh:mm')
  }
});

Vue.use(Auth0Plugin, {
  domain: config.domain,
  clientId: config.clientID
})

var app = new Vue({
  el: '#dynamicApp',
  components: {
    Profile,
    Challenge,
    ChallengeHome,
    Githubsvg,
    SearchPage,
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
    Navbar,
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
