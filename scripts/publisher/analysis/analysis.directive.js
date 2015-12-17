'use strict';

angular.module('crm.publisher').
	directive('royaltyProviders', [function() {
      return {
          restrict: 'E',
          scope: {
			      providers: '='
    			},
          replace:true,
					template: '<span class="animate-repeat" ng-repeat="provider in providers">{{provider.provider}} <royalty-pdfs files="analysis.dealFiles | withPdf : provider.id"></royalty-pdfs><br/></span>'
      }
	  }]).directive('royaltyPdfs', [function() {
      return {
          restrict: 'E',
          scope: {
            files: '='
          },
          replace:true,
          template: '<span ng-show="files.length>0">(<span class="animate-repeat" ng-repeat="file in files"><a href="{{file.pdf_url}}" target="_blank">{{file.period_year_quarter}}</a><span ng-show="! $last">, </span></span>)</span>'
      }
    }]).directive('logiAnalysis', [function() {
        return {
            restrict: 'E',
            scope: {
                analysis: '='
            },
            replace:true,
            template: '<div id="logi-report"></div>',
            link: function(scope, el) {
                scope.$watch('analysis.deal.id', function(val){
                    if (val) {
                        var options = {};
                        options.applicationUrl = 'http://208.70.244.220:8080/RoyaltyExchange';
                        options.report = 'PrimaryLanding';
                        options.autoSizing = 'all';
                        options.linkParams = {
                            'deal_id': scope.analysis.deal.id,
                            'rdSecureKey':'secure',
                            'db_mode':2};
                        var reportObj = EmbeddedReporting.create('logi-report',options);
                        reportObj.loadReport();
                    }
                });
            }
        }
    }]);
