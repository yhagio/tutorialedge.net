<template>
    <div class="snippet">
        <Loading v-if="this.loading" />

        <h5>All Challenges</h5>


    </div>
</template>

<script>
import Carbon from '../misc/Carbon.vue';
import axios from 'axios';
import config from 'environment';
import Loading from '../misc/Loading.vue';

export default {
    name: 'ChallengeHome',
    components: {
        Carbon,
        Loading
    },
    data () {
        return {
            loggedIn: false,
        }
    },
    created: async function() {
        this.redirectTo = "/profile/?redirectUri=" + window.location.pathname;
        if(this.$auth.isAuthenticated()) {
            this.loggedIn = true;
        }
    }
}
</script>
