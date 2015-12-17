'use strict';

angular.module('crm.publisher').factory('royaltyPaymentsReportsService', ['apiFactory', function(apiFactory) {
    return {

        getAmountReceivedByDateFrom: function (){
    		return apiFactory.getAmountReceivedByDateFrom();
    	},

        getAmountEarnedByDateFrom: function (){
            return apiFactory.getAmountEarnedByDateFrom();
        },
    };
}]);