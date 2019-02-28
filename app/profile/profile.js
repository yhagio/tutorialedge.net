import {CognitoAuth} from 'amazon-cognito-auth-js';

class Profile {
    constructor() {
        console.log("Profile Setup");

        var authData = {
            ClientId : '61vbam97jl3j0t2acrq904en7n', // Your client id here
            AppWebDomain : '<TODO: add App Web Domain>',
            TokenScopesArray : ['<TODO: add scope array>'], // e.g.['phone', 'email', 'profile','openid', 'aws.cognito.signin.user.admin'],
            RedirectUriSignIn : '<TODO: add redirect url when signed in>',
            RedirectUriSignOut : '<TODO: add redirect url when signed out>',
            IdentityProvider : '<TODO: add identity provider you want to specify>', // e.g. 'Facebook',
            UserPoolId : ' eu-west-1_hTo8KEcjQ', // Your user pool id here
            AdvancedSecurityDataCollectionFlag : '<TODO: boolean value indicating whether you want to enable advanced security data collection>', // e.g. true
                Storage: '<TODO the storage object>' // OPTIONAL e.g. new CookieStorage(), to use the specified storage provided
        };

        var auth = new AmazonCognitoIdentity.CognitoAuth(authData);
    }
}

export default Profile;