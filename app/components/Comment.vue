<template>
    <div class="comment">
        <div class="author">
            <div class="icon">
                <img :src="comment.picture" alt="">
            </div>
        </div>
        <div class="comment-body">
            <h4>{{ comment.author }}<br/> <small>{{ formattedDate }}</small></h4>
            <p>{{ comment.body }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Comment',
    props: ['comment'],
    data: function() {
        return {
            formattedDate: ''
        }
    },
    created: function() {
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        this.formattedDate = new Date(this.comment.date).toLocaleDateString("en-US", options);
    }
}
</script>
