<template>
    <div>
        <li class="nav-item sign-up"><a class="nav-link" v-on:click="login"><i class="ion-person"></i>  Sign Up</a></li>
    </div>
</template>

<script>
export default {
    name: "Signup",
    methods: {
        login: function() {
            Cookies.set("redirect_url", window.location.href);
            // window.location.replace("http://localhost:3000/api/v1/login");
            window.location.replace("https://api.tutorialedge.net/api/v1/login");
        }
    }
}
</script>