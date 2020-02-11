import { setupTippy } from './content/tippy.ts'
import { loadDeferredImgs } from './content/images.ts'
import * as Cookie from 'es-cookie';
import { Auth } from './users/auth.ts';

function initialize() {
    let auth = new Auth()
    loadDeferredImgs()
    setupTippy()


    switch (window.location.pathname) {
        case "/redirect/":
            auth.handleAuthentication()
                .then(() => {
                    window.location.assign('/profile/')
                })
                .catch((err:any) => {
                    console.log(err);
                })
            break;
        case "/profile/":
            console.log(auth.isAuthenticated())
            if(auth.isAuthenticated() !== true) {
                auth.login();
            }            
            break;
        case "/logout/":
            if(auth.isAuthenticated()) {
                auth.logout();
                window.location.assign('/')
            }
            break;
        default:
            console.log(window.location.pathname);
            break;
    }

    
}

initialize();