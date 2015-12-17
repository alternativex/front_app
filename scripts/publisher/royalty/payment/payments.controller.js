'use strict';

angular.module('crm.publisher')
    .controller('RoyaltyPaymentsCtrl', function ($scope, $location, $filter, ngTableParams, royaltyPaymentsFactory, authorizationFactory) {

        if (!authorizationFactory.canViewRoyaltyPayments()) {
            authorizationFactory.redirectToLandingUrl();
        }

        $scope.searchFor = null;
        $scope.search = function () {
            if ($scope.searchFor != null) {
                $scope.tableParams.$params.filter.payee_name = $scope.searchFor+"|or";
                $scope.tableParams.$params.filter.song_title = $scope.searchFor+"|or";
                $scope.tableParams.$params.filter.payee_code = $scope.searchFor+"|or";
            }
        }

        $scope.tableParams = new ngTableParams(
            {
                page: 1,
                count: 10,
                sorting: { id: 'desc' }
            },
            {
                total: 0,
                getData: function ($defer, params) {
                    royaltyPaymentsFactory.payments(params)
                        .then(function (data) {
                            params.total(data.count);
                            $defer.resolve(data.items);
                        });
                }
            }
        );
});
