<template>
    <div class="price-listing">
        <div class="prices">	
            <div class="price-box">
                <img src="https://s22.postimg.cc/8mv5gn7w1/paper-plane.png" alt="" class="pricing-img">
                <h2>
                    The Supporter 🚀
                    <br/><small>$7/month</small>    
                </h2>
                <div class="clear"></div>
                <p>You enjoy my work and want to support it. You want to see more high-quality programming tutorials and series and help improve the programming community 💪</p>
                <h4>Perks</h4>
                
                <p>✅ Gain access to <b>premium content</b></p>

                <a class="btn btn-sponsor" href="https://github.com/sponsors/elliotforbes">Sponsor Now <Githubsvg /></a>
            </div>
            <div class="price-box">
                <img src="https://s28.postimg.cc/ju5bnc3x9/plane.png" alt="" class="pricing-img">
                <h2>
                    Freelancer/Startup 😎
                    <br/><small>$49/month</small>    
                </h2>
                <div class="clear"></div>
                <p>A solo-dev or small startup that use my work to help them achieve success in their own pursuits.</p>
                <h4>Perks</h4>

                <p>✅ Gain access to <b>premium content</b></p>
                <p>✅ Profile listed on the Home Page</p>
                
                <a class="btn btn-sponsor" href="https://github.com/sponsors/elliotforbes">Sponsor Now <Githubsvg /></a>
            </div>
            <div class="price-box">
                <img src="https://s21.postimg.cc/tpm0cge4n/space-ship.png" alt="" class="pricing-img">
                <h2>
                    Business/Agency 🏢
                    <br/><small>$199/month</small>    
                </h2>
                <div class="clear"></div>
                <p>You are a successful business or agency and you want to give back to the wider community.</p>
                <h4>Perks</h4>

                <p>✅ Gain access to <b>premium content</b></p>
                <p>✅ Profile listed on the Home Page under Premium Sponsors</p>
                <p>✅ Logo/Link on every page of the website - <b>~150k views/month</b></p>
                <a class="btn btn-sponsor" href="https://github.com/sponsors/elliotforbes">Sponsor Now <Githubsvg /></a>
            </div>
        </div>
    </div>
</template>

<script>
import Githubsvg from "../misc/Githubsvg.vue";

export default {
    name: 'Register',
    components: {
        Githubsvg
    },
    mounted: function() {
        console.log("Upgrade Account")
    }
}
</script>

<style lang="scss" scoped>

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
          height: 700px;
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