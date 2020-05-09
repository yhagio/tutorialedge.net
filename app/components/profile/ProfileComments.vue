<template>
    <div>
        <p v-if="this.comments.length == 0">You have not posted any comments yet.</p>

        <Loading v-if="this.loading" />

        <ul class="list-group">
            <li v-for="comment in comments" v-bind:key="comment.id" class="list-group-item d-flex justify-content-between align-items-center">
                <p><b>{{comment.slug}}</b> {{comment.body}}</p>

                <button type="button" class="btn btn-danger" v-on:click="deleteComment(comment)">
                    Delete Comment
                </button>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios';
import config from 'environment';

import Loading from '../misc/Loading.vue';

export default {
    name: 'ProfileComments',
    props: ['comments'],
    components: {
        Loading
    },
    data: function() {
        return {
            loading: false
        }
    },
    methods: {
        deleteComment: async function(comment) {
            this.loading = true;
            let response = await axios.delete(config.apiBase + "/v1/comments",
            {   params: { id: comment.ID },
                headers: { 
                            "Authorization": "Bearer " + this.$auth.getAccessToken(),
                            "Content-Type": "application/json"
                }
            });

            this.loading = false;
            window.location.reload();
        }
    }
}
</script>
