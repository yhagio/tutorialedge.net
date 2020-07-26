const config = {
  clientID: "35go3x6MIxvQ2Wa01mkpdcnv42xQxzye",
  domain: "tutorialedge.eu.auth0.com",
  redirectUri: "https://tutorialedge.net/redirect/",
  // we will use the api/v2/ to access the user information as payload
  audience: "https://" + "tutorialedge.eu.auth0.com" + "/api/v2/",
  responseType: "token id_token",
  scope: "openid profile user_metadata",
  apiBase: "https://api.tutorialedge.net/api",
  goApiUrl: "https://api-v2.tutorialedge.net",
  stripe: {
    pk: "pk_live_YDWUH6DEcREKLBektnQbxheu",
    price: {
      monthly: "price_1H9DWWH6SNauSNAXKARjblUr",
      yearly: "price_1H9DXRH6SNauSNAXtOMZ4cd1",
    },
    successUrl: "https://tutorialedge.net/profile/",
    cancelUrl: "https://tutorialedge.net/profile/",
  },
};

export default config;