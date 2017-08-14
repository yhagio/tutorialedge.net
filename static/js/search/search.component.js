var search = {
    templateUrl: '/js/search/search.html',
    controller: SearchController,
    bindings: {}
}

angular.module('root')
    .component('search', search);