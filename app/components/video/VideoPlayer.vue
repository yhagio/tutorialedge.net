<template>
    <div id="screencast">
        <div v-if="this.showOverlay" class="overlay"></div>
        <div v-if="this.showOverlay" class="info">
            <h2>This video is restricted to Subscribers.</h2>
            <p>Subscribe in order to access all premium content on the site! 🚀</p>
            <a href="/pricing/" class="btn btn-outline btn-white">
                Subscribe Now 🚀
            </a>
        </div>
    </div>    
</template>

<script>
import Player from '@vimeo/player';
import Githubsvg from '../misc/Githubsvg.vue';
import Carbon from '../misc/Carbon.vue';
import axios from 'axios';
import config from 'environment';

export default {
    name: 'VideoPlayer',
    props: ["id", "next", "paid"],
    components: {
        Githubsvg,
        Carbon
    },
    data: function() {
        return {
            showOverlay: true,
            paid: false,
            user: {},
            profile: {}
        }
    },
    methods: {
        loadVideo: function() {
            var options = {
                id: this.id,
                autoplay: true,
                resize: true
            };

            let player = new Player('screencast', options);
            player.loadVideo(this.id)
                .then(function(id) {})
                .catch(function(error) {
                    console.log(error);
                }); 
        },
    },
    mounted: function() {
        // if this is a premium video
        // only remove the overlay if the user is authenticated and
        // the user is a sponsor
        if(this.paid === "true") {
            if(this.$auth.isAuthenticated()) {

                this.user = this.$auth.getUser()
                this.loading = true;
                let response = axios.get(config.apiBase + "/v1/user", { params: {
                    sub: this.user.sub
                }}).then((response) => {
                    this.loading = false;
                    this.profile = response.data;
    
                    if(this.profile.account.premium) {
                        this.showOverlay = false;
                        this.loadVideo();
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
            }
        } else {
            // if it isn't a premium video then
            // remove the overlay and load the video
            this.showOverlay = false;
            this.loadVideo();
        }
    }
}
</script>
