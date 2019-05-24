<template>
    <div class="comment-login">
        <div class="image">
            <img :src="user.picture" :alt="user.name" />
        </div>
        <div class="register">
            
            <h2>Username: {{ user.name }}</h2>
            <br/>
            <button id="logout" v-on:click="logout" class="btn btn-primary">Logout</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: "ProfileCard",
    data: function () {
        return {
            user: {}
        }
    },
    methods: {
        logout: async function() {
            this.$auth.logout()
        }
    },
    created: function () {
        this.user = this.$auth.user;
    }
}
</script>
