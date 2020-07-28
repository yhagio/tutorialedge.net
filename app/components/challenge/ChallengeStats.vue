<template>
    <div id="stats" class="bg-gray-200 px-8 py-8">
        <div class="max-w-screen-xl mx-auto flex justify-between">
            <div class="bg-white w-full mr-4 px-8 py-8 rounded shadow">
                <p class="text-sm">Complete</p>
                <p class="text-3xl">495 Complete</p>
            </div>
            <div class="bg-white w-full mr-4 px-8 py-8 rounded shadow">
                <p class="text-sm">Total Challenges</p>
                <p class="text-3xl">20</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ChallengeStats',
    data: function() {
        return {
            challenges: []
        }
    },
    // created: function() {
    //     axios.get("")
    // }
}
</script>