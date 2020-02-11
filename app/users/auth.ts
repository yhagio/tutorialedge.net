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

export class Auth {
    // token expiry time
    _user: any;
    _expiresAt: number;
    _idToken: string;
    _accessToken: string;

    set idToken(id_token: string) {
        this._idToken = id_token;
    }

    get idToken(): string {
        return this._idToken;
    }

    set accessToken(access_token: string) {
        this._accessToken = access_token;
    }
    
    get accessToken(): string {
        return this._accessToken;
    }

    public login() {
        webAuth.authorize({
            redirectUri: config.redirectUri
        })
    }

    public logout() {
        this._accessToken = null;
        this._idToken = null;
        this._expiresAt = null;
        this._user = null;
        Cookie.remove("expiresAt")
        Cookie.remove("user")
        webAuth.logout({
            returnTo: config.redirectUri,
            clientID: config.clientID
        })
    }

    public isAuthenticated() {
        return new Date().getTime() < Cookie.get("expiresAt");
    }

    public handleAuthentication(): any {
        return new Promise((resolve: any, reject: any) => {  
            webAuth.parseHash((err: any, authResult: any) => {
                if (authResult && authResult.accessToken && authResult.idToken) {
                    this._expiresAt = new Date().getTime() + (authResult.expiresIn * 1000)
                    this._accessToken = authResult.accessToken
                    this._idToken = authResult.idToken
                    this._user = authResult.idTokenPayload

                    Cookie.set("expiresAt", this._expiresAt)
                    Cookie.set("user", JSON.stringify(this._user))
                    resolve()
                        
                } else if (err) {
                    this.logout()
                    reject(err)
                }
    
            })
        })
    }

}