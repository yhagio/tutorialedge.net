import axios from "axios";

export function isLoggedIn() {
    if(typeof Cookies.get("jwt-token") !== 'undefined') {
        return true;
    }
    return false;
}

export function getUser() {
    let token = Cookies.get("jwt-token");
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(window.atob(base64));
}
  
export async function logout() {
    let response = await axios.get("https://api.tutorialedge.net/api/v1/logout");
    Cookies.remove("jwt-token");
    window.location.reload();
}

export function redirectLogin() {
    Cookies.set("redirect_url", window.location.href);
    window.location.replace("https://api.tutorialedge.net/api/v1/login");
}
