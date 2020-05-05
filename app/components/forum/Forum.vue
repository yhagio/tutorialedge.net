<template>
    <div>
        <h2>Forum</h2>
    </div>
</template>

<script>
export default {
    name: "Forum",
    data: function() {
        return {
            loading: true
        }
    },
    created: function() {
        console.log("Loading Forum")
    }
}
</script>