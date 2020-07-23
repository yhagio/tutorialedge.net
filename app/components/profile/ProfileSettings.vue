<template>
    <div class="flex">
        <div class="flex-1 px-8 py-4">
            <h4 class="font-semibold">Manage your Account Settings</h4>
            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                Username
            </label>
            <input v-model="this.user.name" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username">
            
            <label class="block text-gray-700 text-sm font-bold mb-2 mt-4" for="username">
                Nickname
            </label>
            <input v-model="this.user.nickname" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="nickname">

            <label class="block text-gray-700 text-sm font-bold mb-2 mt-4" for="username">
                Email
            </label>
            <input v-model="this.user.email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="email">

            <button class="btn btn-primary">Update Account</button>
        </div>

        <div class="flex-1">
            <div>
                <h4 class="text-xl mb-4">Payment Settings</h4>
                
                <p class="mb-4"><b>Stripe Account:</b> {{ this.profile.account.customer_no }}</p>
                <p class="mb-4"><b>Manage Payments:</b> <a :href="this.profile.account.billing_portal.url" class="btn btn-primary text-white">Billing Portal</a></p>
            </div>

            <div class="mt-8">
                <h4 class="text-xl">Delete Account</h4>
                <p class="text-sm">This is currently being automated! Drop me an email and I can delete your account manually if you need it deleted - support@elliotforbes.co.uk</p>
                <!-- <p class="text-sm">Deleting your account involves deleting all comments, challenges completed and code snippets from the website.</p>
                <p ckass="text-sm"><b>Warning</b>: This action <b>cannot</b> be undone.</p>
                <div class="mt-4 mb-4">
                    <input type="checkbox" class="form-check-input" v-model="confirm">
                    <label class="form-check-label" for="exampleCheck1">Confirm Deletion</label>
                </div>

                <button class="btn btn-danger" :disabled="this.confirm === false">Delete Account</button> -->

            </div>

        </div>
    

    </div>
</template>

<script>
import ProfileDeleteButton from './ProfileDeleteButton.vue';
import config from 'environment';

export default {
    name: "ProfileSettings",
    props: ['user', 'profile'],
    components: {
        ProfileDeleteButton
    },
    data: function() {
        return {
            confirm: false
        }
    },
}
</script>