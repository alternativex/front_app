'use strict';

angular.module('crm.publisher.directive', [])
    .directive('payeeTable', function() {
        return {
            restrict: 'E',
            templateUrl: 'scripts/publisher/royalty/payees/payees.table.directive.html?v='+APP_VERSION,
            scope: { tableParams: '=', updateEmail: '=', updateEmails: '&', addAdvance: '&', redirectToUrl: '='},
            controller: function ( $scope ) {
                $scope.getProgressStatus = function(advance) {
                    return $scope.isAdvancedActive(advance) ? 'danger' : 'success';
                };

                $scope.isAdvancedActive = function(advance) {
                    return advance.amount > advance.advance_payments_sum;
                }
            }
        };
    })
    .directive('advance', function() {
        return {
            restrict: 'E',
            templateUrl: 'scripts/publisher/royalty/payees/advance/advance.directive.html?v='+APP_VERSION,
            scope: { advance: '='}
        };
    });