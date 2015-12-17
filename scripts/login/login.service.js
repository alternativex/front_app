'use strict';

//factory style, more involved but more sophisticated
angular.module('crm').factory('loginFactory', ['apiFactory', 'sessionFactory', function(apiFactory, sessionFactory) {
    return {
        login: function(credentials) {
        		return apiFactory.login(credentials.email, credentials.password).then(function(user){
        				sessionFactory.set('user', user);
        				return user;
        		});
        }
    };
}]);