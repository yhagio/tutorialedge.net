  
<template>
    <div class="new-comment">

        <div class="comment-input" id="comment-input">
            <textarea v-model="commentBody" placeholder="Leave a reply"></textarea>
            <br/>
            <button id="comment" v-on:click="submitComment" class="btn btn-primary float-right">
                Submit
            </button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: "NewComment",
    data: function() {
        return {
            commentBody: "",
            user: {}
        }
    },
    created: function() {
        this.user = this.$auth.getUser();
    },
    methods: {
        submitComment: async function() {
            try {

                let body = JSON.stringify({
                    slug: window.location.pathname,
                    body: this.commentBody,
                    author: this.user.name,
                    picture: this.user.picture,
                    user: this.user
                })

                let response = await axios({ method: "post", 
                    url: config.apiBase + "/v1/comments", 
                    data: body,
                    headers: {
                        "Authorization": "Bearer " + this.$auth.getAccessToken(),
                        "Content-Type": "application/json"
                    }
                });
            } catch (err) {
                console.log(err);
            }
            window.location.reload();
        }
    }
}
</script>

<style lang="scss">
.new-comment {
    width: 100%;
    background-color: #F2F5F7;
    border-radius: 5px;
    padding: 40px;
}
</style>