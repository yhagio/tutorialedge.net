import commentInput from "./comment-input.template.js";
import commentProfile from "./comment-profile.template.js";
import commentTemplate from "./comment.template.js";
import commentLogin from "./comment-login.template.js";
import { isLoggedIn, getUser, logout, redirectLogin } from "../auth/auth.js";
import axios from "axios";

export async function initComments() {
// show all comments
  document.getElementById("comment-list").innerHTML = await getComments();

  // check if logged in
  if (isLoggedIn()) {
    let user = getUser();

    document.getElementById("comment-input").innerHTML = commentInput(user);
    document.getElementById("comment-profile").innerHTML = commentProfile(user);

    const commentSubmit = document.getElementById("comment");
    commentSubmit.addEventListener("click", () => {
        submitComment(user);
    });

    const logoutButton = document.getElementById("logout");
    logoutButton.addEventListener("click", logout);
  } else {
    // show comment login if not logged in
    document.getElementById("comment-login").innerHTML = commentLogin();
    const loginBtn = document.getElementById("btn-login");
    loginBtn.addEventListener("click", redirectLogin);
  }
}

async function getComments() {
    let pageId = document.getElementById('page-id').innerHTML;
    let response = await axios.get("https://api.tutorialedge.net/api/v1/comments/" + pageId)
    let comments = response.data.map((comment) => {
        return commentTemplate({comment: comment })
    })
    return comments;        
}

async function submitComment(user) {
    console.log(user);
    let pageId = document.getElementById('page-id').innerHTML;  
    let commentBody = document.getElementById('comment-body').value;  
    try {
        let response = 
            await axios.post("https://api.tutorialedge.net/api/v1/comments/" + pageId, {
                body: commentBody,
                author: user.user.displayName,
                user: user
            },
            {
                headers: { Authorization: "Bearer " + Cookies.get("jwt-token")}
            })
    } catch (err) {
        // TODO: Need to handle this 
        console.log(err);
    }
    window.location.reload();
}