export default function commentTemplate(comment) {
    return `<div class="comment">
            <div class="author">
                <div class="icon">
                    <img src="https://images.tutorialedge.net/images/logo.png" alt="">
                </div>
            </div>
            <div class="comment-body">
                <h4>${comment.author}<br/> <small>${comment.date}</small></h4>
                ${comment.body}
            </div>
        </div>
        `
}