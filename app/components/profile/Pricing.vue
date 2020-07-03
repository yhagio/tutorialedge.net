<template>
    <div class="price-listing">
        <div class="prices">	
            <div></div>
            <div class="price-box">
                <h2>
                    Developer Account -
                    <br/><small>$16.99/month</small>    
                </h2>
                <div class="clear"></div>
                <p>A solo-dev or small startup that use my work to help them achieve success in their own pursuits.</p>
                <h4>Perks</h4>

                <p>✅ Gain access to <b>premium content</b></p>
                <p>✅ Profile listed on the Home Page</p>
                
                <a class="btn btn-primary btn-signup" @click='pay'>Subscribe Now 🚀 </a>
            </div>
            <div></div>
        </div>
    </div>
</template>

<script>
import config from 'environment'

export default {
    name: 'Pricing',
    mounted: function() {},
    methods: {
        pay () {
            let stripe = Stripe(config.stripe.pk);

            stripe.redirectToCheckout({
                lineItems: [
                    {
                        price: config.stripe.price, 
                        quantity: 1
                    }
                ],
                mode: 'subscription',
                successUrl: config.stripe.successUrl,
                cancelUrl: config.stripe.cancelUrl
            })
                .then(data => {
                    console.log(data.token);
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }
}
</script>

<style lang="scss" scoped>

.btn-signup {
    margin-top: 40px;
    color: white;
    font-weight: bold;
}
 
.price-listing {
  padding: 40px;
  background-image: url(/images/svg/small-dots.svg);
  h3 {
      background-color: #F5F7F9;
      padding: 20px;
      width: auto;
  }
  
  a {
      text-decoration: none !important;
  }
    
  .prices {
      display: grid;
      justify-content: center;
      grid-gap: 1px;
      grid-template-columns: repeat(3, 1fr);

      .price-box {
          flex: 0 0 32%;  
          margin: 20px;
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

          .sign-up {
              margin: 0;
              color: white !important;
          }
      }
  }

}
</style>