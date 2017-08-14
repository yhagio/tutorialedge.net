function SearchController($http, $scope) {
    var ctrl = this;
    console.log("Hello World");
}

SearchController.$inject = ['$http', '$scope'];

angular.module('root')
    .controller('SearchController', SearchController);