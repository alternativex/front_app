'use strict';

angular.module('crm.admin')
    .controller('AdminCompanyFormCtrl', function ($scope, $state, adminCompanyFormFactory) {

        $scope.company = {};

        $scope.isNew = function()
        {
            return !$state.params.id;
        }

        if ($state.params.id) {
            var that = this;
            adminCompanyFormFactory.company($state.params.id)
                .then(function (company) {
                    $scope.company = company;
                });
        }

        $scope.createOrUpdate = function () {
            $scope.submitted = true;

            if ($scope.form.$invalid) {
                return;
            }
            adminCompanyFormFactory.createOrUpdate($scope.company)
                .then(function () {
                    $state.go('admin.companies.list');
                })
                .catch(function () {
                    this.error = true;
                }
            );
        }
    });
