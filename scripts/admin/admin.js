'use strict';

angular
    .module('crm.admin', ['ngTable', 'crm.auth', 'ui.router'])
    .config(['$stateProvider', function ($stateProvider) {

        $stateProvider
            .state('admin', { abstract: true, url: '/admin', template: '<div><div ui-view></div></div>'})
            .state('admin.deals', { url: '/deals',  abstract: true, templateUrl: 'scripts/admin/deals/deals.html?v='+APP_VERSION})
            .state('admin.deals.analysis', { url: '/analysis', templateUrl: 'scripts/admin/deals/deals.view.html?v='+APP_VERSION, controller : 'AdminDealsCtrl', title: 'Analysis', secure: true, role: 'admin'})
            .state('admin.deals.ariaRun', { url: '/ariaRun', templateUrl: 'scripts/admin/deals/ariaRun.view.html?v='+APP_VERSION, controller : 'AriaRunDealsCtrl', title: 'Aria Run Listings', secure: true, role: 'admin'})
            .state('admin.users', { url: '/users', abstract: true, templateUrl: 'scripts/admin/users/users.html?v='+APP_VERSION})
            .state('admin.users.list', { url: '/list', templateUrl: 'scripts/admin/users/list/users.view.html?v='+APP_VERSION, controller : 'AdminUsersCtrl', title: 'Users', secure: true, role: 'admin'})
            .state('admin.users.create', { url: '/create', templateUrl: 'scripts/admin/users/form/user-form.view.html?v='+APP_VERSION, controller: 'AdminUserFormCtrl', title: 'Create User', secure: true, role: 'admin'})
            .state('admin.companies', { url: '/companies', abstract: true, templateUrl: 'scripts/admin/companies/companies.html?v='+APP_VERSION})
            .state('admin.companies.list', { url: '/list', templateUrl: 'scripts/admin/companies/list/companies.view.html?v='+APP_VERSION, controller : 'AdminCompaniesCtrl', title: 'Companies', secure: true, role: 'admin'})
            .state('admin.companies.create', { url: '/create', templateUrl: 'scripts/admin/companies/form/company-form.view.html?v='+APP_VERSION, controller: 'AdminCompanyFormCtrl', title: 'Create Company', secure: true, role: 'admin'})
            .state('admin.company', { url: '/company/:id', templateUrl: 'scripts/admin/companies/form/company-form.view.html?v='+APP_VERSION, controller: 'AdminCompanyFormCtrl', title: 'Update Company', secure: true, role: 'publisher'})
            .state('admin.user', { url: '/user/:id', templateUrl: 'scripts/admin/users/form/user-form.view.html?v='+APP_VERSION, controller: 'AdminUserFormCtrl', title: 'Update User', secure: true, role: 'admin', params : { redirectTo: null}})
            .state('admin.credit', { url: '/credit/:id', templateUrl: 'scripts/admin/credits/form/credit-form.view.html?v='+APP_VERSION, controller: 'AdminCreditFormCtrl', title: 'Update Credit', secure: true, role: 'admin'})
            .state('admin.payeeDeals', { url: '/payeeDeals', templateUrl: 'scripts/admin/deals/deals.view.html?v='+APP_VERSION, controller : 'AdminPayeeDealsCtrl', title: 'Payee Analysis', secure: true, role: 'admin'})
    }]);