'use strict';

angular.module('crm.publisher')
    .controller('PublisherAnalysisCtrl', function ($scope, $location, $state, publisherAnalysisFactory) {

        this.providers = [];

        this.royaltiesByPerformanceDate = [];

        this.analysisReportIframeUrl = null;

        this.royaltiesStats = {};

        this.dealFiles = [];

        this.deal = {};

        this.rdSecureKey = null;

        this.init = function () {
            var that = this;

            publisherAnalysisFactory.getProviders($state.params.dealId)
                .then(function (providers) {
                    that.providers = providers;
                });


            publisherAnalysisFactory.getProviders($state.params.dealId)
                .then(function (providers) {
                    that.providers = providers;
                });

            publisherAnalysisFactory.getRoyaltiesAnalysisStats($state.params.dealId)
                .then(function (royaltiesStats) {
                    that.royaltiesStats = royaltiesStats
                });

            publisherAnalysisFactory.getDeal($state.params.dealId)
                .then(function (deal) {
                    that.deal = deal;
                    that.dealFiles = deal['royalty_stream_files'];
                    return publisherAnalysisFactory.getLogiSecretKey();
                }).then(function (key) {
                    that.rdSecureKey = key;
                });

        }

        this.init();
    });