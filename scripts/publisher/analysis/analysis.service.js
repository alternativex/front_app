'use strict';

angular.module('crm.publisher').factory('publisherAnalysisFactory', ['apiFactory', function(apiFactory) {
    return {
    	getProviders: function (dealId){
    		return apiFactory.dealRoyaltiesAnalysisProviders(dealId);
    	},
    	getRoyaltiesByPerformanceDate: function (dealId){
    		return apiFactory.dealRoyaltiesEarnedByPerformanceDate(dealId);
    	},
    	getRoyaltiesAnalysisStats: function (dealId){
    		return apiFactory.dealRoyaltiesAnalysisStats(dealId);
    	},
        getDeal: function (dealId){
            return apiFactory.dealWithStreamFiles(dealId);
        },
        getLogiSecretKey: function() {
            return apiFactory.logiSecretKey();
        },
        analysisReportIframeUrl: function(dealId, secretKey) {
            return apiFactory.analysisReportIframeUrl(dealId, secretKey);
        }
    };
}]);