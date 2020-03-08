  <template>
    <div class="comments-section">
        <h2><i class="ion ion-android-chat"></i>  Comments Section</h2>
        <div v-if="comments.length === 0">
            <h4>Be the first to comment!</h4>
            <p>Let me know what you thought of this tutorial. Your feedback on these tutorials can impact the wider community and help others overcome their own challenges.</p>
        </div>
        <NewComment :user="user" v-if="loggedIn"/>
        <Comment 
            v-for="(comment, index) in comments" 
            :key="index"
            :comment="comment"/>
    </div>
</template>

<script>
import NewComment from './NewComment.vue';
import Comment from './Comment.vue';
import axios from 'axios';

export default {
    name: "Comments",
    components: {
        NewComment: NewComment,
        Comment: Comment
    },
    data: function () {
        return {
            comments: [],
            loggedIn: false
        }
    },
    created: async function () {
        
        if (this.$auth.isAuthenticated()) {
            this.loggedIn = true;
        }

        // let pageId = document.getElementById('page-id').innerHTML;  
        // let response = await axios.get("https://api.tutorialedge.net/api/v1/comments/" + pageId);
        // this.comments = response.data;

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

.comments {
  width: 100%;
  padding-bottom: 40px;
  h2 {
      padding-bottom: 20px;
  }

  .comment-login {
    display: flex;
    flex-wrap: wrap;

    background-color: white;
    padding: 40px;
    margin-bottom: 40px;
    
    overflow: hidden;;

    border-radius: $border-radius;
    -webkit-box-shadow: $card-box-shadow;
    box-shadow: $card-box-shadow;
    color: $gray;
    
    width: 100%;

    .image {
      flex: 1;
      img {
        width: 125px;
        height: auto;
        display: block;
        margin: auto;
      }
    }

    .register {
      flex: 3;
      color: #555f61;  
      button {
        background: #0276d9;
        background-image: linear-gradient(22deg, #0276d9,#2C9CFC);
        border-bottom: 1px solid #0376d8;
        border: none;
      }
    }
  }


  .comments-section {
    margin-bottom: 3em;
    color: #333;
    font-size: 16px;
    width: 100%;

    padding-top: 40px;
    .new-comment {
      display: flex;
      .avatar {
        flex: 1;
        display: inline-block;
        position: relative;

        img {
          border-radius: 100%;
          width: 60px;
          height: 60px;
          display: block;
          margin: auto;
          margin-top: 15px;
        }
      }
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

        .markdown-support {
            color: $light-gray;
        }

      }
    }

    .comment {
        margin-top: 20px;
        display: flex;
        
        .author{
            flex: 1;
            img {
                border-radius: 100%;
                color: white;
                display: block;
                width: 75px;
                margin: auto;
                margin-top: 15px;
                height: 75px;
            }
        }
        .comment-body {
          border-radius: $border-radius;
          -webkit-box-shadow: $card-box-shadow;
          box-shadow: $card-box-shadow;
          color: $gray;

            flex: 5;
            background-color: white;
            padding: 40px;
        }
    }
  }
}
</style>