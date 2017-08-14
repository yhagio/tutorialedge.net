var root = angular.module('root', []);

function RootController($scope) {
    var ctrl = this;
    console.log("Hello World");

}
RootController.$inject = ['$scope'];
angular.module('root')
    .controller('RootController', RootController);
