<template>
    <div>

        <p v-if="this.challenges.length == 0">You have not passed any challenges yet.</p>

        <Loading v-if="this.loading" />

        <span v-if="this.err" class="alert alert-danger">{{this.err}}</span>

        <div class="clear"></div>

       <ul class="list-group">
             <li v-for="challenge in challenges" v-bind:key="challenge.id" class="list-group-item d-flex justify-content-between align-items-center">
                <p><b>{{challenge.slug}}</b> - score: {{challenge.score}}</p>
                <p><b>Status: </b> <span v-if="challenge.passed">✅</span></p>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'ProfileChallenges',
    props: ['challenges'],
    created: function() {
        console.log
    }
}
</script>
