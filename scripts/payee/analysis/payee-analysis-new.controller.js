'use strict';

angular.module('crm.payee')
    .controller('PayeeNewAnalysisCtrl', function ($scope, $state, ngTableParams, payeeFactory, authorizationFactory) {

        $scope.analysisNewReportIframeUrl = payeeFactory.analysisNewReportIframeUrl(authorizationFactory.user().authorization_token);

    });
