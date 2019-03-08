import Profile from './profile'
import Search from './search';
import Login from './login';

// kicks off search and the profile system
function init() {
    console.log(window.location.pathname);
    if(window.location.pathname === '/search/') {
        let search = new Search();
    }
    if(window.location.pathname === '/login/') {
        let login = new Login();
    }
    if(window.location.pathname === '/profile/') {
        let profile = new Profile();
    }
}

// main entry point
init();
