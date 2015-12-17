'use strict';

angular.module('crm.publisher')
    .controller('PayeePaymentsCtrl', function ($scope, $state, $filter, ngTableParams, payeeFactory, authorizationFactory) {

        $scope.searchFor = null;
        $scope.search = function () {
            if ($scope.searchFor != null) {
                $scope.tableParams.$params.filter.payee_name = $scope.searchFor+"|or";
                $scope.tableParams.$params.filter.song_title = $scope.searchFor+"|or";
                $scope.tableParams.$params.filter.payee_code = $scope.searchFor+"|or";
            }
        }

        $scope.payeePayment = null;
        $scope.paymentsForPayeePayment = false;

        if ($state.params.payeePaymentId != null) {
            $scope.paymentsForPayeePayment = true;
        }

        $scope.tableParams = new ngTableParams(
            {
                page: 1,
                count: 10,
                sorting: { id: 'desc' },
                filter: {payee_code: authorizationFactory.user().code,
                    payee_payment_id : ($scope.paymentsForPayeePayment) ? $state.params.payeePaymentId : null }
            },
            {
                total: 0,
                getData: function ($defer, params) {
                    payeeFactory.payments(params)
                        .then(function (data) {
                            params.total(data.count);
                            $defer.resolve(data.items);
                            if ($scope.paymentsForPayeePayment && data.items[0]) {
                                $scope.payeePayment = data.items[0].payee_payment;
                            }
                        });
                }
            }
        );
});
