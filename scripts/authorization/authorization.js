'use strict';

angular
    .module('crm.auth', ['ui.router']).config(function ($stateProvider) {
//        console.log($stateProvider);
        var originalState = $stateProvider.state;
//console.log(originalState);
        $stateProvider.state = function (name, definition) {
            definition.resolve = {
                'authorize': function (authorizationFactory, $state) {
                    if (definition.secure && authorizationFactory.user() == undefined)
                        return authorizationFactory.checkSession().catch(function (error) {
//                            console.log("logout");
                            authorizationFactory.logoutUser();
//                            console.log("redirect login");
                            $state.go('login');
                        });
                }
            };
            return originalState.call($stateProvider, name, definition);
        }

    });