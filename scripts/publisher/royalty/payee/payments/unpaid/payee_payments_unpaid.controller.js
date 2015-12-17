'use strict';

angular.module('crm.publisher')
    .controller('PayeeUnpaidPaymentsCtrl', function ($scope, PayeeUnpaidPaymentsCtrlService, $injector, $state)
    {

        $scope.refreshCounts = function() {};
        $scope.tableParamsConfig = {page: 1, count: 10, sorting: { id: 'desc' }, filter: {payee_code : '='+$state.params.payeeCode}};
        $injector.invoke(PayeeUnpaidPaymentsCtrlService, this, {$scope: $scope});
    });