import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

class Quiz extends PolymerElement{

    static get template() {
        return html`<h2>Quiz</h2>`;
    }
}

customElements.define('quiz-test', Quiz);