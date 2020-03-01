  
<template>
    <div class="comments-section">
        <ProfileCard v-if="loggedIn"/>
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

        let pageId = document.getElementById('page-id').innerHTML;  
        let response = await axios.get("https://api.tutorialedge.net/api/v1/comments/" + pageId);
        this.comments = response.data;

    }
}
</script>