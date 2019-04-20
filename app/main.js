import Comments from './components/Comments.vue';
import Quiz from './components/Quiz.vue';
import Suggestion from './components/Suggestion.vue';
import Signup from './components/Signup.vue';

var app = new Vue({
  el: '#dynamicApp',
  components: {
    Comments,
    Quiz,
    Suggestion,
    Signup
  }
});
