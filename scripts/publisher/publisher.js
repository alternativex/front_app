'use strict';

angular
    .module('crm.publisher', ['ngTable', 'crm.auth', 'ui.router', 'angularFileUpload', 'ui.bootstrap'])
    .config(['$stateProvider', function ($stateProvider)
    {
        $stateProvider
            .state('publisher', { abstract: true, url: '/publisher', template: '<div><div ui-view></div></div>'})
            .state('publisher.deals', { url: '/deals', templateUrl: 'scripts/publisher/deals/deals.view.html?v='+APP_VERSION, controller: 'PublisherDealsCtrl', title: 'Analysis', secure: true, role: 'publisher'})
            .state('publisher.deal', { url: '/deal/:dealId', templateUrl: 'scripts/publisher/deal-update/deal-update.view.html?v='+APP_VERSION, controller: 'PublisherDealUpdateCtrl', title: 'Edit Analysis', secure: true, role: 'publisher', params : { redirectTo: null}})
            .state('publisher.analysis', { url: '/deals/:dealId/analysis', templateUrl: 'scripts/publisher/analysis/analysis.view.html?v='+APP_VERSION, title: 'Royalty Analysis', secure: true, role: 'publisher'})
            .state('publisher.credits', { url: '/credits/:companyId', templateUrl: 'scripts/publisher/credits/credits.view.html?v='+APP_VERSION, controller: 'PublisherCreditsCtrl', title: 'Credits', secure: true, role: 'publisher'})
            .state('publisher.royalty', { abstract: true, url: '/payments', templateUrl: 'scripts/publisher/royalty/royalties.html?v='+APP_VERSION})
            .state('publisher.royalty.upload', { url: '/upload', templateUrl: 'scripts/publisher/royalty/payment_file/upload.form.html?v='+APP_VERSION, controller: 'PaymentFileUploadFormCtrl', title: 'Royalty - File Upload', secure: true, role: 'publisher'})
            .state('publisher.royalty.files', { url: '/files', templateUrl: 'scripts/publisher/royalty/payment_file/files.view.html?v='+APP_VERSION, controller: 'RoyaltyPaymentFilesCtrl', title: 'Royalty - Payment Files', secure: true, role: 'publisher'})
            .state('publisher.royalty.paidStatementLogs', { url: '/paidStatementLogs', templateUrl: 'scripts/publisher/royalty/payees/statements/paid_statements_logs.view.html?v='+APP_VERSION, controller: 'PublisherPaidStatementsLogsCtrl', title: 'Paid Statement Logs', secure: true, role: 'publisher'})

            //payees
            .state('publisher.royalty.payees',
                { url: '/payees', abstract: true, templateUrl: 'scripts/publisher/royalty/payees/payees.html?v='+APP_VERSION, controller: 'RoyaltyPaymentsPayeesCtrl'})
            .state('publisher.royalty.payees.all',
                { url: '/all', templateUrl: 'scripts/publisher/royalty/payees/all/payees-all.view.html?v='+APP_VERSION, controller: 'RoyaltyPaymentsAllPayeesCtrl', title: 'Royalty - All Payees', secure: true, role: 'publisher'})
            .state('publisher.royalty.payees.new',
                { url: '/new', templateUrl: 'scripts/publisher/royalty/payees/new/payees-new.view.html?v='+APP_VERSION, controller: 'RoyaltyPaymentsNewPayeesCtrl', title: 'Royalty - New Payees', secure: true, role: 'publisher'})
            .state('publisher.royalty.payees.unpaid',
                { url: '/unpaid', templateUrl: 'scripts/publisher/royalty/payee/payments/unpaid/payee_payments_unpaid.view.html?v='+APP_VERSION, controller: 'PayeesUnpaidPayeePaymentsCtrl', title: 'Royalty - Unpaid Statements', secure: true, role: 'publisher'})
            .state('publisher.royalty.payees.paid',
                { url: '/paid', templateUrl: 'scripts/publisher/royalty/payee/payments/paid/payee_payments_paid.view.html?v='+APP_VERSION, controller: 'PayeesPaidPayeePaymentsCtrl', title: 'Royalty - Paid Statements', secure: true, role: 'publisher'})
            .state('publisher.royalty.payees.advance',
                { url: '/advance/:advanceId', templateUrl: 'scripts/publisher/royalty/payees/advance/advance.view.html?v='+APP_VERSION, controller: 'AdvancePayeesCtrl', title: 'Royalty - Advance', secure: true, role: 'publisher'})

            //payee
            .state('publisher.royalty.payee',
                { abstract: true, url: '/:payeeCode', template: '<div><div ui-view></div></div>'})
            .state('publisher.royalty.payee.payments',
                { abstract: true, url: '/payments', templateUrl: 'scripts/publisher/royalty/payee/payments/payee_payments.html?v='+APP_VERSION})
            .state('publisher.royalty.payee.payments.unattached',
                { url: '/unattached', templateUrl: 'scripts/publisher/royalty/payee/payments/unattached/payee_payments_unattached.view.html?v='+APP_VERSION, controller: 'PayeeUnattachedPaymentsCtrl', title: 'Royalty - Unattached Royalty Payments', secure: true, role: 'publisher'})
            .state('publisher.royalty.payee.payments.attached',
                { url: '/attached/:payeePaymentId', templateUrl: 'scripts/publisher/royalty/payee/payments/attached/payee_payments_attached.view.html?v='+APP_VERSION, controller: 'PayeeAttachedPaymentsCtrl', title: 'Royalty - Attached Royalty Payments', secure: true, role: 'publisher'})
            .state('publisher.royalty.payee.payments.paid',
                { url: '/paid', templateUrl: 'scripts/publisher/royalty/payee/payments/paid/payee_payments_paid.view.html?v='+APP_VERSION, controller: 'PayeePaidPaymentsCtrl', title: 'Royalty - Paid Statements', secure: true, role: 'publisher'})
            .state('publisher.royalty.payee.payments.unpaid',
                { url: '/unpaid', templateUrl: 'scripts/publisher/royalty/payee/payments/unpaid/payee_payments_unpaid.view.html?v='+APP_VERSION, controller: 'PayeeUnpaidPaymentsCtrl', title: 'Royalty - Unpaid Statements', secure: true, role: 'publisher'})

            .state('publisher.royalty.payments', { url: '/payments', templateUrl: 'scripts/publisher/royalty/payment/payments.view.html?v='+APP_VERSION, controller: 'RoyaltyPaymentsCtrl', title: 'Royalty - Payments', secure: true, role: 'publisher'})
            .state('publisher.royalty.reports', { url: '/reports', templateUrl: 'scripts/publisher/royalty/report/reports.view.html?v='+APP_VERSION, controller: 'RoyaltyPaymentsReportsCtrl', title: 'Royalty - Reports', secure: true, role: 'publisher'})
    }]);