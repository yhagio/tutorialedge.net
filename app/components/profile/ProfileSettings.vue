<template>
    <div>
        <Profile-Pricing />

        <!-- <Profile-Delete-Button /> -->
    </div>
</template>

<script>
import ProfilePricing from './ProfilePricing.vue';
import ProfileDeleteButton from './ProfileDeleteButton.vue';

export default {
    name: "ProfileSettings",
    props: ['user'],
    components: {
        ProfilePricing,
        ProfileDeleteButton
    },
    data: function() {
        return {
            user: {}
        }
    },
    mounted: function() {
        console.log("hi!");
    }
}
</script>