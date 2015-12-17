'use strict';

angular.module('crm.publisher')
    .controller('RoyaltyPaymentsPayeesCtrl', function ($scope, $state, $filter, ngTableParams, royaltyPaymentPayeesFactory, authorizationFactory) {

        if (!authorizationFactory.canViewRoyaltyPayments()) {
            authorizationFactory.redirectToLandingUrl();
        }

        $scope.counts= [];

        $scope.refreshCounts = function() {
            royaltyPaymentPayeesFactory.counts().then(function (data) {
                $scope.counts = data;
                if ($scope.counts.new_payees == 0 && $state.is('publisher.royalty.payees.new'))
                    $state.go("publisher.royalty.payees.all");
            });
        }

});
