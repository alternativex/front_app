'use strict';

//factory style, more involved but more sophisticated
angular.module('crm.publisher').factory('publisherSettingsFactory', ['apiFactory', function(apiFactory) {
    return {
    		updateUser: function(user){
    				apiFactory.userUpdate(user);
    		}
    };
}]);