import auth0 from 'auth0-js';
import * as Promise from 'es6-promise';
import * as Cookies from 'es-cookie';
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

export class Auth {
    // token expiry time
    _user: any;
    _expiresAt: number;
    _idToken: string;
    _accessToken: string;

    public login() {
        Cookies.set("redirect_url", config.redirectUri);
        webAuth.authorize()
    }

    public logout() {
        Cookies.remove('access_token')
        Cookies.remove('id_token')
        Cookies.remove('expires_at')
        Cookies.remove('user')
        webAuth.logout({
            returnTo: config.redirectUri,
            clientID: config.clientID
        })
    }

    public isAuthenticated() {
        let currTime = new Date().getTime();
        // console.log(Cookies.get('expiresAt'))
        // console.log(Cookies.getAll())
        return new Date().getTime() <= (currTime + Cookies.get('expiresAt'));
    }

    public handleAuthentication(): any {
        return new Promise((resolve: any, reject: any) => {  
            webAuth.parseHash((err: any, authResult: any) => {
                if (authResult && authResult.accessToken && authResult.idToken) {
                    Cookies.set('expiresAt', authResult.expiresIn)
                    Cookies.set('accessToken', authResult.accessToken)
                    Cookies.set('idToken', authResult.idToken)
                    Cookies.set('user', authResult.idTokenPayload)
                    resolve()
                        
                } else if (err) {
                    this.logout()
                    reject(err)
                }
    
            })
        })
    }

}