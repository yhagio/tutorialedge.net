export default function commentInput(user) {
    return `
    <div class="new-comment">
        <div class="avatar">
            <img src="${user.user.picture}" alt="default avatar">
        </div>
        <div class="comment-input" id="comment-input">
            <textarea placeholder="Leave a reply"></textarea>
            <br/>
            <div class="comment-actions hidden">
                <button id="comment" class="btn btn-primary float-right">
                    Submit
                </button>
            </div>
        </div>

    </div>`;
}