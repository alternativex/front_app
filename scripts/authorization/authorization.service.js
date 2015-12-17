'use strict';

//factory style, more involved but more sophisticated
angular.module('crm.auth').factory('authorizationFactory', ['apiFactory', 'sessionFactory', '$state', function (apiFactory, sessionFactory, $state) {
    return {
        isPublisher: function () {
            var user = sessionFactory.get('user');
            if (user && user.type === 'publisher') {
                return true;
            }
        },
        isAdmin: function () {
            var user = sessionFactory.get('user');
            if (user && user.type === 'admin') {
                return true;
            }
        },
        isPublisherAdmin: function () {
            var user = sessionFactory.get('user');
            if (user && user.type === 'publisher_admin') {
                return true;
            }
        },
        isPayee: function () {
            var user = sessionFactory.get('user');
            if (user && user.type === 'payee')
                return true;
            return false;
        },
        isAuthenticated: function () {
            var user = sessionFactory.get('user');
            if (user) return true;
        },
        user: function () {
            return sessionFactory.get('user');
        },
        logoutUser: function () {
            sessionFactory.delete('user');
            return apiFactory.logout()
                .then(
                function () {
                    return "true";
                }
            )
        },
        loginUser: function (user) {
            sessionFactory.set('user', user);
        },
        checkSession: function () {
            var that = this;
            return apiFactory.sessionUser()
                .then(function (user) {
                    that.loginUser(user);
                    return user;
                });
        },
        isAuthorized: function (role) {
            console.log("isAuthorized");
            if (!this.user()) {
                return false;
            }
            if (role && role != this.user().type) {
                return false;
            }

            return true;
        },
        canViewAnalysis : function () {
            if (this.isAdmin())
                return true;
            var currentUser = this.user();
            return (currentUser != null && 'service_ids' in currentUser && currentUser.service_ids.indexOf(1) != -1);
        },
        canViewRoyaltyPayments : function () {
            if (this.isAdmin())
                return true;
            var currentUser = this.user();
            return (currentUser != null && 'service_ids' in currentUser && currentUser.service_ids.indexOf(2) != -1);
        },
        redirectToLandingUrl : function() {
            var user = this.user();
            if (user.type === 'admin')
                $state.go('admin.deals.analysis');
            else if (user.type === 'payee')
                $state.go('payee.dashboard');
            else {
                if (this.canViewAnalysis())
                    $state.go('publisher.deals');
                else if (this.canViewRoyaltyPayments())
                    $state.go('publisher.royalty.upload');
                else if (user.type === 'publisher_admin')
                    $state.go('admin.users.list');
                else
                    $state.go('admin.user', {'id': user.id});
            }
        }
    };
}]);