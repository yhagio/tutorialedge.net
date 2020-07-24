  <template>
    <div>
      <div v-if="!this.loggedIn" class="bg-gray-200 mx-auto rounded">
        <div class="sm:flex p-8">
          <img class="w-16 h-auto mx-auto mb-8 sm:ml-8" src="https://images.tutorialedge.net/images/logo.svg" alt="TutorialEdge">
          <div class="sm:ml-16 mb-8">
            <h2 class="text-3xl font-strong mb-4">👨‍💻 Join the TutorialEdge Clan! 👩‍💻</h2>
            <p class="mb-8">Gain access to the discussion as well as new challenges and quizzes and keep-up-to date with our newsletter!</p>
            <a href="/profile/" class="btn btn-subscribe">Register</a>
            or
            <a href="/profile/">Log In</a>
          </div>
        </div>
      </div>
      
      <div class="comments-section">
          <h2 class="mb-8 text-3xl">💬  Comments Section <br/><small>Always be kind when commenting and adhere to our <a href="/code/">Code of Conduct</a></small></h2>
          <div v-if="this.comments == null">
              <h4>Be the first to comment!</h4>
              <blockquote>Let me know what you thought of this tutorial. Your feedback on these tutorials can impact the wider community and help others overcome their own challenges.</blockquote>
          </div>
          <span v-if="!this.loggedIn">
            <a v-bind:href="this.redirectTo" class="btn btn-subscribe">Become a Member</a> or <a v-bind:href="this.redirectTo">Log In</a> 
          </span>
          <CommentEditor v-if="loggedIn"/>
          <Comment 
              v-for="(comment, index) in comments" 
              :key="index"
              :comment="comment"/>
    </div>
  </div>
</template>

<script>
import CommentEditor from './CommentEditor.vue';
import Comment from './Comment.vue';
import axios from 'axios';
import config from 'environment'

export default {
    name: "Comments",
    components: {
        CommentEditor: CommentEditor,
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

        this.comments = response.data.comments.sort((a,b) => {
          return b.ID - a.ID;
        });
    }
}
</script>

<style lang="scss">
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

  h2 > small {
    font-size: 1rem;
  }

  .comments-section {
    margin-bottom: 3em;
    color: #333;
    font-size: 16px;
    width: 100%;

    padding-top: 40px;
    .comment-editor {
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

      }
    }
  }
}
</style>