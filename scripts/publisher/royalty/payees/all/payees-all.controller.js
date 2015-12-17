'use strict';

angular.module('crm.publisher')
    .controller('RoyaltyPaymentsAllPayeesCtrl', function ($scope, $location, $filter, ngTableParams, royaltyPaymentPayeesFactory, authorizationFactory, $modal) {
        if (!authorizationFactory.canViewRoyaltyPayments()) {
            authorizationFactory.redirectToLandingUrl();
        }

        $scope.refreshCounts();

        $scope.searchFor = null;
        $scope.search = function () {
            if ($scope.searchFor != null) {
                $scope.tableParamsWithEmail.$params.filter.name = $scope.searchFor+"|or";
                $scope.tableParamsWithEmail.$params.filter.email = $scope.searchFor+"|or";
            }
        }

        $scope.addAdvance = function(payeeCode)
        {
            var modalInstance = $modal.open({
                templateUrl: 'scripts/publisher/royalty/payees/advance/advance.form.html?v='+APP_VERSION,
                controller: 'PayeeAdvanceFormCtrl',
                size: 'sm'
            });
            modalInstance.result.then(function (advance) {
                advance.payee_code = payeeCode;
                advance.company_id = authorizationFactory.user().company_id;
                royaltyPaymentPayeesFactory.addAdvance(advance).then(function() {
                    $scope.tableParamsWithEmail.reload();
                });
            }, function () {
                //canceled
            });
        }

        $scope.tableParamsWithEmail = new ngTableParams(
            {
                page: 1,
                count: 10,
                sorting: { id: 'desc' }
            },
            {
                total: 0,
                getData: function ($defer, params) {
                    royaltyPaymentPayeesFactory.payeesWithEmail(params)
                        .then(function (data) {
                            params.total(data.count);
                            $defer.resolve(data.items);
                        });
                }
            }
        );
});
