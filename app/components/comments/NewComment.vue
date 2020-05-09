  
<template>
    <div>
        <div v-if="this.error != ''" class="alert alert-warning">{{this.error}}</div>

        <Loading v-if="this.loading" />

        <div class="new-comment">
            <div class="comment-input" id="comment-input">    
                <textarea v-model="commentBody" placeholder="Leave a reply..."></textarea>
                <br/>
                <small>Markdown Enabled 😎</small>
                <button id="comment" v-on:click="submitComment" class="btn btn-primary float-right">
                    Submit 💬
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import config from 'environment';
import Loading from '../misc/Loading.vue';

export default {
    name: "NewComment",
    components: {
        Loading
    },
    data: function() {
        return {
            commentBody: "",
            user: {},
            error: '',
            loading: false
        }
    },
    created: function() {
        this.user = this.$auth.getUser();
    },
    methods: {
        submitComment: async function() {
            try {

                this.loading = true;

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
                window.location.reload();
            } catch (err) {
                this.error = err;
                this.loading = false;
            }
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

.loading {
    display: block;
    width: 100%;
    text-align: center;
    img {
        width: 100px;
        height: auto;
        margin: auto;
        margin-bottom: 20px;
        margin-top: 20px;
    }
}
</style>