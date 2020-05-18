<template>
    <div class="comment">
        <Loading v-if="this.loading" />

        <div class="author">
            <div class="icon">
                <img v-if="comment.picture!=='logo.svg'" :src="comment.picture" alt="">
                <img v-if="comment.picture==='logo.svg'" src="https://images.tutorialedge.net/images/logo.svg" alt="">
            </div>
        </div>
        <div class="comment-body">
            <h4>{{ comment.author }} <small>{{ comment.CreatedAt | formatDate }}</small></h4>
            <span v-html="markdown(comment.body)"></span>
            <p v-if="isOwner" class="comment-controls">
                <!-- <button class="btn btn-link btn-no-margin" v-on:click="editComment(comment)">Edit</button> |  -->
                <button class="btn btn-link btn-no-margin" v-on:click="deleteComment(comment)">Delete</button>
            </p>
        </div>
        <div class="comment-votes">
            <a v-on:click="upvote('thumbs_up')" v-bind:class="{upvoted: this.vote === 'thumbs_up'}" class="badge badge-light">{{ comment.thumbs_up }} 👍</a>
            <a v-on:click="upvote('thumbs_down')" v-bind:class="{upvoted: this.vote === 'thumbs_down'}" class="badge badge-light">{{ comment.thumbs_down }} 👎</a>
            <a v-on:click="upvote('heart')" v-bind:class="{upvoted: this.vote === 'heart'}" class="badge badge-light">{{ comment.heart }} ❤️</a>
            <a v-on:click="upvote('smile')" v-bind:class="{upvoted: this.vote === 'smile'}" class="badge badge-light">{{ comment.smile }} 😃</a>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import config from 'environment';
import md from 'markdown-it';
import Loading from '../misc/Loading.vue';

export default {
    name: 'Comment',
    props: ['comment'],
    components: {
        Loading
    },
    data: function() {
        return {
            formattedDate: '',
            counter: 0,
            voted: false,
            loading: false,
            isOwner: false
        }
    },
    created: function() {
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

        if (this.$auth.isAuthenticated()) {
            let user = this.$auth.getUser();
            if(user.sub === this.comment.sub) {
                this.isOwner = true;
            }
        }
            
    },
    methods: {
        markdown: function(input) {
            return md({
                html: true
            }).render(input)
        },
        upvote: async function(vote) {
            if(!this.voted) {
                this.voted = true;
                this.comment[vote] += 1;

                let response = await axios({
                    method: 'put',
                    url: config.apiBase + "/v1/comments",
                    data: this.comment,
                    headers: {
                        "Authorization": "Bearer " + this.$auth.getAccessToken(),
                        "Content-Type": "application/json"
                    }
                })
            }
        },
        editComment: async function(comment) {
            this.loading = true;
            if (this.$auth.isAuthenticated()) {
                try {
                    let response = await axios({
                        method: 'put',
                        url: config.apiBase + "/v1/comments",
                        data: this.comment,
                        headers: {
                            "Authorization": "Bearer " + this.$auth.getAccessToken(),
                            "Content-Type": "application/json"
                        }
                    })
                    this.loading = false;
                } catch (err) {
                    this.loading = false;
                    this.error = err;
                }
            }
        },
        deleteComment: async function(comment) {
            this.loading = true;
            if (this.$auth.isAuthenticated()) {
                try {
                    let response = await axios({
                        method: 'delete',
                        params: { id: comment.ID },
                        url: config.apiBase + "/v1/comments",
                        data: this.comment,
                        headers: {
                            "Authorization": "Bearer " + this.$auth.getAccessToken(),
                            "Content-Type": "application/json"
                        }
                    })
                    this.loading = false;
                    window.location.reload();
                } catch (err) {
                    this.loading = false;
                    this.error = err;
                }
            }
        }
    }
}
</script>

<style lang="scss">

.comment {
    margin-top: 20px;
    margin-bottom: 20px;
    padding-bottom: 20px;
    display: flex;
    border-bottom: 1px solid rgb(230, 234, 235);
    
    .comment-controls {
        font-size: small;
    }

    .btn-no-margin {
        margin: 0;
        padding: 0;
        font-size: small;
    }

    .badge {
        padding: 5px 10px;
    }

    .upvoted {
        background-color: #33AACC;
        color: white !important;
    }

    .badge:hover {
        color: white !important;
        background-color: #33AACC;
    }

    h4 {
        small {
            margin-left: 10px;
            font-size: 0.75rem;
            color: #63768d;;
        }
    }

    p {
        margin: 0;
    }

    .author{
        flex: 1;
        img {
            border-radius: 100%;
            color: white;
            display: block;
            width: 45px;
            height: 45px;
            margin: auto;
            margin-top: 15px;
        }
    }
    .comment-body {
        flex: 6;
        background-color: white;
    }
}
</style>