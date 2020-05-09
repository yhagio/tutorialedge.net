  <template>
    <div class="container">
      <hr/>
      <div class="comments-section">
          <h2>💬  Comments Section <br/><small>Always be kind when commenting and adhere to our <a href="/code/">Code of Conduct</a></small></h2>
          <div v-if="this.comments == null">
              <h4>Be the first to comment!</h4>
              <blockquote>Let me know what you thought of this tutorial. Your feedback on these tutorials can impact the wider community and help others overcome their own challenges.</blockquote>
          </div>
          <span v-if="!this.loggedIn">
            <a v-bind:href="this.redirectTo" class="btn btn-subscribe">Become a Member</a> or <a v-bind:href="this.redirectTo">Log In</a> 
          </span>
          <NewComment v-if="loggedIn"/>
          <Comment 
              v-for="(comment, index) in comments" 
              :key="index"
              :comment="comment"/>
    </div>
  </div>
</template>

<script>
import NewComment from './NewComment.vue';
import Comment from './Comment.vue';
import axios from 'axios';
import config from 'environment'

export default {
    name: "Comments",
    components: {
        NewComment: NewComment,
        Comment: Comment
    },
    data: function () {
        return {
            comments: [],
            loggedIn: false,
            redirectTo: ''
        }
    },
    created: async function () {
      this.comments = [];
        this.redirectTo = "/profile/?redirectUri=" + window.location.pathname;
        if (this.$auth.isAuthenticated()) {
            this.loggedIn = true;
        }

        let response = await axios.get(config.apiBase + "/v1/comments", { params: {
          slug: window.location.pathname
        }})

        this.comments = response.data.comments;
    }
}
</script>

<style lang="scss">

$dark-blue: #232A2D;
$darkest-blue: #263344;
$link-blue: #0F607A;
$light-blue: #1D84B5;
$top-bar-blue: #fafbfc;
$lightest-blue: #F2F5F7;
$light-gray: #4a4a4a;
$gray: #222;

$box-shadow: 0 5px 15px -5px rgba(0,0,0,0.1);
$card-box-shadow: 0 2px 4px 0 rgba(14,30,37,.12);
$border-radius: 8px;

.btn-subscribe {
  background-color: #1D84B5;
  padding: 10px;
  color: white !important;
  background: #0276d9;
  background-image: linear-gradient(22deg, #0276d9, #2C9CFC);
  border-bottom: 1px solid #0376d8;
  border: none;
  margin-right: 20px;
  text-decoration: none;
  padding-left: 20px;
  padding-right: 20px;
}

.comments {
  width: 100%;
  padding-bottom: 40px;
  margin-top: 40px;
  h2 {
      padding-bottom: 20px;
  }

  h2 > small {
    font-size: 1rem;
  }

  .comments-section {
    margin-bottom: 3em;
    color: #333;
    font-size: 16px;
    width: 100%;

    padding-top: 40px;
    .new-comment {
      display: flex;
      margin-bottom: 40px;

      .comment-input {
        flex: 6;

        textarea {
          background-color: #fff;
          border: 1px solid #efefef;
          width: 100%;
          overflow: hidden;
          overflow-wrap: break-word;
          padding: 1em 1.2em;
        }

        button {
          margin: auto;
          margin-top: 20px;
        }


        .markdown-support {
            color: $light-gray;
        }

      }
    }
  }
}
</style>