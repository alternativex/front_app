'use strict';

angular.module('crm.publisher')
    .controller('PayeesPaidPayeePaymentsCtrl', function ($scope, $state, ngTableParams, payeePaymentsFactory, authorizationFactory)
    {
        if (!authorizationFactory.canViewRoyaltyPayments()) {
            authorizationFactory.redirectToLandingUrl();
        }

        $scope.refreshCounts();

        $scope.tableParams = new ngTableParams(
            {
                page: 1,
                count: 10,
                sorting: { id: 'desc' },
                filter: {status : "=paid"}
            },
            {
                total: 0,
                getData: function ($defer, params) {
                    payeePaymentsFactory.payeePayments(params)
                        .then(function (data) {
                            params.total(data.count);
                            $defer.resolve(data.items);
                        });
                }
            }
        );
    });