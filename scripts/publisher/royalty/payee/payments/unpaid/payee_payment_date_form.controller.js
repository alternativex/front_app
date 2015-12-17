'use strict';

angular.module('crm.publisher')
    .controller('PayeePaymentDateFormCtrl', function ($scope, $modalInstance, payeePaymentsIds)
    {
        $scope.payeePayment = {};
        $scope.payeePayment.ids = payeePaymentsIds;
        $scope.payeePayment.payment_date = '';
        $scope.payeePayment.notes = null;

//        console.log($scope.payeePayment);

        $scope.mark = function () {
            $scope.submitted = true;
//            console.log($scope.submitted);
//            console.log($scope.frmPayment.$invalid);
//            console.log($scope.payeePayment);
            if ($scope.frmPayment.$invalid)
                return;
//            console.log($scope.payeePayment);
//            console.log($scope.$parent.payeePayment);
            $modalInstance.close($scope.payeePayment);
        };

        $scope.cancel = function () {
//            console.log($scope.payeePayment);
//            console.log($scope.myDate);
            $modalInstance.dismiss('cancel');
        };

        $scope.paymentDateOpen = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.paymentDateOpened = true;
        };
    });