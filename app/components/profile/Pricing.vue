<template>
    <div>
        <div class="pricing-top-bar">
            <div class="mx-auto">
                <h1>Sponsorship + Account Upgrade 🚀</h1>
            </div>
        </div>

        <div class="p-8 px-16 bg-white">
            <div class="w-4/5 mx-auto">
                <h3 class="text-xl text-gray-900 mb-4">About Me</h3>
                <p class="text-gray-800">👨‍💻 My name is Elliot Forbes and I build free programming courses, tutorials and videos for <b>everyone!</b> The dream is being able to work on building out more comprehensive courses, interactive quizzes and video tutorials for everyone. This can only be achieved through your help and support!</p>
                <p class="text-gray-800 mt-4">🙏 If my work has helped you in any capacity and you are able to help support more tutorials and more content, a monthly contribution helps to bring this one step closer!</p>
                <p class="text-gray-800 mt-4">😎 Not everyone has the means to be able to support me through sponsorships. If this is the case, reach out to me - support '@' elliotforbes.co.uk and I can upgrade your account <b>free of charge</b> to give you access to the growing list of premium videos and courses on the site! 💪</p>
            </div>
        </div>

        <div class="price-listing bg-gray-100">
            <div class="w-4/5 mx-auto">
                <div class="grid grid-cols-1 md:grid-cols-2 grid-row-gap-10">	

                    <div class="price-box">
                        <div class="title">
                            <h2 class="text-gray-800"><small>$1.99/month</small><br/>Monthly Sponsorship</h2>
                        </div>
                        <div class="perks">
                            <ul class="mb-8">
                                <li>Unlimited Access To Premium Courses</li>
                                <li>Take Part in Quizzes And Test Your Skills</li>
                                <li>Have A Say In What We Cover Next</li>
                            </ul>
                            <a class="btn btn-primary btn-signup block mt-4" @click='payMonthly'>Sponsor Now 🚀 </a>
                        </div>
                    </div>

                    <div class="price-box">
                        <div class="title">
                            <h2 class="text-gray-800"><small>$19.99/year</small><br/>Yearly Sponsorship</h2>
                        </div>
                        <div class="perks">
                            <ul class="mb-8">
                                <li>Unlimited Access To Premium Courses</li>
                                <li>Take Part in Quizzes And Test Your Skills</li>
                                <li>Have A Say In What We Cover Next</li>
                                <li>Thanks at the end of my YouTube videos!</li>
                            </ul>
                            <a class="btn btn-primary block btn-signup mt-4" @click='payYearly'>Sponsor Now 🚀 </a>
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
</style>