'use strict';

angular.module('crm.publisher')
    .controller('PaymentFileUploadFormCtrl', function ($scope, FileUploader, authorizationFactory, paymentFileUploadFormFactory,
                                                       royaltyPaymentFilesFactory) {

        if (!authorizationFactory.canViewRoyaltyPayments()) {
            authorizationFactory.redirectToLandingUrl();
        }

        $scope.years = [];
        $scope.quarters = [1,2,3,4];
        $scope.halfYears = [1,2];
        $scope.months = [1,2,3,4,5,6,7,8,9,10,11,12];
        var currentYear = new Date().getFullYear();
        for (var i = currentYear ; i > currentYear -10; i--)
            $scope.years.push(i);

        $scope.formData = {year: currentYear, quarter: '', month: '', halfYear: ''};
        $scope.downloadHeaderUrl = function()  {return royaltyPaymentFilesFactory.royaltyPaymentFileDownloadHeaderUrl()};

        var uploader = $scope.uploader = new FileUploader({
            url: paymentFileUploadFormFactory.royaltyPaymentFileUploadUrl()
        });

        uploader.filters.push({
            name: 'customFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|comma-separated-values|csv|'.indexOf(type) !== -1;
            }
        });


        uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
        };
        uploader.onAfterAddingFile = function(fileItem) {
        };
        uploader.onAfterAddingAll = function(addedFileItems) {
        };
        uploader.onBeforeUploadItem = function(item) {
            item.formData = [$scope.formData];
        };
        uploader.onProgressItem = function(fileItem, progress) {
        };
        uploader.onProgressAll = function(progress) {
        };
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
        };
        uploader.onErrorItem = function(fileItem, response, status, headers) {
        };
        uploader.onCancelItem = function(fileItem, response, status, headers) {
        };
        uploader.onCompleteItem = function(fileItem, response, status, headers) {
        };
        uploader.onCompleteAll = function() {
        };
    });
