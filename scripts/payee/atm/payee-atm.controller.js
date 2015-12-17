'use strict';

angular.module('crm.publisher')
    .controller('PayeeAtmCtrl', function ($scope, $state, $filter, ngTableParams, payeeFactory, authorizationFactory) {

        $scope.deals = {};
        $scope.selectedDeal = null;
        $scope.royaltyLifeTimeValueUrl = null;
        $scope.emailSent = false;

        payeeFactory.payeeDeals(authorizationFactory.user().code)
            .then(function (data) {
                $scope.deals = data.items;
                $scope.selectedDeal = $scope.deals[0].id;
                $scope.refreshRoyaltyLifeTimeValue($scope.selectedDeal);
            });

        $scope.refreshRoyaltyLifeTimeValue = function(dealId) {
            payeeFactory.dealRoyaltiesAnalysisStats(dealId).then(function(data){
                $scope.royaltyLifeTimeValueUrl = payeeFactory.royaltyLifeTimeValueUrl(data.last_12_month_avg);
            });
        }

        $scope.sendAdviserContactEmail = function() {
            payeeFactory.sendAdviserContactEmail($scope.selectedDeal);
            $scope.emailSent = true;
        }
});
