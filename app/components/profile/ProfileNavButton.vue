<template>
    <div>
        <li v-if="loggedIn" class="nav-item sign-up"><a class="nav-link" href="/profile/">💻 Profile</a></li>
        <li v-if="loggedIn == false" class="nav-item sign-up"><a class="nav-link" href="/profile/"> Register / Log-In</a></li>
    </div>
</template>

<script>
export default {
    name: 'ProfileNavButton',
    data: function() {
        return {
            loggedIn: false
        }
    },
    created: function() {
        if(this.$auth.isAuthenticated()) {
            this.loggedIn = true;
        } 
    }
}
</script>