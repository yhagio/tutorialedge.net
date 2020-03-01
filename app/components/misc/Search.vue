<template>
    <div>
        <label for="searchForm">Search The Site</label>
        <div class="search">
            <input id="searchForm" .value=${this.query} type="text" class="form-control" placeholder="Go, Python etc...">
            <button @click="${this.search}" class="search-button"><img src="/images/svg/search.svg" alt="search icon" style="width:15px; height: 15px;" /> </button>
        </div>
    </div>
</template>