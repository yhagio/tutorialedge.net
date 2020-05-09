<template>
    <div class="comment">
        <div class="author">
            <div class="icon">
                <img v-if="comment.picture!=='logo.svg'" :src="comment.picture" alt="">
                <img v-if="comment.picture==='logo.svg'" src="https://images.tutorialedge.net/images/logo.svg" alt="">
            </div>
        </div>
        <div class="comment-body">
            <h4>{{ comment.author }} <small>{{ comment.posted }}</small></h4>
            <span v-html="markdown(comment.body)"></span>
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

export default {
    name: 'Comment',
    props: ['comment'],
    data: function() {
        return {
            formattedDate: '',
            counter: 0,
            voted: false,
        }
    },
    created: function() {
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
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