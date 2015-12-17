'use strict';

angular.module('crm.publisher').factory('paymentFileUploadFormFactory', ['apiFactory', function(apiFactory) {
    return {
        royaltyPaymentFileUploadUrl: function() {
            return apiFactory.royaltyPaymentFileUploadUrl();
        },
    };
}]);