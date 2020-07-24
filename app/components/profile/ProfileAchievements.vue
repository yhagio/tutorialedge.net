<template>
    <div>
        <div class="flex mb-8 px-8 py-8 border-b border-gray-200">
            <img class="w-4 h-auto mr-8" src="https://images.tutorialedge.net/images/golang.svg" alt="First 1000 Gophers!">
            <p><b>An Original Clan Member</b> - One of the First 1,000 Users</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ProfileAchievements',
    props: ['challenges'],
    methods: {
        getAchievements() {
            // console.log("Getting User Achievements");
        }
    }
}
</script>