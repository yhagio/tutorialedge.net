import {LitElement, html, customElement} from 'lit-element';

@customElement("comments-component")
class Comments extends LitElement{

    comments: any;
    commentsTemplate: any;

    constructor() {
        super();

        this.comments = ["hello", "hi"] 

        this.commentsTemplate = this.comments.map((element:any) => {
            return `<h2>${element}</h2>`;
        });
    
    }

    static get template() {

        return html`
        <h2>Comments</h2>

        [[commentsTemplate]]
        `;
    }
}
