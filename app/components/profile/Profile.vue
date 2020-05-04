<template>
    <div>
        <div v-if="!loaded">
            <h2>Loading...</h2>
        </div>
        <div v-if="loaded" class="profile-wrapper">
            <div class="profile">
                <img v-bind:src="user.picture" alt="Profile Picture">

                <h2>Profile: {{ this.user.name }}</h2>
            </div> 

            <div class="clear"></div>
        
            <p><b>Privacy Policy: <a href="/privacy/">📕 Read Now</a></b></p>
            <p><b> $100 Free DigitalOcean Credit: <a href="https://m.do.co/c/b348c7113c88">🦈 Claim Now</a></b></p>

            <div class="profile-container">
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link active" id="trophies-tab" data-toggle="tab" href="#trophies" role="tab" aria-controls="trophies" aria-selected="true">Trophies</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="comments-tab" data-toggle="tab" href="#comments" role="tab" aria-controls="comments" aria-selected="false">Comments</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="settings-tab" data-toggle="tab" href="#settings" role="tab" aria-controls="settings" aria-selected="false">Settings</a>
                    </li>
                </ul>
                <div class="tab-content" id="myTabContent">
                    <div class="tab-pane fade show active" id="trophies" role="tabpanel" aria-labelledby="trophies-tab">
                        <div class="row">
                            <div class="col-lg-4">
                                <div class="trophy">
                                    <img src="https://images.tutorialedge.net/images/golang.svg" alt="First 1000 Gophers!">
                                    <p><b>An Original Clan Member</b> - One of the First 1,000 Users</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="comments" role="tabpanel" aria-labelledby="comments-tab">
                        <ul class="list-group">
                            <li v-for="comment in comments" v-bind:key="comment.id" class="list-group-item d-flex justify-content-between align-items-center">
                                <p><b>{{comment.slug}}</b> {{comment.body}}</p>
                                <!-- <span class="badge badge-primary badge-pill">14</span> -->
                            </li>
                        </ul>
                        
                    </div>
                    <div class="tab-pane fade" id="settings" role="tabpanel" aria-labelledby="settings-tab">
                        Currently Under Construction!
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

export default {
    name: 'Profile',
    data: function() {
        return {
            user: {},
            comments: [],
            loaded: false
        }
    },
    methods: {
        getComments: async function() {
            let response = await axios.get(config.apiBase + "/v1/user", { params: {
                name: this.user.name
            }});

            this.comments = response.data.comments;
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
                console.log("redirecting...")
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
.profile-wrapper {
    h3 {
        margin-left: 0px;
    }
}

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