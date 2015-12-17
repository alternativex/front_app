'use strict';

angular.module('crm.publisher')
    .controller('RoyaltyPaymentsNewPayeesCtrl', function ($scope, $state, $filter, ngTableParams, royaltyPaymentPayeesFactory, authorizationFactory, FileUploader) {

        if (!authorizationFactory.canViewRoyaltyPayments()) {
            authorizationFactory.redirectToLandingUrl();
        }

        $scope.refreshCounts();

        $scope.updateEmails = function(users)
        {
            var updateUsers = [];
            for(var i = 0; i < users.length; i++)
                if (users[i].email != null && users[i].email != '')
                    updateUsers.push({id: users[i].id, email: users[i].email});
            if (updateUsers.length > 0) {
                royaltyPaymentPayeesFactory.batchUpdateEmails(updateUsers).then(function (data) {
                    $scope.tableParamsWithoutEmail.reload();
                    $scope.refreshCounts();
                    $state.go("publisher.royalty.payees.new");
                });
            }
        }

        $scope.searchFor = null;
        $scope.search = function () {
            if ($scope.searchFor != null) {
                $scope.tableParamsWithoutEmail.$params.filter.name = $scope.searchFor+"|or";
            }
        }

        $scope.tableParamsWithoutEmail = new ngTableParams(
            {
                page: 1,
                count: 10,
                sorting: { id: 'desc' }
            },
            {
                total: 0,
                getData: function ($defer, params) {
                    royaltyPaymentPayeesFactory.payeesWithoutEmail(params)
                        .then(function (data) {
                            params.total(data.count);
                            $defer.resolve(data.items);
                        });
                }
            }
        );

        $scope.downloadNoEmailUrl =  royaltyPaymentPayeesFactory.downloadNoEmailUrl();

        var uploader = $scope.uploader = new FileUploader({
            url: royaltyPaymentPayeesFactory.payeesBatchUpdateUrl(),
            autoUpload: true
        });

        uploader.filters.push({
            name: 'customFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
//                console.log(type);
                return '|comma-separated-values|csv|'.indexOf(type) !== -1;
            }
        });

        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            $scope.refreshCounts();
            $state.go("publisher.royalty.payees.new");
        };
});
