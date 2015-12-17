'use strict';

angular.module('crm.payee')
    .controller('PayeeDashboardCtrl', function ($scope, $state, ngTableParams, payeeFactory, authorizationFactory) {

        $scope.searchFor = null;
        $scope.search = function () {
            if ($scope.searchFor != null) {
                $scope.tableParams.$params.filter.payee_name = $scope.searchFor+"|or";
                $scope.tableParams.$params.filter.song_title = $scope.searchFor+"|or";
            }
        }

        payeeFactory.payeePaymentsTotals().then(function (data){
            $scope.totals = data;
        });

        $scope.csvPaymentsDownloadUrl = function(id)  {return payeeFactory.csvPaymentsDownloadUrl()};
        $scope.xlsPaymentsDownloadUrl = function()  {return payeeFactory.xlsPaymentsDownloadUrl()};

        $scope.tableParamsAdvances = new ngTableParams(
            {
                page: 1,
                count: 50,
                sorting: {status:'asc', start_date: 'asc'},
                filter: {payee_code: authorizationFactory.user().code}
            },
            {
                total: 0,
                getData: function ($defer, params)
                {
                    payeeFactory.advances(params)
                        .then(function (data)
                        {
                            params.total(data.count);
                            $defer.resolve(data.items);
                        });
                }
            }
        );

        $scope.advanceStatus = function (advance) {
            return advance.status === 'incomplete' ? 'active' : 'closed'
        }

        $scope.tableParamsStatements = new ngTableParams(
            {
                page: 1,
                count: 50,
                sorting: { payment_date: 'desc' },
                filter: {payee_code: authorizationFactory.user().code}
            },
            {
                total: 0,
                getData: function ($defer, params)
                {
                    payeeFactory.payeePayments(params)
                        .then(function (data)
                        {
                            params.total(data.count);
                            $defer.resolve(data.items);
                        });
                }
            }
        );
    });
