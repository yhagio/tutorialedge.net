import { Auth } from '../auth/index.ts';
import { Profile } from '../components/profile.ts';

export class Router {
    
    public constructor() {
        let auth = new Auth();

        switch (window.location.pathname) {
            case "/redirect/":
                auth.handleAuthentication()
                    .then(() => {
                        window.location.assign('/profile/')
                    });
                break;
            case "/profile/":
                let profile = new Profile();
                break;
            case "/logout/":
                if(auth.isAuthenticated()) {
                    auth.logout();
                    window.location.assign('/')
                }
                break;
            default:
                break;
        }
    }


} 