<template>
    <div class="new-comment">
        <div class="avatar">
            <img src="https://images.tutorialedge.net/images/logo.png" alt="default avatar">
        </div>
        <div class="comment-input" id="comment-input">
            <textarea v-model="commentBody" placeholder="Leave a reply"></textarea>
            <br/>
            <div class="comment-actions hidden">
                <button id="comment" v-on:click="submitComment" class="btn btn-primary float-right">
                    Submit
                </button>
            </div>
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
    methods: {
        submitComment: async function() {
            console.log(this.user);
            let pageId = document.getElementById('page-id').innerHTML;
            try {
            let response = await axios.post("https://api.tutorialedge.net/api/v1/comments/" + pageId, {
                bodh: this.commentBody,
                author: user.user.displayName,
                user: user,
                path: window.location.pathname
            }, {
                headers: { Authorization: "Bearer " + Cookies.get("jwt-token")}
            });
            } catch (err) {
                console.log(err);
            }
            window.location.reload();
        }
    },
    created: function() {
        let token = Cookies.get("jwt-token");
        let base64Url = token.split(".")[1];
        let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        this.user = JSON.parse(window.atob(base64));
    }
}
</script>

