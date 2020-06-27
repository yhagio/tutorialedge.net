<template>
    <div>
        <img src="https://images.tutorialedge.net/images/logo.png" alt="logo" />
		<h1>Redirecting</h1>
		<p>You have successfully logged in. You are now being redirected to the profile page...</p>
		<p class="text-muted">If there are any issues, then please let me know by raising on here: <a href="https://github.com/elliotforbes/tutorialedge.net">elliotforbes/tutorialedge.net</a>
        </p>
    </div>
</template>

<script>
export default {
    name: 'Redirect',
    mounted: function() {
        this.$auth.handleAuthentication()
            .then(() => {
                window.location.assign("/profile/");
            })
    }
}
</script>