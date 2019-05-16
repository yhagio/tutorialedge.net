<template>
    <li class="nav-item sign-up">
        <span v-if="this.isLoggedIn === false"><a class="nav-link" v-on:click="login"><i class="ion-person"></i>  Sign Up</a></span>
        <span v-if="isLoggedIn"><a class="nav-link" href="/profile/">Profile</a></span>
        
    </li>
</template>

<script>
export default {
    name: "Signup",
    data: function() {
        return {
            isLoggedIn: false
        }
    },
    methods: {
        login: function() {
            Cookies.set("redirect_url", window.location.href);
            // window.location.replace("http://localhost:3000/api/v1/login");
            window.location.replace("https://api.tutorialedge.net/api/v1/login");
        }
    }
}
</script>