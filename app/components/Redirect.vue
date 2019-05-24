<template>
    <div>
        <div class="top-bar">
            <a href="https://tutorialedge.net/"><img src="https://images.tutorialedge.net/images/logo.svg" alt="" /></a>
            <h2>Redirecting...</h2>
        </div>
        <div class="info">
            <p>You have been successfully logged in by Auth0, redirecting to your original page...</p>
            <p>If this doesn't work, please contact me directly - support@elliotforbes.co.uk</p>
            <div id="output"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Redirect",
    mounted() {
        this.$auth.handleAuthentication().then((data) => {
            var redirect_url = Cookies.get("redirect_url");
            if(typeof redirect_url !== 'undefined') {
                Cookies.remove("redirect_url");
                window.location.replace(redirect_url);
            }
        });
    }
}
</script>
