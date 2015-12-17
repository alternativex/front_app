/**
 * Created by alinvilcu on 02/12/14.
 */
'use strict';

/**
 * @ngdoc function
 * @name publisherApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the publisherApp
 */
angular.module('crm')
    .controller('LoginCtrl', ['$scope', '$route', 'loginFactory', '$location', 'authorizationFactory',
        function ($scope, $route, loginFactory, $location, authorizationFactory) {

            this.credentials = {email: '', password: '', type: ''};

            this.redirectUserRoleBased = function () {
                if (authorizationFactory.isAuthenticated()) {
                    authorizationFactory.redirectToLandingUrl();
                }
            }

            this.login = function () {
                this.submitted = true;

                if ($scope.frmLogin.$invalid) {
                    return;
                }

                var that = this;

                loginFactory.login(this.credentials).then(function (user) {
                    that.redirectUserRoleBased();
                    authorizationFactory.loginUser(user);
                }, function (error) {
                    that.error = true
                });

            }

            this.redirectUserRoleBased();
        }]);
