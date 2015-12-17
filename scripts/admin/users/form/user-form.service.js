'use strict';

angular.module('crm.admin').factory('adminUserFormFactory', ['apiFactory', function (apiFactory) {
    return {
        userTypes: function () {
            return apiFactory.userTypes();
        },
        createOrUpdate: function (user) {
            if (user.id)
                return apiFactory.userUpdate(user);
            else
                return apiFactory.userCreate(user);
        },
        user: function (id) {
            return apiFactory.user(id);
        },

    };
}]);