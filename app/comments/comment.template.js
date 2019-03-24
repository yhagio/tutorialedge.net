export default function commentTemplate(comment) {
    console.log(comment);
    return `<div class="comment">
            <div class="author">
                <div class="icon">
                    <img src="${comment.comment.picture}" alt="">
                </div>
            </div>
            <div class="comment-body">
                <h4>${comment.comment.author}<br/> <small>${comment.comment.date}</small></h4>
                ${comment.comment.body}
            </div>
        </div>
        `
}