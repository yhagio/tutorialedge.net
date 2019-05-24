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
            isLoggedIn: false,
            user: {}
        }
    },
    created: function() {
        if(this.$auth.isAuthenticated()) {
            this.user = this.$auth.user;
            this.isLoggedIn = true;
        }
    },
    methods: {
        login: function() {

            this.$auth.login();
        }
    }
}
</script>