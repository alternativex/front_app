'use strict';

angular.module('crm.publisher').factory('publisherDealUpdateFactory', ['apiFactory', function(apiFactory) {
    return {
        deal: function(dealId) {
        	return apiFactory.deal(dealId);
        },

        dealStatus: function() {
            return apiFactory.dealStatus();
        },

        dealUpdate:function(deal) {
            return apiFactory.dealUpdate(deal);
        }

    };
}]);