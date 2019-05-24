
import Comments from './components/Comments.vue';
import Quiz from './components/Quiz.vue';
import Suggestion from './components/Suggestion.vue';
import Signup from './components/Signup.vue';
import Redirect from './components/Redirect.vue';
import Profile from './components/Profile.vue';

import auth from './auth'
Vue.use(auth);

var app = new Vue({
  el: '#dynamicApp',
  components: {
    Comments,
    Quiz,
    Suggestion,
    Signup,
    Redirect,
    Profile
  }
});
