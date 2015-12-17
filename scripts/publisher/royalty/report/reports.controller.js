'use strict';

angular.module('crm.publisher')
    .controller('RoyaltyPaymentsReportsCtrl', function ($scope, $location, $state, royaltyPaymentsReportsService, authorizationFactory) {

        if (!authorizationFactory.canViewRoyaltyPayments()) {
            authorizationFactory.redirectToLandingUrl();
        }

        royaltyPaymentsReportsService.getAmountReceivedByDateFrom()
                .then(function (amountReceivedByDateFrom) {
                    $scope.amountReceivedByDateFrom = amountReceivedByDateFrom;
                });

        royaltyPaymentsReportsService.getAmountEarnedByDateFrom()
            .then(function (amountEarnedByDateFrom) {
                $scope.amountEarnedByDateFrom = amountEarnedByDateFrom;
            });
    });