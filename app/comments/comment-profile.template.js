export default function commentProfile(user) {
    return `<div class="comment-login">
        <p>Logged in as: ${user.user.displayName} <button id="logout" class="btn btn-link">Logout</button></p>
    </div>`
}