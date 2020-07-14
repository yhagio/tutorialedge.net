<template>
    <div>
        <div class="pricing-top-bar">
            <div class="container">
                <h1>Upgrade Account 🚀</h1>
                <p>Premium courses designed to help you solve real-world problems and gain the experience necessary to reach the next level.</p>
            </div>
        </div>

        <div v-if="this.discount" class="discount-code">
            <div class="container">
                <!-- <div class="flag">

                </div> -->
                <!-- <h2>🎉 Discount Code 🎉 - I've noticed you are coming from 🏴󠁧󠁢󠁳󠁣󠁴󠁿 based on your account information. I support <b>Purchasing Power Partiy</b> and want to make the educational content affordable to everyone across the globe. If you need it use the code: <b>SCOTLANDLOVE</b> to get 38% off your subscription!</h2> -->
                <h2>🎉 Launch Discount Code 🎉</h2>
                <p>Use the code: <b>CODECLAN</b> to get <b>50% off</b> subscriptions!</p>
            </div>
        </div>

        <div class="price-listing">
            <div class="container">
                <div class="prices">	
                    <div class="price-box">
                        <div class="title">
                            <h2><small>$9.99/month</small><br/>Full Access</h2>
                            <small>Supporting Purchasing Power Parity</small>
                        </div>
                        <div class="perks">
                            
                            <h4>Rewards</h4>

                            <ul>
                                <li>Unlimited Access To Premium Courses</li>
                                <li>Take Part in Quizzes And Test Your Skills</li>
                                <li>Have A Say In What We Cover Next</li>
                            </ul>
             
                            <a class="btn btn-primary btn-signup" @click='payMonthly'>Start 7-Day Free Trial 🚀 </a>
                        </div>
                    </div>
                    <div class="price-box">
                        <div class="title">
                            <h2><small>$99.99/year</small><br/>Full Access</h2>
                            <small>Supporting Purchasing Power Parity</small>
                        </div>
                        <div class="perks">
                            
                            <h4>Rewards</h4>

                            <ul>
                                <li>Unlimited Access To Premium Courses</li>
                                <li>Take Part in Quizzes And Test Your Skills</li>
                                <li>Have A Say In What We Cover Next</li>
                                <li>Save 20%</li>
                            </ul>
             
                            <a class="btn btn-primary btn-signup" @click='payYearly'>Start 7-Day Free Trial 🚀 </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import config from 'environment'

export default {
    name: 'Pricing',
    data: function() {
        return {
            discount: true
        }
    },
    methods: {
        payMonthly() {
            let stripe = Stripe(config.stripe.pk);

            stripe.redirectToCheckout({
                lineItems: [
                    { price: config.stripe.price.monthly,  quantity: 1 }
                ],
                mode: 'subscription',
                successUrl: config.stripe.successUrl,
                cancelUrl: config.stripe.cancelUrl
            })
                .then(data => { console.log(data.token); })
                .catch(err => { console.log(err); })
        },
        payYearly() {
            let stripe = Stripe(config.stripe.pk);

            stripe.redirectToCheckout({
                lineItems: [
                    { price: config.stripe.price.yearly,  quantity: 1 }
                ],
                mode: 'subscription',
                successUrl: config.stripe.successUrl,
                cancelUrl: config.stripe.cancelUrl
            })
                .then(data => { console.log(data.token); })
                .catch(err => { console.log(err); })
        },
        
    }
}
</script>

<style lang="scss" scoped>

.discount-code {
    background-color: white;
    padding: 20px;
    p {
        font-weight: normal;
    }
}

.btn-signup {
    margin-top: 40px;
    color: white;
    font-size: 1.25rem;
    width: 100%;
    padding-top: 15px;
    padding-bottom: 15px;
    border: none;
    background-color: #252F3F;
    font-weight: semibold;
}
 
.pricing-top-bar {
    background-color: #161E2E !important;
    text-align: center;
    color: white;
    font-weight: 800;
    padding: 40px;
    p {
        font-weight: normal;
        a {
            color: white;
            text-decoration: underline;
        }
    }

    h1 {
        color: white;
        font-size: 1.875rem;
    }
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
    
        @media (min-width: 576px) { 
            grid-gap: 1px;
            grid-template-columns: repeat(1, 1fr);
        }
      
        // Medium devices (tablets, 768px and up)
        @media (min-width: 768px) { 
            grid-template-columns: repeat(2, 1fr);
        }
        
        .price-box {
            flex: 0 0 25%;  
            

            @media (min-width: 576px) { 
                margin: 5px;
            }
        
            @media (min-width: 768px) { 
                margin: 20px;
            }

            align-self: center;
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 20px 25px -5px rgba(0,0,0,.1), 0 10px 10px -5px rgba(0,0,0,.04);
            color: rgba(14,30,37,.54);
            text-align: center;

            .title {
                padding: 40px;
                h2 {
                    font-size: 1.875rem;
                    small {
                        font-weight: 800;
                        color: #999;
                        clear: both;
                        margin-bottom: 15px;
                    }
                }
            }

            .perks {
                background-color: rgb(249,250,251);
                padding: 40px;
                border-top: 2px solid;
                --border-opacity: 1;
                border-color: #f4f5f7;
                border-color: rgba(244,245,247,var(--border-opacity));

                ul {
                    list-style-type: none;
                    text-align: left;
                }

                ul li {
                    margin: 0;
                    margin-bottom: 20px;
                    font-size: 1rem;
                    --text-opacity: 1;
                    color: #6b7280;
                    font-weight: 500;
                    color: rgba(107,114,128,var(--text-opacity));

                    &::before {
                        content: "✅ ";
                        opacity: 1;
                        margin-right: 10px;
                    }
                }
            }
            
            .sign-up {
                margin: 0;
                color: white !important;
            }
        }
    }

}
</style>