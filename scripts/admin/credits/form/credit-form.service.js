'use strict';

angular.module('crm.admin').factory('adminCreditFormFactory', ['apiFactory', function(apiFactory) {
    return {
        update:function(credit) {
            return apiFactory.creditUpdate(credit);
        },
        credit: function(id) {
            return apiFactory.credit(id);
        },
    };
}]);