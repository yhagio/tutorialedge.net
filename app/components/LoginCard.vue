<template>
    <div class="comment-login">
        <div class="image">
            <img src="https://images.tutorialedge.net/images/logo.svg" alt="TutorialEdge Logo" />
        </div>
        <div class="register">   
            <h2>Register or Login to Comment</h2>
            <p>Join the thousands of developers using this site everyday, take part in the programming challenges and keep up to date with 
            the latest programming news!</p>
            <button id="btn-login" v-on:click="login" class="btn btn-dark"><i class="ion ion-person"></i> Register or Login To Comment</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "LoginCard",
    methods: {
        login: function() {
            this.$auth.login();
        }
    }
}
</script>

