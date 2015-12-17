'use strict';

angular.module('crm.publisher').factory('royaltyPaymentsFactory', ['apiFactory', 'RestUrlParamsBuilder', function(apiFactory, RestUrlParamsBuilder) {
    return {
        payments: function(params) {
            var restUrlParams = RestUrlParamsBuilder.getUrlParams(params.page(), params.count(), params.sorting(), params.filter());
        	return apiFactory.royaltyPayments(restUrlParams);
        },
    };
}]);