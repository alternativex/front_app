'use strict';

angular.module('crm.payee')
    .controller('PayeeAnalysisCtrl', function ($scope, $state, ngTableParams, payeeFactory, authorizationFactory, $injector, PublisherDealsCtrlService) {

        $scope.tableParamsConfig = {page: 1,count: 10,sorting: { id: 'desc' }, filter: {payee_code: authorizationFactory.user().code}};
        $injector.invoke(PublisherDealsCtrlService,
            this,
            {$scope: $scope});

//        $scope.analysisReportIframeUrl = payeeFactory.analysisReportIframeUrl(authorizationFactory.user().payment_deal_id);



//        $scope.statuses = ['unreviewed','reviewed','accepted','rejected','pass','lost','contacted','archive'];
//        $scope.etl_statuses = ['processed','error','processing'];
//
//        $scope.$state = $state;
//
//        $scope.searchFor = null;
//        $scope.search = function () {
//            if ($scope.searchFor != null) {
//                $scope.tableParams.$params.filter.name = $scope.searchFor+"|or";
//                $scope.tableParams.$params.filter.writer_name = $scope.searchFor+"|or";
//                $scope.tableParams.$params.filter.writer_email = $scope.searchFor+"|or";
//                $scope.tableParams.$params.filter.writer_phone = $scope.searchFor+"|or";
//            }
//        }
//
//        $scope.tableParams = new ngTableParams(
//            {
//                page: 1,
//                count: 10,
//                sorting: { id: 'desc' },
//                filter: {payee_code: authorizationFactory.user().code}
//            },
//            {
//                total: 0,
//                getData: function ($defer, params) {
//                    payeeFactory.deals(params)
//                        .then(function (data) {
//                            params.total(data.count);
//                            $defer.resolve(data.items);
//                        });
//                }
//            }
//        );
//
//        $scope.deleteDeal = function (id) {
//            var that = this;
//            payeeFactory.dealDelete(id).then(function () {
//                that.tableParams.reload();
//            });
//        }
    });
