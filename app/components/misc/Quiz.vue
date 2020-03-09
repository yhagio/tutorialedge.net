<template>
    <div>
        <span class="question">Question</span>
        <h2>{{ question }}</h2>

        <button id="a" v-if="A" v-on:click="checkAnswer">
            <span> A </span>
            <span> {{ A }} </span>
        </button>
        
        <button id="b" v-if="B" v-on:click="checkAnswer">
            <span> B </span>
            <span> {{ B }} </span>
        </button>

        <button id="c" v-if="C" v-on:click="checkAnswer">
            <span> C </span>
            <span> {{ C }} </span>
        </button>

        <div class="clear"></div>

        <blockquote v-if="clicked" id="answer" class="answer"><b>Correct Answer:</b> {{ answer }}</blockquote>
    </div>
</template>

<script>
export default {
    name: "Quiz",
    props: ["question", "A", "B", "C", "answer", "correct"],
    data: function() {
        return {
            A: '',
            B: '',
            C: '',
            answer: '',
            question: '',
            clicked: false
        }
    },
    methods: {
        checkAnswer: function() {
            this.clicked = true;
        }
    }
}
</script>

