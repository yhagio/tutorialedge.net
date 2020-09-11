<template>
    <div class="bg-gray-200 border-b">
        <Loading v-if="this.loading" />
        
        <div v-if="loaded">
            <div class="bg-gray-800 px-16 py-8 flex text-white">
                <div class="flex-1 flex">
                    <img class="rounded mt-16 sm:mt-0 w-16 h-16 sm:w-16 sm:h-16 mr-8" v-bind:src="user.picture" alt="Profile Picture">
                    <div>
                        <h2 class="text-2xl text-white mt-2">Profile: {{ this.user.name }}</h2>

                        <p class="text-sm text-gray-400 mt-4">Nickname: <span class="text-white">{{this.user.nickname}}</span></p>
                        <!-- <p class="text-sm text-gray-400 mt-4">Debug Info: <span class="text-white">{{this.user}}</span></p> -->

                        <p id="account-status" class="text-sm text-white mt-4" v-if="this.profile.account.premium">✅ Premium Account</p>
                        <p id="account-status" class="text-sm text-gray-400 mt-4" v-if="!this.profile.account.premium">Free Account - <a class="text-white text-underline" href="/pricing/">Upgrade Account 🚀</a></p>
                    </div>
                </div>
                <div class="flex-1 mt-4">
                    <div class="flex justify-end">
                        <!-- <a href="/write/"><button class="bg-transparent mr-8 border border-solid border-gray-600  hover:bg-gray-600 text-gray-200 font-semibold hover:text-white py-4 px-4 rounded">Create Post ✍️ </button></a> -->
                        <a href="/logout/"><button aria-label="logout" class="bg-transparent border border-solid border-gray-600  hover:bg-gray-600 text-gray-200 font-semibold hover:text-white py-4 px-4 rounded">Logout 🚪</button></a>
                    </div>
                </div>
            </div> 

            <div class="bg-gray-900 px-16 py-8 flex text-center">
                <div id="score" class="flex-1 text-white">
                    <p class="uppercase text-sm">Challenges score:</p>
                    <p class="text-3xl">🏆 {{ this.score }}</p>
                </div>

                <!-- <div id="quizes" class="flex-1 text-white">
                    <p class="uppercase text-sm">Quizzes Complete:</p>
                    <p class="text-3xl">🧪 5</p>
                </div>

                <div id="quizes" class="flex-1 text-white">
                    <p class="uppercase text-sm">Courses Complete:</p>
                    <p class="text-3xl">📚 2</p>
                </div> -->
            </div>

            <div id="stats" class="bg-gray-200 px-8 py-8">
                <div class="max-w-screen-xl mx-auto flex justify-between">
                    <div class="bg-white w-full mr-4 px-8 py-8 rounded shadow">
                        <p class="text-sm">Comments</p>
                        <p class="text-3xl">{{ this.profile.comments.length }}</p>
                    </div>
                    <div class="bg-white w-full mr-4 px-8 py-8 rounded shadow">
                        <p class="text-sm">Challenges Complete</p>
                        <p class="text-3xl">{{ this.profile.challenges.length }}</p>
                    </div>
                    <div class="bg-white w-full mr-4 px-8 py-8 rounded shadow">
                        <p class="text-sm">Post Reactions</p>
                        <p class="text-3xl">0 Reactions</p>
                    </div>
                    <div class="bg-white w-full px-8 py-8 rounded shadow">
                        <p class="text-sm">Posts</p>
                        <p class="text-3xl">0</p>
                    </div>
                </div>
            </div>
            
            <div class="bg-gray-200">
                <div class="bg-white mx-auto max-w-screen-xl px-16 py-8 rounded shadow mb-8 overflow-scroll">
                    <Profile-Contributions v-if="!this.loading" :challenges="this.profile.challenges"></Profile-Contributions>
                    <Profile-Challenges v-if="!this.loading" :challenges="this.profile.challenges"></Profile-Challenges>
                </div>

                <div class="bg-white mx-auto max-w-screen-xl px-16 py-8 rounded shadow mb-8">
                    <h3 class="text-xl mb-4">Achievements</h3>
                    <Profile-Achievements v-if="!this.loading" :challenges="this.challenges" />
                </div>
                
                <div class="bg-white mx-auto max-w-screen-xl px-16 py-8 rounded shadow mb-8">
                    <h3 class="text-xl mb-4">Comments</h3>
                    <Profile-Comments :comments="this.profile.comments" />                        
                </div>

                <div class="bg-white mx-auto max-w-screen-xl px-16 py-8 rounded shadow mb-8">
                    <h3 class="text-xl mb-4">Settings</h3>
                    <Profile-Settings :user="this.user" :profile="this.profile"/>                        
                </div>
            </div>

        </div>

        <div class="blue-spacer"></div>
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
                challenges: [],
                account: {
                    customer_no: 0,
                    premium: false,
                    billing_portal: {
                        url: ""
                    }
                }
            },
            comments: [],
            loaded: false
        }
    },
    methods: {
        getComments: async function() {
            this.loading = true;
            let response = await axios.get(config.apiBase + "/v1/user", { params: {
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