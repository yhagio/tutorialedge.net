<template>
    <div>
        <div class="profile">
            <img v-bind:src="user.picture" alt="Profile Picture">

            <h2>Profile: {{ this.user.name }} <br/>
            <small>Thank you for Registering - This is currently in BETA</small></h2>
        </div>

        <hr/>
        <p><b>Privacy Policy: <a href="/privacy/">📕 Read Now</a></b></p>

        <div class="preferences">
            <button class="btn btn-danger">Delete Account</button>
        </div>


        <a href="/logout/" class="btn btn-warning">Logout</a>
    </div>
</template>

<script>
export default {
    name: 'Profile',
    data: function() {
        return {
            user: {}
        }
    },
    created: function() {
        
        if(!this.$auth.isAuthenticated()) {
            this.$auth.login()
        } else {
            this.user = this.$auth.getUser()
        }
    }
}
</script>

<style lang="scss">
.profile {
    display: flex;
    h1 {
        margin-top: 20px;
    }
    img {
        width: 80px;
        height: 80px;
        margin-right: 20px;
        margin-top: 15px; 
        border-radius: 50%;
    }
}
</style>