<template>
     <div class="login-box">
        <div class="login">	
            <div></div>
            <div class="price-box">
                <h2>Sign in 🚀</h2>
                <p>Authenticate with Google or GitHub:</p>
                <button class="btn btn-primary" v-on:click="this.signup">🚀 Sign In</button>
            </div>
            <div></div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Login",
    methods: {
        signup: function() {
            this.$auth.login()
        }
    }
}
</script>

<style lang="scss" scoped>

.login-box {
  padding: 40px;
  background-image: url(/images/svg/small-dots.svg);
  min-height: 50vh;
  h3 {
      background-color: #F5F7F9;
      padding: 20px;
      width: auto;
  }
  
  a {
      text-decoration: none !important;
  }
    
  .login {
      display: grid;
      justify-content: center;
      grid-gap: 1px;
      grid-template-columns: repeat(3, 1fr);

      .price-box {
          flex: 0 0 32%;  
          margin: 20px;
          margin-top: 40px;
          padding: 40px;
          align-self: center;
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

}
</style>