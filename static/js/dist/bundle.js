var root = angular.module('root', []);

function RootController($scope) {
    var ctrl = this;
    console.log("Hello World");

}
RootController.$inject = ['$scope'];
angular.module('root')
    .controller('RootController', RootController);

var search = {
    templateUrl: '/js/search/search.html',
    controller: SearchController,
    bindings: {}
}

angular.module('root')
    .component('search', search);
function SearchController($http, $scope) {
    var ctrl = this;
    console.log("Hello World");
}

SearchController.$inject = ['$http', '$scope'];

angular.module('root')
    .controller('SearchController', SearchController);