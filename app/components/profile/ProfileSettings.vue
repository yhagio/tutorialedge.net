<template>
    <div class="row">
        <div class="col-lg-6">
            <h4>Manage your Account Settings</h4>
            <div class="form-group">
                <label for="Username">Name</label>
                <input id="Username" v-model="this.user.name" type="text" class="form-control" />
            </div>
            <div class="form-group">
                <label for="Username">Nickname</label>
                <input id="Username" v-model="this.user.nickname" type="text" class="form-control" />
            </div>
            <div class="form-group">
                <label for="Username">Email</label>
                <input id="Username" v-model="this.user.email" type="text" class="form-control" />
            </div>

            <button class="btn btn-primary">Update Account</button>
        </div>

        <div class="col-lg-6">
            <h4>Payment Settings</h4>
            
            <p><b>Stripe Account:</b> {{ this.profile.account.customer_no }}</p>
            <p><b>Manage Payments:</b> <a :href="this.profile.account.billing_portal.url" class="btn btn-primary text-white">Billing Portal</a></p>

            <hr/>

            <h4>Delete Account</h4>
            <p>Deleting your account involves deleting all comments, challenges completed and code snippets from the website.</p>
            <p><b>Warning</b>: This action <b>cannot</b> be undone.</p>

            <div class="form-check">
                <input type="checkbox" class="form-check-input" v-model="confirm">
                <label class="form-check-label" for="exampleCheck1">Confirm Deletion</label>
            </div>

            <button class="btn btn-danger" :disabled="this.confirm === false">Delete Account</button>
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