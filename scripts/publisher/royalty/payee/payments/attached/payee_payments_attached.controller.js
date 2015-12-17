'use strict';

angular.module('crm.publisher')
    .controller('PayeeAttachedPaymentsCtrl', function ($scope, $state, $filter, ngTableParams, payeePaymentsFactory, authorizationFactory)
    {

        if (!authorizationFactory.canViewRoyaltyPayments()) {
            authorizationFactory.redirectToLandingUrl();
        }

        $scope.tableParams = new ngTableParams(
            {
                page: 1,
                count: 10,
                sorting: { id: 'desc' },
                filter: {payee_payment_id : ($state.params.payeePaymentId != '') ? $state.params.payeePaymentId : "!null", payee_code : $state.params.payeeCode}
            },
            {
                total: 0,
                getData: function ($defer, params) {
                    payeePaymentsFactory.payments(params)
                        .then(function (data) {
                            params.total(data.count);
                            $defer.resolve(data.items);
                            $scope.payments = data.items;
                        });
                }
            }
        );

        $scope.checkboxes = { 'checked': false, payments: {} };
        $scope.detachFromPayeePaymentDisabled = true;

        $scope.$watch('checkboxes.checked', function (value)
        {
            angular.forEach($scope.payments, function (payment)
            {
                if (angular.isDefined(payment.id))
                    $scope.checkboxes.payments[payment.id] = value;
            });
        });

        $scope.$watch('checkboxes.payments', function (values)
        {
            if (!$scope.payments)
                return;

            var atLeastOneChecked = false;
            angular.forEach($scope.checkboxes.payments, function (value, key){if (value == true) atLeastOneChecked = true;});
            $scope.detachFromPayeePaymentDisabled = !atLeastOneChecked;

            var checked=0, unchecked=0, total = $scope.payments.length;
            angular.forEach($scope.payments, function (payment)
            {
                checked += ($scope.checkboxes.payments[payment.id]) || 0;
                unchecked += (!$scope.checkboxes.payments[payment.id]) || 0;
            });
            if ((unchecked == 0) || (checked == 0))
                $scope.checkboxes.checked = (checked == total);
            angular.element(document.getElementById("select_all")).prop("indeterminate", (checked != 0 && unchecked != 0));
        }, true);

        $scope.detachFromPayeePayment = function()
        {
            var ids = [];
            angular.forEach($scope.checkboxes.payments, function (value, key) {
                if (value == true) {
                    ids.push(key);
                }
            });
            if (ids.length > 0) {
                payeePaymentsFactory.detachFromPayeePayment(ids).then(function() {
                    $scope.tableParams.reload();
                    $scope.checkboxes = { 'checked': false, payments: {} };
                });
            }
        }
    });