'use strict';

angular.module('crm.publisher')
    .controller('AriaRunDealsCtrl', function ($scope, adminDealsFactory) {

        $scope.iframeUrl = "https://royaltysnapshot.com/crm/index.php/externalPublisherAdmin/analysis/?model=WpGuruUser&id=10&token=";
        adminDealsFactory.crmToken().then(function(token) {
            $scope.iframeUrl += token;
        });

    });
