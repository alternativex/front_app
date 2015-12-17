'use strict';

/**
 * @ngdoc overview
 * @name publisherApp
 * @description
 * # publisherApp
 *
 * Main module of the application.
 */
angular
    .module('crm', [
        'ui.bootstrap',
        'ngAnimate',
        'ngCookies',
        'ngMessages',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'crm.configuration',
        'crm.auth',
        'crm.service',
        'crm.api',
        'crm.publisher',
        'crm.admin',
        'crm.payee',
        'crm.filter',
        'crm.utils.filter',
        'crm.utils.directive',
        'crm.amchart.directive',
        'ui.router',
        'angular.filter',
        'crm.publisher.directive'
    ])
    .constant('_', window._)
    .config(['$urlRouterProvider', '$stateProvider', '$sceDelegateProvider', function ($urlRouterProvider, $stateProvider, $sceDelegateProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('login', { url: '/login', templateUrl: 'scripts/login/login.view.html?v='+APP_VERSION, controller: 'LoginCtrl'})
            .state('logout', { url: '/logout', templateUrl: 'scripts/logout/logout.view.html?v='+APP_VERSION, controller: 'LogoutCtrl' })
            .state('/', { url: '/', templateUrl: 'scripts/login/login.view.html?v='+APP_VERSION, controller: 'LoginCtrl'})

        $sceDelegateProvider.resourceUrlWhitelist([
            'self', 'https://royaltysnapshot.com:8443/**', 'https://royaltysnapshot.com/**'
        ]);
    }])
    .run(['$location', '$rootScope', 'authorizationFactory', '$state', function ($location, $rootScope, authorizationFactory, $state) {
        $rootScope.$state = $state;
        $rootScope.$on('$routeChangeStart', function (event, next, current) {
            if (next && next.hasOwnProperty('$$route')) {
                $rootScope.title = next.$$route.title;
            }
        });
    }]);

