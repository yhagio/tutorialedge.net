const config = {
    clientID: "35go3x6MIxvQ2Wa01mkpdcnv42xQxzye",
    domain: "tutorialedge.eu.auth0.com",
    redirectUri: 'https://tutorialedge.net/redirect/',
    // we will use the api/v2/ to access the user information as payload
    audience: 'https://' + 'tutorialedge.eu.auth0.com' + '/api/v2/', 
    responseType: 'token id_token',
    scope: 'openid profile user_metadata',
    apiBase: 'https://api.tutorialedge.net/api',
    goApiUrl: 'https://api-go.tutorialedge.net'
}

export default config;