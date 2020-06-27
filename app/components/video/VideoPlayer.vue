<template>
    <div class="player">
        <div id="screencast">
            <div v-if="!this.paid" class="overlay"></div>
            <div v-if="!this.paid" class="info">
                <h2>This video is restricted to GitHub Sponsors only.</h2>
                <p>Your sponsorship helps to make videos like these possible! 🚀</p>
                <a href="https://github.com/sponsors/elliotforbes/button" class="btn btn-outline btn-white">
                    Sponsor Now
                    <GitHubSVG />
                </a>
            </div>
        </div>
        <div class="video-blurb">
            <h2>{{this.title}}</h2>
            <p>{{this.blurb}}</p>
        </div>
    </div>
</template>

<script>
import Player from '@vimeo/player';

export default {
    name: 'VideoPlayer',
    props: ["id", "next", "blurb", "title"],
    data: function() {
        return {
            paid: false
        }
    },
    methods: {
        loadVideo: function() {
            this.notPaid = true;
            var options = {
                id: this.id,
                autoplay: true,
                title: false,
                resize: true,
                password: 'supersecret'
            };

            let player = new Player('screencast', options);

            // Automatically send the user to the next video after completion.
            player.on('ended', function(ended) {
                window.location.assign(this.next);
            });

            player.loadVideo(this.id).then(function(id) {
                // the video successfully loaded
            }).catch(function(error) {
                console.log(error);
            }); 
        },
    },
    mounted: function() {
        this.loading = true;
        if(this.$auth.isAuthenticated()) {
            this.loading = false;
            this.paid = true;
            this.loadVideo();
        } else {
            this.loading = false;
        }
        
    }
}
</script>

<style lang="scss">
.player {
    margin: 80px;
    box-shadow: 0 10px 15px -3px rgba(0,0,0,.1), 0 4px 6px -2px rgba(0,0,0,.05);
    overflow: hidden;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
}
.overlay {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    background-image: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.3)), url("https://images.tutorialedge.net/uploads/screencast_overlay_2.png");
    filter: blur(4px);
    -webkit-filter: blur(4px);
    z-index: 0;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    overflow: hidden;

}
.info {
    position: absolute;
    top: 30%;
    width: 100%;
    font-size: 1rem;
    color: white;
    text-align: center;
    z-index: 100;
    h2 {
        color: white;
        font-size: 1.5rem;;
    }
}

#screencast { 
    position: relative; 
    padding-bottom: 56.25%; 
    height: 0; overflow: hidden; 
    max-width: 100%; height: auto;
} 
#screencast iframe, #screencast object, #screencast embed { 
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
   position: absolute; 
   top: 0; 
   left: 0; 
   width: 100%; 
   height: 100%; 
}

.btn-white {
    color: white;
    border: 2px solid white;
    &:hover {
        color: rgba(255,255,255,.65)
    }
}

.video-blurb{
    background-color: white;
    padding: 20px;
    z-index: 100;
}

</style>