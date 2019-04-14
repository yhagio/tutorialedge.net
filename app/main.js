import Comments from './components/Comments.vue';
import Quiz from './components/Quiz.vue';

var app = new Vue({
  el: '#dynamicApp',
  components: {
    Comments,
    Quiz,
  }
});
