'use strict';

angular.module('crm')
    .controller('LogoutCtrl', ['$scope', '$state', 'authorizationFactory', function ($scope, $state, authorizationFactory) {
        if (authorizationFactory.user())
            authorizationFactory.logoutUser()
                .then(function () {
                    $state.go('login');
                });
        else
            $state.go('login');
    }]);
