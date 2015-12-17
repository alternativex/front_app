'use strict';

angular.module('crm.admin').factory('adminCompaniesFactory', ['apiFactory', 'RestUrlParamsBuilder', function(apiFactory, RestUrlParamsBuilder) {
    return {
        companies: function(params) {
            var restUrlParams = RestUrlParamsBuilder.getUrlParams(params.page(), params.count(), params.sorting(), params.filter());
        	return apiFactory.companies(restUrlParams);
        },
        companiesAll: function(params) {
            return apiFactory.companiesAll();
        },
        services: function() {
            return apiFactory.services();
        },
        companyServiceCreate: function(companyService) {
            return apiFactory.companyServiceCreate(companyService);
        },
        companyServiceDelete: function(id) {
            return apiFactory.companyServiceDelete(id);
        },
    };
}]);