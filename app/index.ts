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
            window.location.assign('/profile/')
            break;
        case "/profile/":
            if(auth.isAuthenticated() !== true) {
                auth.login();
            }
            break;
        default:
            console.log(window.location.pathname);
            break;
    }

    
}

initialize();