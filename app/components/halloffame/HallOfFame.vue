<template>
    <div>
        <div class="text-center">
            <h2>🎉 Hall of Fame 🎉</h2>
            <p>Sign up and complete challenges on the site to rank on the hall of fame! </p>
        </div>

        <div class="clear"></div>
        
        <table class="table">
            <thead>
                <th>Profile</th>
                <th>Nickname</th>
                <th>Score</th>
            </thead>
            <tbody>
                <tr>
                    <td><img src="https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg" alt=""></td>
                    <td>Elliot</td>
                    <td>100</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: "HallOfFame",
    data: function() {
        return {}
    },
    // created: function() {
    //     // console.log("hi!")
    // }
}
</script>

<style lang="scss">
.table {
    img {
        width: 50px;
        height: auto;
        border-radius: 100%;
    }
}
</style>