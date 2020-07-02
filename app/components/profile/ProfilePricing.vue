<template>
    <div class="row">
        <div class="col-lg-6">
            <button class='btn btn-primary pay-with-stripe' @click='pay'>Pay with credit card</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "ProfilePricing",
    props: ['user'],
    pay () {
      let stripe = Stripe('pk_test_vzLRvltMJHJJ65YFypICxZrY');

      stripe.redirectToCheckout({
          lineItems: [
              {price: 'price_1H0UFdH6SNauSNAXRNZxJgGe', quantity: 1}
          ],
          mode: 'subscription',
          successUrl: 'http://localhost:1313/profile/',
          cancelUrl: 'http://localhost:1313/profile/'
      })
        .then(data => {
            console.log(data.token);
        })
        .catch(err => {
            console.log(err);
        })
    }
}
</script>

<style lang="scss">
/**
 * The CSS shown here will not be introduced in the Quickstart guide, but shows
 * how you can use CSS to style your Element's container.
 */
.StripeElement {
  box-sizing: border-box;

  height: 40px;

  padding: 10px 12px;

  border: 1px solid transparent;
  border-radius: 4px;
  background-color: white;

  box-shadow: 0 1px 3px 0 #e6ebf1;
  -webkit-transition: box-shadow 150ms ease;
  transition: box-shadow 150ms ease;
}

.StripeElement--focus {
  box-shadow: 0 1px 3px 0 #cfd7df;
}

.StripeElement--invalid {
  border-color: #fa755a;
}

.StripeElement--webkit-autofill {
  background-color: #fefde5 !important;
}
</style>