'use strict';

angular.module('crm.publisher').factory('royaltyPaymentPayeesFactory', ['apiFactory', 'RestUrlParamsBuilder', function(apiFactory, RestUrlParamsBuilder) {
    return {
        payees: function(params) {
            var restUrlParams = RestUrlParamsBuilder.getUrlParams(params.page(), params.count(), params.sorting(), params.filter());
        	return apiFactory.payees(restUrlParams);
        },
        payeesWithEmail: function(params) {
            var restUrlParams = RestUrlParamsBuilder.getUrlParams(params.page(), params.count(), params.sorting(), params.filter());
            return apiFactory.payeesWithEmail(restUrlParams);
        },
        payeesWithoutEmail: function(params) {
            var restUrlParams = RestUrlParamsBuilder.getUrlParams(params.page(), params.count(), params.sorting(), params.filter());
            return apiFactory.payeesWithoutEmail(restUrlParams);
        },
        downloadNoEmailUrl: function() {
            return apiFactory.downloadNoEmailUrl();
        },
        payeesBatchUpdateUrl: function() {
            return apiFactory.payeesBatchUpdateUrl();
        },
        batchUpdateEmails: function (updateUsers) {
            return apiFactory.batchUpdateEmails(updateUsers);
        },
        counts: function() {
            return apiFactory.payeesCounts();
        },
        addAdvance: function(advance) {
            return apiFactory.addAdvance(advance);
        },
        advance: function(advanceId) {
            return apiFactory.advance(advanceId);
        },
        advancePayments: function(params) {
            var restUrlParams = RestUrlParamsBuilder.getUrlParams(params.page(), params.count(), params.sorting(), params.filter());
            return apiFactory.advancePayments(restUrlParams);
        },
    };
}]);