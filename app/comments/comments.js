import commentInput from './comment-input.template.js'; 
import commentProfile from './comment-profile.template.js'; 
import commentTemplate from './comment.template.js'; 
import loginTemplate from './login.template.js';
import { isLoggedIn } from '../auth/auth.js';
import '../auth/auth.js';
import axios from 'axios';

export function initComments() {
    // show all comments
    document.getElementById("comment-list").innerHTML = getComments();

    // check if logged in
    if(isLoggedIn()){
        let user = getUser();

        document.getElementById("comment-input").innerHTML = commentInput(user);
        document.getElementById("comment-profile").innerHTML = commentProfile(user);
        
        const commentSubmit = document.getElementById("comment");
        commentSubmit.addEventListener("click", submitComment);

        const logoutButton = document.getElementById("logout");
        logoutButton.addEventListener("click", logout);
    } else {
        // show comment login if not logged in
        document.getElementById("comment-login").innerHTML = loginTemplate();
        const loginBtn = document.getElementById("btn-login")
        loginBtn.addEventListener('click', redirectLogin);
        
    }
}

function getUser() {
    let token = Cookies.get("jwt-token");

    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(window.atob(base64));

}

function logout() {
    Cookies.remove("jwt-token");
    window.location.reload();
}

function redirectLogin() {
    Cookies.set("redirect_url", window.location.href);
    window.location.replace("http://localhost:3000/login");
}

function getComments() {
    return commentTemplate({body: "hello World", author: "Elliot Forbes", date: "12th February, 2019"});
}

function submitComment() {
    let response = axios.post('https://localhost:3000/api/v1/comments/test', {

    }).then((resp) => {
        console.log(resp);
    })
    // console.log("Submitting Comment");
}
