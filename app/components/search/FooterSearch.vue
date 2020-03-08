<template>
    <div class="footer-search"> 
        <label for="searchForm">Search The Site</label>
        <div class="input-group mb-3">
            <input id="searchForm" v-model="query" type="text" class="form-control" placeholder="Go, Python etc...">
            
            <div class="input-group-append">
                <button v-on:click="this.search">🔍</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FooterSearch',
    data: function() {
        return {
            query: ''
        }
    },
    methods: {
        search: function() {
            window.location.assign("/search/?query=" + this.query);
        }
    }
}
</script>