import { CognitoIdentityCredentials } from 'aws-sdk';
import { CognitoUser, CognitoUserPool, CognitoUserAttribute } from 'amazon-cognito-identity-js';

export default class Cognito {
    constructor() {
        this.authData = {
            ClientId : '5d21746hrmrcp32lto5i41a3qd', // Your client id her853957954650e
            UserPoolId: 'eu-west-1:853957954650',
            IdentityPoolId : 'eu-west-1_hTo8KEcjQ', // Your user pool id here
        };
        this.userPool = new CognitoUserPool({
            UserPoolId: this.authData.IdentityPoolId,
            ClientId: this.authData.ClientId,
        });
    }

    signup(username, email, pass, cb) {
        console.log("Signing Up");
        let attributeList = [
            new CognitoUserAttribute({
                Name: 'email',
                Value: email
            })
        ]
        this.userPool.signUp(username, pass, attributeList, null, cb);
    }

    getCurrentUser() {
        return this.userPool.getCurrentUser();
    }

    isAuthenticated(cb) {
        let cognitoUser = this.getCurrentUser()
        if (cognitoUser != null) {
            cognitoUser.getSession((err, session) => {
                if (err) {
                    return cb(err, false)
                }
                return cb(null, true)
            })
        } else {
            cb(null, false)
        }
    }
}
