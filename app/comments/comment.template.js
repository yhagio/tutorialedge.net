export default function commentTemplate(comment) {
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let formattedDate = new Date(comment.comment.date).toLocaleDateString("en-US", options);
    
    return `<div class="comment">
            <div class="author">
                <div class="icon">
                    <img src="${comment.comment.picture}" alt="">
                </div>
            </div>
            <div class="comment-body">
                <h4>${comment.comment.author}<br/> <small>${formattedDate}</small></h4>
                ${comment.comment.body}
            </div>
        </div>
        `
}