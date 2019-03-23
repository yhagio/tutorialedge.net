export function isLoggedIn() {
    if(typeof Cookies.get("jwt-token") !== 'undefined') {
        return true;
    }
    return false;
}