<template>
    <div class="quiz">
        <h3>Pop Quiz Question!</h3>
        <slot name="question"></slot>
        <hr/>
        <div class="answers">
            <button type="button" class="btn btn-outline-primary" v-for="(option, index) in options" v-on:click="checkAnswer(option)" :key="index">{{ option.value }}</button>
        </div>
        <div v-if="this.correct" class="alert alert-success">Awesome!</div>
        <div v-if="this.correct === false" class="alert alert-danger">{{ this.answer }}</div>
    </div>
</template>

<script>
export default {
    name: "Quiz",
    props: ["question", "options", "answer"],
    data: function() {
        return {
            options: [],
            answer: "",
            correct: ""
        }
    },
    created: function() {
        this.options = JSON.parse(this.options);
    },
    methods: {
        checkAnswer: function (answer) {
            if(answer.correct) {
                this.correct = true;
            } else {
                this.correct = false;
            }
        }
    }
}
</script>
