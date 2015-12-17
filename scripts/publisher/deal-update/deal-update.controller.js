'use strict';

angular.module('crm.publisher')
    .controller('PublisherDealUpdateCtrl', function ($scope, $state, publisherDealUpdateFactory) {

        $scope.deal = [];
        $scope.dealStatus = [];

//        this.init = function () {
//            var that = this;
            publisherDealUpdateFactory.dealStatus()
                .then(function (dealStatus) {
                    $scope.dealStatus = dealStatus;
                    return publisherDealUpdateFactory.deal($state.params.dealId);
                })
                .then(function (deal) {
                    $scope.deal = deal;
                });
//        }

        $scope.update = function () {
            $scope.submitted = true;

            if ($scope.frmDeal.$invalid) {
                return;
            }

            if (!publisherDealUpdateFactory.dealUpdate(this.deal)) {
                $scope.error = true;
                return;
            }
            if ($state.params.redirectTo != null)
                $state.go($state.params.redirectTo);
            else
                $state.go('publisher.deals');
        }

//        this.init();
    });
