'use strict';

angular
    .module('crm.payee', ['ngTable', 'crm.auth', 'ui.router', 'ui.bootstrap'])
    .config(['$stateProvider', function ($stateProvider)
    {
        $stateProvider
            .state('payee', { abstract: true, url: '/payee', template: '<div><div ui-view></div></div>'})
            .state('payee.dashboard', { url: '/dashboard', templateUrl: 'scripts/payee/dashboard/payee-dashboard.view.html?v='+APP_VERSION, controller: 'PayeeDashboardCtrl', title: 'Dashboard', secure: true, role: 'payee'})
            .state('payee.analysis', { url: '/analysis', templateUrl: 'scripts/publisher/deals/deals.view.html?v='+APP_VERSION, controller: 'PayeeAnalysisCtrl', title: 'Analysis', secure: true, role: 'payee'})
            .state('payee.analysisCreate', { url: '/analysis/new', templateUrl: 'scripts/payee/analysis/payee-analysis-new.view.html?v='+APP_VERSION, controller: 'PayeeNewAnalysisCtrl', title: 'New Analysis', secure: true, role: 'payee'})
            .state('payee.atm', { url: '/atm', templateUrl: 'scripts/payee/atm/payee-atm.view.html?v='+APP_VERSION, controller: 'PayeeAtmCtrl', title: '    ATM Advances', secure: true, role: 'payee'})
            .state('payee.payments', { url: '/payments', templateUrl: 'scripts/payee/payments/payee-payments.view.html?v='+APP_VERSION, controller: 'PayeePaymentsCtrl', title: 'Payments', secure: true, role: 'payee'})
            .state('payee.statementPayments', { url: '/payeePayment/:payeePaymentId/payments', templateUrl: 'scripts/payee/payments/payee-payments.view.html?v='+APP_VERSION, controller: 'PayeePaymentsCtrl', title: 'Payments', secure: true, role: 'payee'})
            .state('payee.advance', { url: '/advance/:advanceId', templateUrl: 'scripts/publisher/royalty/payees/advance/advance.view.html?v='+APP_VERSION, controller: 'AdvancePayeesCtrl', title: 'Advance', secure: true, role: 'payee'})
    }]);