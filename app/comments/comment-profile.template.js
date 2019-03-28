export default function commentProfile(user) {
    return `<div class="comment-login">
        <div class="image">
            <img src="${user.user.picture}" alt="${user.user.displayName}" />
        </div>
        <div class="register">
            <h2>Username: ${user.user.displayName}</h2>
            <br/>
            <button id="logout" class="btn btn-warning">Logout</button>
        </div>
    </div>`
}