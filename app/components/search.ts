import {LitElement, html, css, customElement} from 'lit-element';

@customElement("search-component")
export class Search extends LitElement {
    query: string;

    static styles = css`
        .search {
            display: flex;
        }

        .search input {
            width: 80%;
            padding: 20px;
            background-color: #21252D;
            border: none;
            font-size: 16px;
            color: white;
        }

        .search button {
            background-color: #28a745;
            padding: 5px;
            padding-left: 20px;
            padding-right: 20px;
            display: block;
            height: 58px;
            float: right;
            color: white;
            border: none;
            border-top-right-radius: 5px;
            border-bottom-right-radius: 5px;
        }
    `;

    search() {
        console.log(this.query);
    }

    render() {
        return html`
        <label for="searchForm">Search The Site</label>
        <div class="search">
            <input id="searchForm" .value=${this.query} type="text" class="form-control" placeholder="Go, Python etc...">
            <button @click="${this.search}" class="search-button"><img src="/images/svg/search.svg" alt="search icon" style="width:15px; height: 15px;" /> </button>
        </div>
        `;
    }
}