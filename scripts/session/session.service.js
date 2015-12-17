'use strict';

angular.module('crm').factory('sessionFactory', function() {
    var session = [];
    return {
        set: function(key, value) {
          session[key] = value;        		
        },

        get: function(key) {
		  return session[key];        		
        },

        delete: function(key) {
          delete session[key];
        },

        invalidate: function() {
    	   session = [];
        }
    };
});