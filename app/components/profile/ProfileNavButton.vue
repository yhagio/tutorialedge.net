<template>
    <div>
        <li v-if="loggedIn" class="nav-item sign-up"><a class="nav-link" href="/profile/">💻 Profile</a></li>
        <li v-if="loggedIn == false" class="nav-item sign-up"><a href="/login/" class="nav-link">🚀 Sign in</a></li>
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

<style lang="scss">
.sign-up {

}

button.nav-link {
    background-color: rgba(0,0,0,0);
    padding: 0;
    margin: 0;
    height: 100%;
    color: white;
}
</style>