'use strict';

angular.module('crm.admin')
    .controller('AdminUsersCtrl', function ($scope, $location, $filter, ngTableParams, adminUsersFactory) {

        $scope.types = ['admin','publisher_admin','publisher'];

        $scope.searchFor = null;
        $scope.search = function () {
            if ($scope.searchFor != null) {
                $scope.tableParams.$params.filter.name = $scope.searchFor+"|or";
                $scope.tableParams.$params.filter.email = $scope.searchFor+"|or";
            }
        }

        $scope.tableParams = new ngTableParams(
            {page: 1, count: 10, sorting: { id: 'desc' }},
            {total: 0,getData: function ($defer, params) {
                    adminUsersFactory.users(params)
                        .then(function (data) {
                            params.total(data.count);
                            $defer.resolve(data.items);
                        });
                }
            }
        );

        $scope.deleteUser = function (id) {
            adminUsersFactory.deleteUser(id).then(function () {
                $scope.tableParams.reload();
            });
        }
});
