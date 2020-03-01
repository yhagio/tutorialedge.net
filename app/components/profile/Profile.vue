<template>
    <div>
        <div class="profile">
            <img v-bind:src="user.picture" alt="Profile Picture">

            <h2>Profile: {{ this.user.name }} <br/>
            <small>Thank you for Registering - This is currently in BETA</small></h2>
        </div>

        <hr/>

        <p><b>Privacy Policy: <a href="/privacy/">Read Now</a></b></p>

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
        console.log(this.$auth.test());
    }
}
</script>