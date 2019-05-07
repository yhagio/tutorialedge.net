<template>
  <div class="helpful-post">
    <div id="suggestion-input" v-if="!submitted">
      <!-- Was this helpful button group -->
      <h5>Was This Post Helpful?</h5>
      <star-rating v-model="rating" :increment="0.5" :star-size="25"></star-rating>

      <textarea
        v-model="suggestion"
        placeholder="Do you have any suggestions as to how we can make it better?"
        class="form-control"
        name="suggestion"
        id="suggestion"
        rows="5"
      ></textarea>
      <br>
      <button v-on:click="submitFeedback" class="btn btn-outline-primary">Submit Feedback</button>
    </div>
    <div v-if="submitted">
      <h5>Thank You For Your Feedback!</h5>
    </div>

    <hr>

    <!-- GITHUB Pull Request Stuff -->
    <div class="helpful">
      <i class="ion ion-social-github"></i>
      <a href="https://github.com/elliotforbes/tutorialedge.net">Edit on Github</a>
    </div>
    <!-- END of Github PR -->
    <div class="clear"></div>
  </div>
</template>

<script>
import axios from "axios";
import StarRating from "vue-star-rating";
export default {
  name: "Suggestion",
  components: {
    StarRating
  },
  data: function() {
    return {
      rating: 0,
      suggestion: "",
      submitted: false
    };
  },
  methods: {
    submitFeedback: async function() {
      try {
        let response = await axios.post(
          "https://43xaudt448.execute-api.eu-west-1.amazonaws.com/dev/suggestion",
          {
            message: this.suggestion,
            url: window.location.href,
            helpful: this.rating,
            nothelpful: false
          },
          {
            headers: { "Content-Type": "application/json; charset=utf-8" }
          }
        );
        console.log(response);
        this.submitted = true;
      } catch (err) {
        //TODO: Handle appropriately with info to user
        console.log(err);
      }
    }
  }
};
</script>
