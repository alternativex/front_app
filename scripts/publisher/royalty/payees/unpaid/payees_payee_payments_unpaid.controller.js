'use strict';

angular.module('crm.publisher')
    .controller('PayeesUnpaidPayeePaymentsCtrl', function ($scope, PayeeUnpaidPaymentsCtrlService, $injector)
    {

        $scope.tableParamsConfig = {page: 1, count: 10, sorting: { id: 'desc' }};
        $injector.invoke(PayeeUnpaidPaymentsCtrlService, this, {$scope: $scope});

//        if (!authorizationFactory.canViewRoyaltyPayments()) {
//            authorizationFactory.redirectToLandingUrl();
//        }
//
//        $scope.refreshCounts();
//
//        $scope.tableParams = new ngTableParams(
//            {
//                page: 1,
//                count: 10,
//                sorting: { id: 'desc' },
//                filter: {status : "=unpaid"}
//            },
//            {
//                total: 0,
//                getData: function ($defer, params) {
//                    payeePaymentsFactory.payeePayments(params)
//                        .then(function (data) {
//                            params.total(data.count);
//                            $defer.resolve(data.items);
//                            $scope.payee_payments = data.items;
//                        });
//                }
//            }
//        );
//
//        $scope.checkboxes = { 'checked': false, payee_payments: {} };
//        $scope.markSelectedAsPaidDisabled = true;
//
//        $scope.$watch('checkboxes.checked', function (value)
//        {
//            angular.forEach($scope.payee_payments, function (payeePayment)
//            {
//                if (angular.isDefined(payeePayment.id))
//                    $scope.checkboxes.payee_payments[payeePayment.id] = value;
//            });
//        });
//
//        $scope.$watch('checkboxes.payee_payments', function (values)
//        {
//            if (!$scope.payee_payments)
//                return;
//
//            var atLeastOneChecked = false;
//            angular.forEach($scope.checkboxes.payee_payments, function (value, key){if (value == true) atLeastOneChecked = true;});
//            $scope.markSelectedAsPaidDisabled = !atLeastOneChecked;
//
//            var checked=0, unchecked=0, total = $scope.payee_payments.length;
//            angular.forEach($scope.payee_payments, function (payeePayment)
//            {
//                checked += ($scope.checkboxes.payee_payments[payeePayment.id]) || 0;
//                unchecked += (!$scope.checkboxes.payee_payments[payeePayment.id]) || 0;
//            });
//            if ((unchecked == 0) || (checked == 0))
//                $scope.checkboxes.checked = (checked == total);
//            angular.element(document.getElementById("select_all")).prop("indeterminate", (checked != 0 && unchecked != 0));
//        }, true);
//
//        $scope.openMarkSelectedAsPaidForm = function()
//        {
//            var payeePaymentsIds = [];
////            var defaultAmount = 0;
//            angular.forEach($scope.checkboxes.payee_payments, function (value, key) {
//                if (value == true) {
//                    payeePaymentsIds.push(key);
////                    var payment = filterFilter($scope.payments, {id : key })[0];
////                    defaultAmount += payment.amount_received;
//                }
//            });
//            if (payeePaymentsIds.length > 0) {
//                var modalInstance = $modal.open({
//                    templateUrl: 'scripts/publisher/royalty/payee/payments/unpaid/payee_payment_date.form.html?v='+APP_VERSION,
//                    controller: 'PayeePaymentDateFormCtrl',
//                    size: 'sm',
//                    resolve: {
//                        payeePaymentsIds: function () {
//                            return payeePaymentsIds;
//                        }
////                        defaultAmount: function () {
////                            return defaultAmount;
////                        }
//                    }
//                });
//                modalInstance.result.then(function (payeePayment) {
////                    console.log(payeePayment);
//                    payeePaymentsFactory.markAllPayeePaymentsAsPaid(payeePayment).then(function() {
//                        $scope.tableParams.reload();
//                        $scope.checkboxes = { 'checked': false, payee_payments: {} };
//                        $scope.refreshCounts();
//                    });
//                }, function () {
//                    //canceled
//                });
//            }
//        }
    });