'use strict';

angular.module('crm.admin')
    .factory('adminDealsFactory', ['apiFactory', 'RestUrlParamsBuilder', function (apiFactory, RestUrlParamsBuilder)
    {
        return {
            deals: function (params)
            {
                var restUrlParams = RestUrlParamsBuilder.getUrlParams(params.page(), params.count(), params.sorting(), params.filter());
                return apiFactory.deals(restUrlParams);
            },
            dealDelete: function(id) {
                return apiFactory.dealDelete(id);
            },
            crmToken: function() {
                return apiFactory.crmToken();
            }
        };
    }])
    .factory('AdminDealsParentCtrl',function() {
        return function ($scope, $state, $filter, ngTableParams, adminDealsFactory, authorizationFactory) {

            if (!authorizationFactory.canViewAnalysis()) {
                authorizationFactory.redirectToLandingUrl();
            }

            $scope.deals = {};

            $scope.statuses = ['unreviewed','reviewed','accepted','rejected','pass','lost','contacted','archive'];
            $scope.etl_statuses = ['processed','error','processing'];

            $scope.searchFor = null;
            $scope.search = function () {
                if ($scope.searchFor != null) {
                    $scope.tableParams.$params.filter.name = $scope.searchFor+"|or";
                }
            }

            $scope.tableParams = new ngTableParams(
                $scope.tableParamsConfig,
                {
                    total: 0,
                    getData: function ($defer, params) {
                        adminDealsFactory.deals(params)
                            .then(function (data) {
                                params.total(data.count);
                                $defer.resolve(data.items);
                                $scope.deals = data.items;
                            });
                    }
                }
            );

            $scope.deleteDeal = function (id) {
                var that = this;
                adminDealsFactory.dealDelete(id).then(function () {
                    that.tableParams.reload();
                });
            }
        };
    });