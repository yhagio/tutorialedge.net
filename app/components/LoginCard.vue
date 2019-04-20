<template>
    <div class="comment-login">
        <div class="image">
            <img src="/images/logo.png" />
        </div>
        <div class="register">   
            <h2>Register or Login to Comment</h2>
            <p>Join the thousands of developers using this site everyday, take part in the programming challenges and keep up to date with 
            the latest programming news!</p>
            <button id="btn-login" v-on:click="login" class="btn btn-success"><i class="ion ion-person"></i> Register or Login To Comment</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "LoginCard",
    methods: {
        login: function() {
            Cookies.set("redirect_url", window.location.href);
            // window.location.replace("http://localhost:3000/api/v1/login");
            window.location.replace("https://api.tutorialedge.net/api/v1/login");
        }
    }
}
</script>

