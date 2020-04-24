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
            
            <h3>🏆 Trophies</h3>

            <div class="row">
                <div class="col-lg-4">
                    <div class="trophy">
                        <img src="https://images.tutorialedge.net/images/golang.svg" alt="First 1000 Gophers!">
                        <p><b>An Original Clan Member</b> - One of the First 1,000 Users</p>
                    </div>
                </div>
            </div>


            <hr/>
            <p><b>Privacy Policy: <a href="/privacy/">📕 Read Now</a></b></p>

            <div class="preferences">
            </div>


            <a href="/logout/" class="btn btn-warning">Logout</a>
        </div>
    </div>
</template>

<script>
import * as Cookie from 'es-cookie';

export default {
    name: 'Profile',
    data: function() {
        return {
            user: {},
            loaded: false
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