<template>
    <div class="quiz">
        <span class="question">Question</span>
        <h2 class="text-gray-700">{{ question }}</h2>

        <button id="a" v-if="A" v-on:click="checkAnswer('A')">
            <span v-bind:class="{selected: this.selected == 'A'}"> A </span>
            <span v-bind:class="computedStyle('A')"> {{ A }} </span>
        </button>
        
        <button id="b" v-if="B" v-on:click="checkAnswer('B')">
            <span v-bind:class="{selected: this.selected == 'B'}"> B </span>
            <span v-bind:class="computedStyle('B')"> {{ B }} </span>
        </button>

        <button id="c" v-if="C" v-on:click="checkAnswer('C')">
            <span v-bind:class="{selected: this.selected == 'C'}"> C </span>
            <span v-bind:class="computedStyle('C')"> {{ C }} </span>
        </button>

        <div class="clear"></div>
        
        <transition name="fade">
            <blockquote v-if="answered" id="answer" class="answer"><b>Correct Answer:</b> {{ answer }}</blockquote>
        </transition>
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
            selected: '',
            correct: 'B',
            answered: false
        }
    },
    methods: {
        checkAnswer: function(answer) {
            if (!this.answered) {
                this.answered = true;
                this.selected = answer;
            }
        },
        computedStyle: function(chosen) {
            if (this.answered) {
                if (chosen == this.correct) {
                    return 'correct'
                } else {
                    return 'incorrect'
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}

.quiz {
    h2 {
        margin-left: 0;
        margin-top: 0;
    }
}

.question {
    font-size: 1rem;
    margin: 0;
    margin-bottom: -15px;
    margin-left: 0;
    padding: 0;
}    
h2 {
    margin: 0;
    color: #22292f;
    padding: 0;
}

button {
    width: 100%;
    display: block;
    display: flex;
    border: none;
    padding: 0;
    background-color: white;
    border: none;
    font-size: 1rem;
    margin: 20px;
    transition: color .3s,background-color .3s;
}

.correct {
    font-weight: 800 !important;
    color: green;
}

.incorrect {
    font-weight: 800 !important;
    color: red;
}

button:active {
    border: none !important;
}

button > span:nth-child(1) {
    padding: 10px 15px;
    border-radius: 4px;
    margin-right: 40px;
    background-color: #f6f6f6;
    transition: color .3s,background-color .3s;
}

button > span:nth-child(2) {
    padding-top: 10px;
}

.selected {
    background-color: #328af1 !important;
    color: white;
}

.font-bold {
    font-weight: 700;
}

.clear {
    clear: both;
    margin-bottom: 40px;
}

.answer {
    visibility: visible;
    background: #f2f6fa;
    font-size: 17px;
    font-size: 1.0625rem;
    padding: 20px 24px;
    border-radius: 0.5625rem;
    border-top-left-radius: 0.1625rem;
    border-bottom-left-radius: 0.1625rem;
    margin-top: 0;
    border-left: 4px solid #143650;
    transition: visibility 0s, opacity 0.5s linear;
}

.hidden {
    visibility: none;
    opacity: 0;
}
</style>