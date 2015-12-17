'use strict';

angular.module('crm.admin').factory('adminCompanyFormFactory', ['apiFactory', function(apiFactory) {
    return {
//        create:function(company) {
//            return apiFactory.companyCreate(company);
//        },
//        update:function(company) {
//            return apiFactory.companyUpdate(company);
//        },
        createOrUpdate:function(company) {
            if (company.id)
                return apiFactory.companyUpdate(company);
            else
                return apiFactory.companyCreate(company);
        },
        company: function(id) {
            return apiFactory.company(id);
        },
    };
}]);