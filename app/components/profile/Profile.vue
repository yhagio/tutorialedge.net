<template>
    <div>
        <Loading v-if="this.loading" />
        
        <div v-if="loaded" class="profile-wrapper">
            <div class="profile">
                <img v-bind:src="user.picture" alt="Profile Picture">
                <h2>Profile: {{ this.user.name }}
                    <br/>
                    <small>🏆 Score: {{ this.score }}</small>
                </h2>
            </div> 

            <p v-if="this.$auth.getIsSponsor()">
                <b>Account Type:</b> 
                <span >Sponsor</span>        
            </p>

            <p><b>Privacy Policy: <a href="/privacy/">📕 Read Now</a></b></p>
            <p><b>Upgrade Account: <a href="/pricing/">🚀 Pricing</a></b></p>

            <div class="profile-container">
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link active" id="Challenges-tab" data-toggle="tab" href="#Challenges" role="tab" aria-controls="Challenges" aria-selected="true">🎯 Challenges</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="trophies-tab" data-toggle="tab" href="#trophies" role="tab" aria-controls="trophies" aria-selected="true">🏆 Trophies</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="comments-tab" data-toggle="tab" href="#comments" role="tab" aria-controls="comments" aria-selected="false">💬 Comments</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="settings-tab" data-toggle="tab" href="#settings" role="tab" aria-controls="settings" aria-selected="false">⚙️ Settings</a>
                    </li>
                </ul>
                <div class="tab-content" id="myTabContent">
                    <div class="tab-pane fade show active" id="Challenges" role="tabpanel" aria-labelledby="Challenges-tab">
                        <Profile-Contributions v-if="!this.loading" :challenges="this.profile.challenges" />
                        <Profile-Challenges v-if="!this.loading" :challenges="this.profile.challenges" />
                    </div>
                    <div class="tab-pane fade" id="trophies" role="tabpanel" aria-labelledby="trophies-tab">
                        <h5>Achievements</h5>
                        <Profile-Achievements v-if="!this.loading" :challenges="this.challenges" />
                    </div>
                    <div class="tab-pane fade" id="comments" role="tabpanel" aria-labelledby="comments-tab">
                       <h5>Comments You Have Posted:</h5>
                       <Profile-Comments :comments="this.profile.comments" />                        
                    </div>
                    <div class="tab-pane fade" id="settings" role="tabpanel" aria-labelledby="settings-tab">
                        <h5>Manage your Account Settings</h5>
                        <Profile-Settings :user="this.user"/>                        
                    </div>
                </div>
            </div>

            <hr/>
            <a href="/logout/" class="btn btn-warning">Logout</a>
        </div>
    </div>
</template>

<script>
import * as Cookie from 'es-cookie';
import axios from 'axios';
import config from 'environment';
import ProfileSettings from './ProfileSettings.vue';
import ProfileComments from './ProfileComments.vue';
import ProfileAchievements from './ProfileAchievements.vue';
import ProfileContributions from './ProfileContributions.vue';
import ProfileChallenges from './ProfileChallenges.vue';
import Loading from '../misc/Loading.vue';

export default {
    name: 'Profile',
    components: {
        Loading,
        ProfileAchievements,
        ProfileContributions,
        ProfileComments,
        ProfileChallenges,
        ProfileSettings
    },
    data: function() {
        return {
            user: {},
            profile: {
                comments: [],
                challenges: []
            },
            comments: [],
            loaded: false
        }
    },
    methods: {
        getComments: async function() {
            this.loading = true;
            let response = await axios.get(config.apiBase + "/v1/user", { params: {
                name: this.user.name,
                sub: this.user.sub
            }});

            this.loading = false;

            this.profile = response.data;
        }
    },
    computed: {
        score: function() {
            if(this.profile.challenges.length !== 0) {
                let score = 0;
                this.profile.challenges.forEach(challenge => score += challenge.score)
                return score;
            }
        }
    },
    created: function() {
        
        let urlParams = new URLSearchParams(window.location.search);
        let myParam = urlParams.get('redirectUri');
    
        if(myParam) {
            Cookie.set("redirectUri", myParam)
        } 

        if(!this.$auth.isAuthenticated()) {
            this.$auth.login()
        } else {
            this.user = this.$auth.getUser()
            this.getComments();
            let redirectTo = Cookie.get("redirectUri");
            if(redirectTo) {
                Cookie.remove("redirectUri")
                window.location.replace(redirectTo)
            }
            this.loaded = true;
        }
    }
}
</script>

<style lang="scss">
.tab-content {
    margin-top: 20px; 
}

.delete-btn {
    width: auto;
}

.profile-wrapper {
    h3 {
        margin-left: 0px;
    }
}

.profile {
    display: flex;
    
    h2 {
        margin-top: 20px;
        margin-left: 20px;
    }

    img {
        width: 80px;
        height: 80px;
        margin-right: 20px;
        margin-top: 15px; 
        border-radius: 50%;
    }
}

.trophy {
    
    img {
        width: 50px !important; 
        height: 50px !important;
        float: left;
        margin-right: 20px;
    }
}

.card {
    img {
        width: 80%;
        height: auto;
        margin: auto;
        padding: 40px 20px;
    }


    button {
        width: 100%;
        display: block;
    }
}

</style>