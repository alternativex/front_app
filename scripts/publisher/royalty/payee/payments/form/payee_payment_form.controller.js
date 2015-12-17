'use strict';

angular.module('crm.publisher')
    .controller('PayeePaymentFormCtrl', function ($scope, $modalInstance, ids, defaultAmount)
    {
        $scope.payment = {};
        $scope.payment.ids = ids;
        $scope.payment.amount = defaultAmount;
        $scope.payment.payment_date = '';
        $scope.payment.status = "unpaid";
        var currentYear = new Date().getFullYear();
        $scope.payment.year = currentYear;
        $scope.payment.quarter = '';
        $scope.payment.month = '';

        $scope.years = [];
        $scope.quarters = ['',1,2,3,4];
        $scope.months = ['',1,2,3,4,5,6,7,8,9,10,11,12];
        for (var i = currentYear ; i > currentYear -10; i--)
            $scope.years.push(i);

        $scope.create = function () {
            $scope.submitted = true;
            if ($scope.frmPayment.$invalid)
                return;
            $modalInstance.close($scope.payment);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        $scope.paymentDateOpen = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.paymentDateOpened = true;
        };
    });