import {LitElement, html, css, customElement} from 'lit-element';
// @ts-ignore
import { Auth } from '../auth/index.ts';

@customElement("profile-component")
export class Profile extends LitElement{
    
    user: any;
    auth: any;

    constructor() {
        super();     
        this.auth = new Auth();
        if(this.auth.isAuthenticated() !== true) {
            this.auth.login();
        } else {
            this.user = this.auth.user;
        }
    }

    static styles = css`
    .profile {
        display: flex;
    }
    h1 {
        margin-top: 20px;
    }

    img {
        width: 80px;
        height: 80px;
        margin-right: 20px;
        margin-top: 15px; 
        border-radius: 50%;
    }
    `;

    render() {
        return html`        
        <div class="profile">
            <img src="${this.user.picture}" alt="Profile Picture">

            <h2>Profile: ${this.user.name} <br/>
            <small>Thank you for Registering - This is currently in BETA</small></h2>
        </div>

        <hr/>

        <p><b>Privacy Policy: <a href="/privacy/">Read Now</a></b></p>

        <a href="/logout/" class="btn btn-warning">Logout</a>
        `;
    }
}  
