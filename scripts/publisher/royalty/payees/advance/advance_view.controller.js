'use strict';

angular.module('crm.publisher')
    .controller('AdvancePayeesCtrl', function ($scope, $state, royaltyPaymentPayeesFactory, ngTableParams)
    {
        $scope.advance = {};

        royaltyPaymentPayeesFactory.advance($state.params.advanceId).then(function(data){
            $scope.advance = data;
        })

        $scope.tableParams = new ngTableParams(
            {
                page: 1,
                count: 10,
                sorting: { id: 'desc' },
                filter: { advance_id: $state.params.advanceId }
            },
            {
                total: 0,
                getData: function ($defer, params) {
                    royaltyPaymentPayeesFactory.advancePayments(params)
                        .then(function (data) {
                            params.total(data.count);
                            $defer.resolve(data.items);
                        });
                }
            }
        );
    });