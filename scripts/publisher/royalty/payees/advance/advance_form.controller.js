'use strict';

angular.module('crm.publisher')
    .controller('PayeeAdvanceFormCtrl', function ($scope, $modalInstance)
    {
        $scope.advance = {status: 'incomplete'};

        $scope.add = function () {
            $scope.submitted = true;
            if ($scope.frmAdvance.$invalid)
                return;
            $modalInstance.close($scope.advance);
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