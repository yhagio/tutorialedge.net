import { Auth } from '../auth/index.ts';
import * as Mustache from 'mustache'

export class Profile {
    auth: any;
    
    public constructor() {
        this.auth = new Auth();
        if(this.auth.isAuthenticated() !== true) {
            this.auth.login();
        } else {
            this.render()
        }            
    }

    public render() {
        let template = document.getElementById('target').innerHTML;
        Mustache.tags = ["[[", "]]"];
        let rendered = Mustache.render(template, { user: this.auth.user })
        document.getElementById('target').innerHTML = rendered;
    }

}  

export default { Profile };