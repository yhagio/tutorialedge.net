import {LitElement, html, property, css, customElement} from 'lit-element';

@customElement("quiz-element")
export class Quiz extends LitElement {

    attempted: boolean = false;

    @property({ type: String }) question = '';

    @property({ type: String }) answer = '';

    @property({ type: String }) A = '';
    @property({ type: String }) B = '';
    @property({ type: String }) C = '';

    @property({ type: String }) correct = '';

    checkAnswer(e: any) {
        if (!this.attempted) {
            let button = e.currentTarget;
            button.classList.toggle("font-bold");
            button.children[0].classList.toggle("selected");
            this.attempted = true;

            e.currentTarget.parentNode.children["answer"]
                .classList.remove("hidden");
        }
    }

    static styles = css`
        .question {
            color: #8795a1;
            font-size: 1rem;
            margin: 0;
            margin-bottom: -5px;
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

        button:active {
            border: none;
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
            margin-left: -10px;
            margin-right: -10px;
            border-radius: 0.5625rem;
            border-top-left-radius: 0.1625rem;
            border-bottom-left-radius: 0.1625rem;
            margin-top: 24px;
            border-left: 4px solid #143650;
            transition: visibility 0s, opacity 0.5s linear;
        }

        .hidden {
            visibility: none;
            opacity: 0;
        }

    `

    render() {
        return html`
        <div>
            <span class="question">Question</span>
            <h2>${this.question}</h2>

            <button id="a" @click="${this.checkAnswer}">
                <span> A </span>
                <span> ${this.A} </span>
            </button>
            
            <button id="b" @click="${this.checkAnswer}">
                <span> B </span>
                <span> ${this.B} </span>
            </button>

            <button id="c" @click="${this.checkAnswer}">
                <span> C </span>
                <span> ${this.C} </span>
            </button>

            <div class="clear"></div>

            <blockquote id="answer" class="answer hidden"><b>Correct Answer:</b> ${this.answer}</blockquote>
        </div>
        `;
    }
}