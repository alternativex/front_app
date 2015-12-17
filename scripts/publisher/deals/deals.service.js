'use strict';

angular.module('crm.publisher')
    .factory('publisherDealsFactory', ['apiFactory', 'RestUrlParamsBuilder', function(apiFactory, RestUrlParamsBuilder) {
        return {
            deals: function(params) {
                var restUrlParams = RestUrlParamsBuilder.getUrlParams(params.page(), params.count(), params.sorting(), params.filter());
                return apiFactory.deals(restUrlParams);
            }
        };
    }])
    .factory('PublisherDealsCtrlService',function(){
        return function ($scope, $state, $filter, ngTableParams, publisherDealsFactory, authorizationFactory) {

            if (!authorizationFactory.canViewAnalysis() && !authorizationFactory.isPayee()) {
                authorizationFactory.redirectToLandingUrl();
            }

            $scope.statuses = ['unreviewed','reviewed','accepted','rejected','pass','lost','contacted','archive'];
            $scope.etl_statuses = ['processed','error','processing'];

            $scope.$state = $state;
            $scope.loggedUser = authorizationFactory.user();

            $scope.searchFor = null;
            $scope.search = function () {
                if ($scope.searchFor != null) {
                    $scope.tableParams.$params.filter.name = $scope.searchFor+"|or";
                    $scope.tableParams.$params.filter.writer_name = $scope.searchFor+"|or";
                    $scope.tableParams.$params.filter.writer_email = $scope.searchFor+"|or";
                    $scope.tableParams.$params.filter.writer_phone = $scope.searchFor+"|or";
                }
            }

            $scope.tableParams = new ngTableParams(
                $scope.tableParamsConfig,
                {
                    total: 0,
                    getData: function ($defer, params) {
                        publisherDealsFactory.deals(params)
                            .then(function (data) {
                                params.total(data.count);
                                $defer.resolve(data.items);
                            });
                    }
                }
            );

//            $scope.deleteDeal = function (id) {
//                var that = this;
//                publisherDealsFactory.dealDelete(id).then(function () {
//                    that.tableParams.reload();
//                });
//            }
        };
    });