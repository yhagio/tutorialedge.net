<template>
    <div id="screencast">
        <div v-if="this.showOverlay" class="overlay"></div>
        <div v-if="this.showOverlay" class="info">
            <h2>This video is restricted to GitHub Sponsors only.</h2>
            <p>Your sponsorship helps to make videos like these possible! 🚀</p>
            <a href="https://github.com/sponsors/elliotforbes" class="btn btn-outline btn-white">
                Sponsor Now
                <Githubsvg />
            </a>
        </div>
    </div>    
</template>

<script>
import Player from '@vimeo/player';
import Githubsvg from '../misc/Githubsvg.vue';
import Carbon from '../misc/Carbon.vue';

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
            user: {}
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
        // console.log(this.paid);
        if(this.paid === "true") {
            if(this.$auth.isAuthenticated() && this.$auth.getIsSponsor()) {
                this.showOverlay = false;
                this.loadVideo();
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

<style lang="scss">


</style>