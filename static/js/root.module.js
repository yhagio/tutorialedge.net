var root = angular.module('root', []);

function RootController($scope) {
    var ctrl = this;
}
RootController.$inject = ['$scope'];
angular.module('root')
    .controller('RootController', RootController);
