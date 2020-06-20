<template>
    <div>
        <h5>Challenges Completed</h5>
        <p v-if="this.challenges.length == 0">You have not passed any challenges yet.</p>

        <Loading v-if="this.loading" />

        <span v-if="this.err" class="alert alert-danger">{{this.err}}</span>

        <div class="clear"></div>

       <ul class="challenges">
             <li v-for="challenge in challenges" v-bind:key="challenge.id" class="d-flex justify-content-between align-items-center">
                <p>
                    <b><a :href="challenge.slug">{{challenge.slug}}</a></b>
                    <br/><b>Score:</b> {{challenge.score}} 🥇
                    <!-- <br/><b>View Submission: </b> <a v-on:click="showCode(challenge)">link</a> -->
            
                </p>
                <p><b>Status: </b> <span v-if="challenge.passed">✅</span></p>
                
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'ProfileChallenges',
    props: ['challenges'],
    methods: {
        showCode: function(challenge) {
            console.log("clicked");
            challenge.show = true;
        }
    }
}
</script>

<style lang="scss">
ul.challenges {
    margin: 0;
    padding: 0;

    li {
        padding-bottom: 15px;
        padding-top: 15px;
        border-bottom: 1px solid #cecece;
    }

    p {
        margin: 0;
        padding: 0;
    }
}
</style>