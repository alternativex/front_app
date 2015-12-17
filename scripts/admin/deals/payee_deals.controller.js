'use strict';

angular.module('crm.publisher')
    .controller('AdminPayeeDealsCtrl', function ($scope, $injector, AdminDealsParentCtrl) {

        $scope.tableParamsConfig = {
            page: 1,
            count: 10,
            sorting: { id: 'desc' },
            filter: {payee_code: "!null"}
        };
        $injector.invoke(AdminDealsParentCtrl, this, {$scope: $scope});
    });
