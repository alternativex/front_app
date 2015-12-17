'use strict';

angular.module('crm.admin')
    .controller('AdminUserFormCtrl', function ($scope, $state, adminUserFormFactory, authorizationFactory, adminCompaniesFactory) {

//        console.log($state.params);

        $scope.user = {};
        $scope.userTypes = [];
        $scope.companies = [];

        $scope.isNew = function () {
            return !$state.params.id;
        }

        adminCompaniesFactory.companiesAll()
            .then(function (data) {
                $scope.companies = data.response;
                $scope.user.company_id = $scope.companies[0].id;
            })

        adminUserFormFactory.userTypes()
            .then(function (userTypes) {
                $scope.userTypes = userTypes;
                $scope.user['type'] = $scope.userTypes[0];
            })

        if ($state.params.id) {
            var that = this;
            adminUserFormFactory.user($state.params.id)
                .then(function (user) {
                    $scope.user = user;
                });
        }

        $scope.createOrUpdate = function () {
            $scope.submitted = true;

            if ($scope.frmUser.$invalid) {
                return;
            }

            adminUserFormFactory.createOrUpdate($scope.user)
                .then(
                function () {
                    if ($state.params.redirectTo != null)
                        $state.go($state.params.redirectTo);
                    else
                        $state.go('admin.users.list');
                })
                .catch(
                function () {
                    $scope.error = true;
                }
            );
        }
    });
