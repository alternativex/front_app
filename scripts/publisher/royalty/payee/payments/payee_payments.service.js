'use strict';

angular.module('crm.publisher')
    .factory('payeePaymentsFactory', ['apiFactory', 'RestUrlParamsBuilder', function(apiFactory, RestUrlParamsBuilder) {
        return {
            payments: function(params) {
                var restUrlParams = RestUrlParamsBuilder.getUrlParams(params.page(), params.count(), params.sorting(), params.filter());
                return apiFactory.royaltyPayments(restUrlParams);
            },
            payeePayments: function(params) {
                var restUrlParams = RestUrlParamsBuilder.getUrlParams(params.page(), params.count(), params.sorting(), params.filter());
                return apiFactory.payeePayments(restUrlParams);
            },
            unpaidPayeePayments: function(params) {
                var restUrlParams = RestUrlParamsBuilder.getUrlParams(params.page(), params.count(), params.sorting(), params.filter());
                return apiFactory.unpaidPayeePayments(restUrlParams);
            },
            createPayeePayment: function(payment)
            {
                return apiFactory.createPayeePayment(payment);
            },
            userByPayeeCode: function (payeeCode)
            {
                return apiFactory.userByPayeeCode(payeeCode);
            },
            markAllPayeePaymentsAsPaid: function(payeePayment)
            {
                return apiFactory.markAllPayeePaymentsAsPaid(payeePayment);
            },
            detachFromPayeePayment: function(ids)
            {
                return apiFactory.detachFromPayeePayment(ids);
            },
            payeePaymentsGroupedByMarkedAsPaid: function(params) {
                var restUrlParams = RestUrlParamsBuilder.getUrlParams(params.page(), params.count(), params.sorting(), params.filter());
                return apiFactory.payeePaymentsGroupedByMarkedAsPaid(restUrlParams);
            },
            downloadUnpaidStatements: function() {
                return apiFactory.downloadUnpaidStatementsUrl();
            },
            downloadUnpaidPayeeStatements: function(payeeCode) {
                return apiFactory.downloadUnpaidPayeeStatementsUrl(payeeCode);
            },
            payeePaymentsBatchUpdateUrl: function() {
                return apiFactory.payeePaymentsBatchUpdateUrl();
            }
        };
    }])
    .factory('PayeeUnpaidPaymentsCtrlService',function(){
        return function ($scope, $state, ngTableParams, payeePaymentsFactory, authorizationFactory, FileUploader) {

            if (!authorizationFactory.canViewRoyaltyPayments()) {
                authorizationFactory.redirectToLandingUrl();
            }


            $scope.refreshCounts();

            $scope.searchFor = null;
            $scope.search = function () {
                if ($scope.searchFor != null) {
                    $scope.tableParams.$params.filter.search = $scope.searchFor
                }
            }

            if ($state.params.payeeCode) {
                $scope.downloadUnpaidStatementsUrl = payeePaymentsFactory.downloadUnpaidPayeeStatements($state.params.payeeCode);
            }else{
                $scope.downloadUnpaidStatementsUrl = payeePaymentsFactory.downloadUnpaidStatements();
            }

            $scope.tableParams = new ngTableParams(
                $scope.tableParamsConfig,
                {
                    total: 0,
                    getData: function ($defer, params) {
                        payeePaymentsFactory.unpaidPayeePayments(params)
                            .then(function (data) {
                                params.total(data.count);
                                $defer.resolve(data.items);
                                $scope.payee_payments = data.items;
                            });
                    }
                }
            );

            $scope.checkboxes = { 'checked': false, payee_payments: {} };
            $scope.markSelectedAsPaidDisabled = true;

            $scope.$watch('checkboxes.checked', function (value)
            {
                angular.forEach($scope.payee_payments, function (payeePayment)
                {
                    if (angular.isDefined(payeePayment.id))
                        $scope.checkboxes.payee_payments[payeePayment.id] = value;
                });
            });

            $scope.$watch('checkboxes.payee_payments', function (values)
            {
                if (!$scope.payee_payments)
                    return;

                var atLeastOneChecked = false;
                angular.forEach($scope.checkboxes.payee_payments, function (value, key){if (value == true) atLeastOneChecked = true;});
                $scope.markSelectedAsPaidDisabled = !atLeastOneChecked;

                var checked=0, unchecked=0, total = $scope.payee_payments.length;
                angular.forEach($scope.payee_payments, function (payeePayment)
                {
                    checked += ($scope.checkboxes.payee_payments[payeePayment.id]) || 0;
                    unchecked += (!$scope.checkboxes.payee_payments[payeePayment.id]) || 0;
                });
                if ((unchecked == 0) || (checked == 0))
                    $scope.checkboxes.checked = (checked == total);
                angular.element(document.getElementById("select_all")).prop("indeterminate", (checked != 0 && unchecked != 0));
            }, true);

            $scope.openMarkAsPaidForm = function(all)
            {
                var payeePaymentsIds = [];
                //            var defaultAmount = 0;
                angular.forEach($scope.checkboxes.payee_payments, function (value, key) {
                    if (value == true) {
                        payeePaymentsIds.push(key);
//                    var payment = filterFilter($scope.payments, {id : key })[0];
//                    defaultAmount += payment.amount_received;
                    }
                });
                if (all == true || (all == false && payeePaymentsIds.length > 0)) {
                    var modalInstance = $modal.open({
                        templateUrl: 'scripts/publisher/royalty/payee/payments/unpaid/payee_payment_date.form.html?v='+APP_VERSION,
                        controller: 'PayeePaymentDateFormCtrl',
                        size: 'sm',
                        resolve: {
                            payeePaymentsIds: function () {
                                return (all == true) ? [] : payeePaymentsIds;
                            }
                            //                        defaultAmount: function () {
                            //                            return defaultAmount;
                            //                        }
                        }
                    });
                    modalInstance.result.then(function (payeePayment) {
                        payeePaymentsFactory.markAllPayeePaymentsAsPaid(payeePayment).then(function() {
                            $scope.tableParams.reload();
                            $scope.checkboxes = { 'checked': false, payee_payments: {} };
                            $scope.refreshCounts();
                        });
                    }, function () {
                        //canceled
                    });
                }
            }

            var uploader = $scope.uploader = new FileUploader({
                url: payeePaymentsFactory.payeePaymentsBatchUpdateUrl(),
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
                $scope.tableParams.reload();
            };
        };
    });