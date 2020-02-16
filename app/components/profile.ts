import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import { Auth } from '../auth/index.ts';

class Profile extends PolymerElement{
    
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

    static get template() {
        return html`
        <style>
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
        </style>
        
        <div class="profile">
            <img src="[[user.picture]]" alt="Profile Picture">

            <h2>Profile: [[user.name]] <br/>
            <small>Thank you for Registering - This is currently in BETA</small></h2>
        </div>

        <hr/>

        <p><b>Privacy Policy: <a href="/privacy/">Read Now</a></b></p>

        <a href="/logout/" class="btn btn-warning">Logout</a>
        `;
    }

}  

customElements.define('profile-component', Profile);