var root = angular.module('root', []);

function RootController($scope) {
    var ctrl = this;
}
RootController.$inject = ['$scope'];
angular.module('root')
    .controller('RootController', RootController);

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
function SearchController($http, $scope) {
    var ctrl = this;

    $scope.pageSize = 10;
    $scope.page = 1;
    ctrl.searchQuery = ""

    ctrl.search = () => {
        let data = {
            "query": {
                "boost": 1.0,
                "query": ctrl.searchQuery
            },
            "highlight": {
                "fields": ["body"]
            },
            "from": ($scope.page-1) * $scope.pageSize,
            "fields": ["*"]
        };

        $http({
            method: 'POST',
            url: 'http://127.0.0.1:9000/api/search',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        }).then((response) => {
            console.log(response);
            ctrl.results = response.data;
            ctrl.pages = Math.ceil((response.data.total_hits / 10));
        }).catch((err) => { console.log(err); });
    }

    $scope.prevPage = () => {
        $scope.page -= 1;
        ctrl.search();
    }

    $scope.nextPage = () => {
        $scope.page += 1;
        ctrl.search();
    }

    $scope.setPage = (page) => {
        $scope.page = page;
        ctrl.search();
    }

    $scope.range = (count) => {
        var pages = [];

        for (var i = 0; i < count; i++) {
            pages.push(i)
        }

        return pages;
    }

    $scope.normalize = (score) => {
        return Math.round((score) * 100) + "%";
    };

    $scope.roundTook = (took) => {
        if (took < 1000 * 1000) {
            return "<1ms";
        } else if (took < 1000 * 1000 * 1000) {
            return "" + Math.round(took / (1000* 1000)) + "ms";
        } else {
            var roundMs = Math.round(took / (1000* 1000));
            return "" + roundMs / 1000 + "s";
        }
    };
}

SearchController.$inject = ['$http', '$scope'];

angular.module('root')
    .controller('SearchController', SearchController);