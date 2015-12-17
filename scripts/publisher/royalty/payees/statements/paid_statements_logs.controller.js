'use strict';

angular.module('crm.publisher')
    .controller('PublisherPaidStatementsLogsCtrl', function ($scope, $state, ngTableParams, payeePaymentsFactory, authorizationFactory)
    {
        $scope.tableParams = new ngTableParams(
            {
                page: 1,
                count: 10,
                sorting: { id: 'desc' },
                filter: {marked_as_paid_at : '!null', status : '=paid'}
            },
            {
                total: 0,
                getData: function ($defer, params) {
                    payeePaymentsFactory.payeePaymentsGroupedByMarkedAsPaid(params)
                        .then(function (data) {
                            params.total(data.count);
                            $defer.resolve(data.items);
                        });
                }
            }
        );
    }
);