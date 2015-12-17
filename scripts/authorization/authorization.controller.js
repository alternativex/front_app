'use strict';

angular.module('crm.auth')
    .controller('AuthorizationCtrl', function (sessionFactory, authorizationFactory) {

        this.isPublisher = function () {
            return authorizationFactory.isPublisher();
        }

        this.isAdmin = function () {
            return authorizationFactory.isAdmin();
        }

        this.isPublisherAdmin = function () {
            return authorizationFactory.isPublisherAdmin();
        }

        this.isPayee = function () {
            return authorizationFactory.isPayee();
        }

        this.isAuthenticated = function () {
            return authorizationFactory.isAuthenticated();
        }

        this.userName = function () {
            var currentUser = authorizationFactory.user();
            if (currentUser)
                if (currentUser.name.length > 15)
                    return currentUser.name.substring(0,15)+"...";
                else
                    return currentUser.name;

        }

        this.userId = function () {
            var currentUser = authorizationFactory.user();
            if (currentUser) {
                return currentUser.id;
            }
        }

        this.companyId = function () {
            var currentUser = authorizationFactory.user();
            if (currentUser) {
                return currentUser.company_id;
            }
        }

        this.canViewAnalysis = function () {
            return authorizationFactory.canViewAnalysis();
        }

        this.canViewRoyaltyPayments = function () {
            return authorizationFactory.canViewRoyaltyPayments();
        }
    });