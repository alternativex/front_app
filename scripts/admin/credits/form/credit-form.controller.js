'use strict';

angular.module('crm.admin')
    .controller('AdminCreditFormCtrl', function ($scope, $state, adminCreditFormFactory) {

        $scope.credit = {};

        adminCreditFormFactory.credit($state.params.id)
            .then(function (credit) {
                $scope.credit = credit;
            });

        $scope.update = function () {
            $scope.submitted = true;
            if ($scope.form.$invalid) {
                return;
            }
            adminCreditFormFactory.update(this.credit)
                .then(function () {
                    $state.go('admin.companies.list');
                })
                .catch(function () {
                    this.error = true;
                }
            );
        }
    });
