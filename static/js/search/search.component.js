var search = {
    templateUrl: '/js/search/search.html',
    controller: SearchController,
    bindings: {
        results: '=?',
        searchQuery: '=?'
    }
}

angular.module('root')
    .component('search', search);