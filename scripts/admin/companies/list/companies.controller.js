'use strict';

angular.module('crm.admin')
    .controller('AdminCompaniesCtrl', function ($scope, $state, $filter, ngTableParams, adminCompaniesFactory) {

        $scope.searchFor = null;
        $scope.search = function () {
            if ($scope.searchFor != null) {
                $scope.tableParams.$params.filter.name = $scope.searchFor+"|or";
            }
        }

        $scope.updateSelection = function($event, companyId, serviceId, companyServices) {
            var checkbox = $event.target;
            (checkbox.checked ?
                adminCompaniesFactory.companyServiceCreate({"company_id" : companyId, "service_id" : serviceId}) :
                adminCompaniesFactory.companyServiceDelete($scope.companyServiceId(companyServices, companyId, serviceId)));
            $state.go($state.current, {}, {reload: true});
        };

        $scope.companyServiceId = function(companyServices, companyId, serviceId){
            for (var i = 0; i < companyServices.length; i++)
                if (companyServices[i].service_id == serviceId && companyServices[i].company_id == companyId)
                    return companyServices[i].id;
            return null;
        };

        $scope.isChecked = function(companyServices, serviceId){
            for (var i = 0; i < companyServices.length; i++)
                if (companyServices[i].service_id == serviceId)
                    return true;
            return false;
        };

        $scope.services = {};
        adminCompaniesFactory.services().then(function (data) {
            $scope.services = data.items;
        });

        $scope.tableParams = new ngTableParams(
            {
                page: 1,
                count: 10,
                sorting: { id: 'desc' }
            },
            {
                total: 0,
                getData: function ($defer, params) {
                    adminCompaniesFactory.companies(params)
                        .then(function (data) {
                            params.total(data.count);
                            $defer.resolve(data.items);
                        });
                }
            }
        );
});
