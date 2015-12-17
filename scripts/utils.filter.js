'use strict';

angular.module('crm.utils.filter',[])
    .filter('range', function () {
        return function (input, min, max) {
            for (var i=min; i<=max; i++){
                input.push(i);
            }
            return input;
        };
    });