import {LitElement, html, css, customElement} from 'lit-element';

@customElement("register-component")
export class Register extends LitElement {

    constructor() {
        super();
        super.adoptStyles()
    }
    
    static styles = css`
        .sign-up {
            background-color: $light-blue;
            padding: 10px;
            color: white !important;
            background: #0276d9;
            background-image: linear-gradient(22deg, #0276d9,#2C9CFC);
            border-bottom: 1px solid #0376d8;
            border: none;
        }
        i {
            margin-right: 7px;
        }
        .sign-up:hover {
            opacity: 0.9;
        }
    `;

    render() {
        return html`
        <li class="nav-item sign-up"><a class="nav-link" href="/profile/"> Register / Log-In</a></li>
        `;
    }
}