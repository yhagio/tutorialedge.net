<template>
    <div>
        <div class="trophy">
            <img src="https://images.tutorialedge.net/images/golang.svg" alt="First 1000 Gophers!">
            <p><b>An Original Clan Member</b> - One of the First 1,000 Users</p>
        </div>
        <!-- <div class="trophy">
            <img src="https://images.tutorialedge.net/badges/go-badge.svg" alt="Challenge Complete!">
            <p><b>Challenger Trophy</b> - You have completed a Go Challenge!</p>
        </div> -->
    </div>
</template>

<script>
export default {
    name: 'ProfileAchievements',
    props: ['achievements']
}
</script>