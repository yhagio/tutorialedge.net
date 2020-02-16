import {LitElement, html, customElement} from 'lit-element';
// @ts-ignore
import { Auth } from '../auth/index.ts';

@customElement("logout-component")
export class Logout extends LitElement{
    
    auth: any;

    constructor() {
        super();     
        this.auth = new Auth();

        this.auth.logout();

        window.location.assign("/");
    }

    static get template() {
        return html`
        <img src="https://images.tutorialedge.net/images/logo.png" alt="logo" />
		<h1>Logging You Out</h1>
		<p class="text-muted">If there are any issues, then please let me know by raising on here: <a href="https://github.com/elliotforbes/tutorialedge.net">elliotforbes/tutorialedge.net</a>
        </p>`;
    }

}  
