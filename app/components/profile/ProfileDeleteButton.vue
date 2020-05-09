<template>
    <div>
        <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#deleteAccount">
        Delete Account
        </button>

        <div class="modal fade" id="deleteAccount" tabindex="-1" role="dialog" aria-labelledby="deleteAccountLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="deleteAccountLabel">Confirm Account Deletion</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        Are you sure you want to delete your account?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger">Delete Account</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DeleteAccountButton',
    props: [
        'user'
    ],
    data: function() {
        return {
            user: {}
        }
    },
    methods: {
        deleteAccount: async function() {
            let response = await axios.delete(config.apiBase + "/v1/user", { params: {
                name: this.user.name
            }});
        }
    }
}
</script>

<style lang="scss">
button {
    width: auto;
}
</style>