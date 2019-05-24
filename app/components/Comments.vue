<template>
    <div>
        <LoginCard v-if="!loggedIn"/>
        <ProfileCard v-if="loggedIn"/>
        <h2><i class="ion ion-android-chat"></i>  Comments Section</h2>
        <NewComment :user="user" v-if="loggedIn"/>
        <div v-if="comments.length === 0">
            <h4>Be the first to comment!</h4>
            <p>Let me know what you thought of this tutorial. Your feedback on these tutorials can impact the wider community and help others overcome their own challengets.</p>
        </div>
        <Comment 
            v-for="(comment, index) in comments" 
            :key="index"
            :comment="comment"/>
    </div>
</template>

<script>
import ProfileCard from './ProfileCard.vue';
import LoginCard from './LoginCard.vue';
import NewComment from './NewComment.vue';
import Comment from './Comment.vue';
import axios from 'axios';

export default {
    name: "Comments",
    components: {
        LoginCard: LoginCard,
        ProfileCard: ProfileCard,
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
        this.loggedIn = this.$auth.isAuthenticated();
        
        let pageId = document.getElementById('page-id').innerHTML;  
        let response = await axios.get("https://api.tutorialedge.net/api/v1/comments/" + pageId);
        this.comments = response.data;
    }
}
</script>
