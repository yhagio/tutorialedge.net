<template>
  <div class="helpful-post">
    <hr>
    <div id="suggestion-input" v-if="!submitted" class="row">
      <!-- Was this helpful button group -->
      <div class="col-lg-12">
        <h5>Was This Post Helpful?</h5>
        <star-rating v-model="rating" :increment="0.5" :star-size="30"></star-rating>
      </div>

      <div class="col-lg-12" id="suggestionBox">
        <br>
        <textarea v-model="suggestion"
          placeholder="Do you have any suggestions as to how we can make it better?"
          class="form-control"
          name="suggestion"
          id="suggestion"
          cols="20"
          rows="5"
        ></textarea>
        <br>
        <button v-on:click="submitFeedback" class="btn btn-outline-primary">Submit Feedback</button>
      </div>
    </div>
    <div v-if="submitted">
        <h5>Thank You For Your Feedback!</h5>
    </div>

    <hr>

    <!-- GITHUB Pull Request Stuff -->
    <div class="col-lg-12">
      <span class="helpful">
        <i class="ion ion-social-github"></i>
        <a href="https://github.com/elliotforbes/tutorialedge.net">Edit on Github</a>
      </span>
    </div>
    <!-- END of Github PR -->
    <div class="clear"></div>
    <br>
  </div>
</template>

<script>
import axios from "axios";
import StarRating from 'vue-star-rating';
export default {
  name: "Suggestion",
  components: {
      StarRating,
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
                helpful:  this.rating,
                nothelpful: false
            },
            {
            headers: { "Content-Type": "application/json; charset=utf-8" }
            });
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
