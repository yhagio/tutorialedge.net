<template>
    <div class="login-box">
        <img class="logo" src="https://images.tutorialedge.net/images/logo.svg" alt="TutorialEdge Logo" />
        <h2>Redirecting You to Auth0</h2>
    </div>
</template>

<script>
export default {
    name: "Login",
    mounted: function() {
        this.$auth.login()
    }
}
</script>

<style lang="scss" scoped>

.logo {
    width: 75px;
    margin-bottom: 20px;
    height: auto;
}

h2 {
    font-size: 1.875rem;
    margin-bottom: 20px;
}

.login-box {
  padding: 40px;
  background-image: url(/images/svg/small-dots.svg);
  min-height: 50vh;
  background-color: #F9FAFB;
  text-align: center;
  h3 {
      background-color: #F5F7F9;
      padding: 20px;
      width: auto;
  }
  
  a {
      text-decoration: none !important;
  }
    
  .login-cont {
    margin: auto;
    width: 600px;
    padding: 40px;
    background-color: white;
    border-radius: 8px;
    -webkit-box-shadow: 0 2px 4px 0 rgba(14,30,37,.12);
    box-shadow: 0 2px 4px 0 rgba(14,30,37,.12);
    color: rgba(14,30,37,.54);
    text-align: center;
    h2 {
        font-size: 20px;
        small {
            font-weight: 800;
            color: #999;
            clear: both;
            margin-bottom: 15px;
        }
    }

    p {
        font-size: 1rem;
    }

    button {
        margin: 0;
    }

    .btn-sponsor {
        border: 1px solid #3991FA;
        color: #3991FA;
    }

  }
}
</style>