'use strict';

angular.module('crm.publisher')
    .controller('PayeeUnattachedPaymentsCtrl', function ($scope, $state, $filter, ngTableParams, payeePaymentsFactory, authorizationFactory, $modal, filterFilter)
    {

        if (!authorizationFactory.canViewRoyaltyPayments()) {
            authorizationFactory.redirectToLandingUrl();
        }

        $scope.searchFor = null;
        $scope.search = function () {
            if ($scope.searchFor != null) {
                $scope.tableParams.$params.filter.payee_name = $scope.searchFor+"|or";
                $scope.tableParams.$params.filter.song_title = $scope.searchFor+"|or";
            }
        }

        $scope.tableParams = new ngTableParams(
            {
                page: 1,
                count: 50,
                sorting: { date_period_from: 'desc' }
            },
            {
                total: 0,
                getData: function ($defer, params)
                {
                    payeePaymentsFactory.payments(params)
                        .then(function (data)
                        {
                            params.total(data.count);
                            $defer.resolve(data.items);
                            $scope.payments = data.items;
                        });
                }
            }
        );

        $scope.payee = {}
        payeePaymentsFactory.userByPayeeCode($state.params.payeeCode).then(function(user){
            $scope.payee = user;
        })

        $scope.tableParams.$params.filter.payee_code = $state.params.payeeCode;
        $scope.tableParams.$params.filter.payee_payment_id = "null";

        $scope.checkboxes = { 'checked': false, payments: {} };

        $scope.createPayeePaymentDisabled = true;

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
            $scope.createPayeePaymentDisabled = !atLeastOneChecked;

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

        $scope.openMarkAsPaidForm = function()
        {
            var ids = [];
            var defaultAmount = 0;
            angular.forEach($scope.checkboxes.payments, function (value, key) {
                if (value == true) {
                    ids.push(key);
                    var payment = filterFilter($scope.payments, {id : key })[0];
                    defaultAmount += payment.amount_received;
                }
            });
            if (ids.length > 0) {
                var modalInstance = $modal.open({
                    templateUrl: 'scripts/publisher/royalty/payee/payments/form/payee_payment.form.html?v='+APP_VERSION,
                    controller: 'PayeePaymentFormCtrl',
                    size: 'sm',
                    resolve: {
                        ids: function () {
                            return ids;
                        },
                        defaultAmount: function () {
                            return defaultAmount;
                        }
                    }
                });
                modalInstance.result.then(function (payment) {
                    payment.payee_code = $state.params.payeeCode;
                    payment.client_code = $scope.payments[0].client_code;
                    payment.company_id = $scope.payee.company_id;
                    console.log(payment);
                    payeePaymentsFactory.createPayeePayment(payment).then(function() {
                        $scope.tableParams.reload();
                        $scope.checkboxes = { 'checked': false, payments: {} };
                    });
                }, function () {
                    //canceled
                });
            }
        }
    });