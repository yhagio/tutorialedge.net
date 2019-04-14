<template>
    <div>
        <h2>{{ question }}</h2>
        <p v-for="answer in answers">{{ answer.value }}</p>
    </div>
</template>

<script>
export default {
    name: "Quiz",
    props: ["question", "answers"],
    data: function() {
        return {
            answers: []
        }
    },
    created: function() {
        console.log(this.question);
        console.log(this.answers);
        this.answers = JSON.parse(this.answers);
    }
}
</script>
