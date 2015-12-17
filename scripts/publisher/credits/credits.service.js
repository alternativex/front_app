'use strict';

angular.module('crm.publisher').factory('adminCreditsFactory', ['apiFactory', function(apiFactory) {
    return {
        company: function(id) {
            return apiFactory.company(id);
        },
    };
}]);