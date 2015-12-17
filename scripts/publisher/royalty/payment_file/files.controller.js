'use strict';

angular.module('crm.publisher')
    .controller('RoyaltyPaymentFilesCtrl', function ($scope, $location, $filter, ngTableParams, royaltyPaymentFilesFactory, authorizationFactory) {

        if (!authorizationFactory.canViewRoyaltyPayments()) {
            authorizationFactory.redirectToLandingUrl();
        }

        $scope.statuses = ['uploaded', 'processed'];

        $scope.searchFor = null;
        $scope.search = function () {
            if ($scope.searchFor != null) {
                $scope.tableParams.$params.filter.name = $scope.searchFor+"|or";
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
                    royaltyPaymentFilesFactory.files(params)
                        .then(function (data) {
                            params.total(data.count);
                            $defer.resolve(data.items);
                        });
                }
            }
        );

        $scope.downloadUrl = function(id)  {return royaltyPaymentFilesFactory.royaltyPaymentFileDownloadUrl(id)};
        $scope.downloadHeaderUrl = function()  {return royaltyPaymentFilesFactory.royaltyPaymentFileDownloadHeaderUrl()};
});
