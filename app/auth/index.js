import auth0 from 'auth0-js';
import * as Promise from 'es6-promise';
import * as Cookie from 'es-cookie';
import config from 'environment'

let webAuth = new auth0.WebAuth({
    domain: config.domain,
    clientID: config.clientID,
    // make sure this line is contains the port: 8080
    redirectUri: config.redirectUri,
    // we will use the api/v2/ to access the user information as payload
    audience: 'https://' + config.domain + '/api/v2/', 
    responseType: 'token id_token',
    scope: 'openid profile' // define the scopes you want to use
})

let instance;

export const getInstance = () => instance;

export const useAuth = ({...options}) => {
    if (instance) return instance;

    instance = new Vue({
        data: function() {
            return {
                loading: true,
                error: null
            }
        },
        methods: {
            test() {
                console.log("test")
            },  
            login() {
                webAuth.authorize({
                    redirectUri: config.redirectUri
                })
            },    
            logout() {
                this.accessToken = null;
                this.user = null;
                Cookie.remove("expiresAt")
                Cookie.remove("user")
                webAuth.logout({
                    returnTo: config.redirectUri,
                    clientID: config.clientID
                })
            },    
            getUser() {
                let user = JSON.parse(Cookie.get("user"));
                return user;
            },
            isAuthenticated() {
                console.log(Cookie.get("expiresAt"))
                return new Date().getTime() < Cookie.get("expiresAt");
            },    
            handleAuthentication() {
                return new Promise((resolve, reject) => {  
                    webAuth.parseHash((err, authResult) => {
                        if (authResult && authResult.accessToken && authResult.idToken) {

                            console.log(authResult)
                            Cookie.set("idToken", authResult.idToken)
                            Cookie.set("accessToken", authResult.accessToken)
                            let expiresAt = new Date().getTime() + (authResult.expiresIn * 1000)
                            Cookie.set("expiresAt", expiresAt)
                            console.log("Expires At: %s", Cookie.get("expiresAt"))
                            Cookie.set("user", JSON.stringify(authResult.idTokenPayload))

                            resolve()
                                
                        } else if (err) {
                            this.logout()
                            reject(err)
                        }
            
                    })
                })
            }  
        }
    })

    return instance;
};

export const Auth0Plugin = {
    install(Vue, options) {
      Vue.prototype.$auth = useAuth(options);
    }
};