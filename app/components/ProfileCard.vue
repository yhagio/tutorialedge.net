<template>
    <div class="comment-login">
        <div class="image">
            <img :src="user.user.picture" :alt="user.user.displayName" />
        </div>
        <div class="register">
            <h2>Username: {{ user.user.displayName }}</h2>
            <br/>
            <button id="logout" v-on:click="logout" class="btn btn-warning">Logout</button>
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
            console.log("hello");
            let response = await axios.get("https://api.tutorialedge.net/api/v1/logout");
            Cookies.remove("jwt-token");
            window.location.reload();
        }
    },
    created: function () {
        let token = Cookies.get("jwt-token");
        var base64Url = token.split(".")[1];
        var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        this.user = JSON.parse(window.atob(base64));
    }
}
</script>
