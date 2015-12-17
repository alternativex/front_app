'use strict';

angular.module('crm.admin').factory('adminUsersFactory', ['apiFactory', 'RestUrlParamsBuilder', function(apiFactory, RestUrlParamsBuilder) {
    return {
        users: function(params) {
            var restUrlParams = RestUrlParamsBuilder.getUrlParams(params.page(), params.count(), params.sorting(), params.filter());
        	return apiFactory.users(restUrlParams);
        },
        deleteUser: function(id) {
            return apiFactory.deleteUser(id);
        }
    };
}]);