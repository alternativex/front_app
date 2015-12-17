'use strict';

/* Directives */
angular.module('crm.amchart.directive', []).
    directive('serialChart', [function() {
        return {
            restrict: 'E',
            replace:true,
            require: 'ngModel',
            scope: {
                config: '=',
                model: '=ngModel'
            },

            template: '<div id="serial-chart" style="min-width: 310px; height: 300px; margin: 0 auto"></div>',
            link: function ($scope, element, attrs) {
                $scope.$watch('model', function(value) {
                    var initChart = function(data) {
                        chartConfig['dataProvider'] = data;
                        AmCharts.makeChart('serial-chart', chartConfig);
                    };
                    if (value !== undefined){
                        initChart(value);
                    }
                });

                var chartConfig = {
                    "dataDateFormat": "YYYY-MM-DD hh:mm:ss",
                        "type": "serial",
                        "theme": "light",
                        "pathToImages": "http://www.amcharts.com/lib/3/images/",
                        "valueAxes": [{
                        "axisAlpha": 0.2,
                        "dashLength": 1,
                        "position": "left",
                        "minimum":0
                    }],
                    "mouseWheelZoomEnabled":false,
                    "graphs": [{
                        "id":"g1",
                        "balloonText": "[[category]]<br /><b><span style='font-size:14px;'>amount: $[[amount]]</span></b>",
                        "bullet": "round",
                        "bulletBorderAlpha": 1,
                        "bulletColor":"#FFFFFF",
                        "hideBulletsCount": 50,
                        "title": "red line",
                        "valueField": "amount",
                        "useLineColorForBulletBorder":true
                    }],
                        "chartScrollbar": {
                        "autoGridCount": true,
                            "graph": "g1",
                            "scrollbarHeight": 40
                    },
                    "chartCursor": {
                        "cursorPosition": "mouse"
                    },
                    "categoryField": "date",
                    "categoryAxis": {
                        "equalSpacing":true,
                        "parseDates": false,
                        "axisAlpha": 0,
                        "gridAlpha": 0,
                        "inside": false,
                        "labelRotation":45,
                        "minPeriod":"MM",
                        "tickLength": 0
                    }
                }
            }
        }
    }]).directive('barChart', [function() {
        return {
            restrict: 'E',
            replace:true,
            require: 'ngModel',
            scope: {
                config: '=',
                model: '=ngModel'
            },

            template: '<div id="bar-chart" style="min-width: 310px; height: 300px; margin: 0 auto"></div>',
            link: function ($scope, element, attrs) {
                $scope.$watch('model', function(value) {
                    var initChart = function(data) {
                        chartConfig['dataProvider'] = data;
                        AmCharts.makeChart('bar-chart', chartConfig);
                    };
                    if (value !== undefined){
                        initChart(value);
                    }
                });

                var chartConfig = {
                    "type": "serial",
                    "theme": "light",
                    "valueAxes": [{
                        "gridColor":"#FFFFFF",
                        "gridAlpha": 0.2,
                        "dashLength": 0
                    }],
                    "gridAboveGraphs": true,
                    "startDuration": 1,
                    "graphs": [{
                        "balloonText": "[[category]]<br /><b><span style='font-size:14px;'>amount: $[[amount]]</span></b>",
                        "fillAlphas": 0.8,
                        "lineAlpha": 0.2,
                        "type": "column",
                        "valueField": "amount"
                    }],
                    "chartCursor": {
                        "categoryBalloonEnabled": false,
                        "cursorAlpha": 0,
                        "zoomable": false
                    },
                    "categoryField": "date",
                    "categoryAxis": {
                        "equalSpacing":true,
                        "parseDates": false,
                        "axisAlpha": 0,
                        "gridAlpha": 0,
                        "inside": false,
                        "labelRotation":45,
                        "minPeriod":"MM",
                        "tickLength": 0
                    },
                    "exportConfig":{
                        "menuTop": 0,
                        "menuItems": [{
                            "icon": '/lib/3/images/export.png',
                            "format": 'png'
                        }]
                    }                }
            }
        }
    }]);