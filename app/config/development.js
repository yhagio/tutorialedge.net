const config = {
  clientID: "B63BMOpJ3SgxOB2jb6LY7EYEb4dU3J4D",
  domain: "tutorialedge.eu.auth0.com",
  redirectUri: "http://localhost:1313/redirect/",
  // we will use the api/v2/ to access the user information as payload
  audience: "https://" + "tutorialedge.eu.auth0.com" + "/api/v2/",
  responseType: "token id_token",
  scope: "openid profile user_metadata",
  apiBase: "https://x6prfq8k16.execute-api.eu-west-1.amazonaws.com/development",
  goApiUrl: "https://api-v2.tutorialedge.net",
  stripe: {
    pk: "pk_test_vzLRvltMJHJJ65YFypICxZrY",
    price: {
      monthly: "price_1H0Vw0H6SNauSNAXtyvn5i8I",
      yearly: "price_1H1qAiH6SNauSNAXyNJqfY5b",
    },
    successUrl: "http://localhost:1313/profile/",
    cancelUrl: "http://localhost:1313/profile/",
  },
};


export default config;