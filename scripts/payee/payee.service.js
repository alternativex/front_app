'use strict';

angular.module('crm.payee').factory('payeeFactory', ['apiFactory', 'RestUrlParamsBuilder', function(apiFactory, RestUrlParamsBuilder) {
    return {
        payments: function(params) {
            var restUrlParams = RestUrlParamsBuilder.getUrlParams(params.page(), params.count(), params.sorting(), params.filter());
            return apiFactory.royaltyPayments(restUrlParams);
        },
        payeePaymentsTotals: function() {
            return apiFactory.payeePaymentsTotals();
        },
        payeePayments: function(params) {
            var restUrlParams = RestUrlParamsBuilder.getUrlParams(params.page(), params.count(), params.sorting(), params.filter());
            return apiFactory.payeePayments(restUrlParams);
        },
        csvPaymentsDownloadUrl: function() {
            return apiFactory.csvPaymentsDownloadUrl();
        },
        xlsPaymentsDownloadUrl: function() {
            return apiFactory.xlsPaymentsDownloadUrl();
        },
        advances: function(params) {
            var restUrlParams = RestUrlParamsBuilder.getUrlParams(params.page(), params.count(), params.sorting(), params.filter());
            return apiFactory.advances(restUrlParams);
        },
//        analysisReportIframeUrl: function(dealId) {
//            return apiFactory.analysisReportIframeUrl(dealId);
//        },
        analysisNewReportIframeUrl: function(token) {
            return apiFactory.analysisNewReportIframeUrl(token);
        },
        deals: function(params) {
            var restUrlParams = RestUrlParamsBuilder.getUrlParams(params.page(), params.count(), params.sorting(), params.filter());
            return apiFactory.deals(restUrlParams);
        },
        payeeDeals: function(payeeCode) {
            return apiFactory.payeeDeals(payeeCode);
        },
        dealRoyaltiesAnalysisStats: function(dealId) {
            return apiFactory.dealRoyaltiesAnalysisStats(dealId);
        },
        royaltyLifeTimeValueUrl: function(amount) {
            return apiFactory.royaltyLifeTimeValueUrl(amount);
        },
        sendAdviserContactEmail: function(dealId) {
            return apiFactory.sendAdviserContactEmail(dealId);
        }
    };
}]);