'use strict';

angular.module('crm.publisher')
    .controller('PublisherCreditsCtrl', function ($scope, $state, adminCreditsFactory) {

        $scope.company = {};

        adminCreditsFactory.company($state.params.companyId)
            .then(function (company) {
                $scope.company = company;
            });
    });
