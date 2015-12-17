'use strict';

angular.module('crm.publisher')
    .controller('PublisherSetttingsCtrl', function ($scope, $location, publisherSettingsFactory) {

    this.updateSettings = function(){
      publisherSettingsFactory.update(updateUser);
    }

});