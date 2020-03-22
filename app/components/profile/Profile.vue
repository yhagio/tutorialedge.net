<template>
    <div>
        <div class="profile">
            <img v-bind:src="user.picture" alt="Profile Picture">

            <h2>Profile: {{ this.user.name }} <br/>
            <small>Thank you for Registering - This is currently in BETA</small></h2>
        </div>

        <hr/>
        
        <h3>Achievements</h3>

        <!-- <div class="row">
            <div class="col-lg-4">
                <div class="card">
                    <img src="https://images.tutorialedge.net/images/golang.svg" alt="">
                    <h2>Beginners</h2>
                    <button class="btn btn-primary">Attempt</button>
                </div>
            </div>
        </div> -->


        <hr/>
        <p><b>Privacy Policy: <a href="/privacy/">📕 Read Now</a></b></p>

        <div class="preferences">
        </div>


        <a href="/logout/" class="btn btn-warning">Logout</a>
    </div>
</template>

<script>
import * as Cookie from 'es-cookie';

export default {
    name: 'Profile',
    data: function() {
        return {
            user: {}
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
        }
    }
}
</script>

<style lang="scss">
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