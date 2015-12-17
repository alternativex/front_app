'use strict';

angular.module('crm.publisher').factory('royaltyPaymentFilesFactory', ['apiFactory', 'RestUrlParamsBuilder', function(apiFactory, RestUrlParamsBuilder) {
    return {
        files: function(params) {
            var restUrlParams = RestUrlParamsBuilder.getUrlParams(params.page(), params.count(), params.sorting(), params.filter());
        	return apiFactory.royaltyPaymentFiles(restUrlParams);
        },
        royaltyPaymentFileDownloadUrl: function(id) {
            return apiFactory.royaltyPaymentFileDownloadUrl(id);
        },
        royaltyPaymentFileDownloadHeaderUrl: function() {
            return apiFactory.royaltyPaymentFileDownloadHeaderUrl();
        }
    };
}]);