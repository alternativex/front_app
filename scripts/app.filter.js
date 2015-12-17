'use strict';

angular.module('crm.filter',[])
    .filter("dealStatus", function () {
        return function (input) {            
            var dealStatus = ['Unreviewed', 'Reviewed', 'Accepted', 'Rejected', 'Pass', 'Lost','Contacted'];
            return dealStatus[input];
        }
    }).filter("dealEtlStatus", function () {
        return function (input) {            
            var dealEtlStatus = ['Success', 'Failed'];
            return dealEtlStatus[input];
        }
    }).filter("paymentDate", function () {
        return function (file) {

            if (!file) {
                return ""
            }

            if (file.half_year > 0) {
                return file.year + '-H' + file.half_year;
            }else if (file.quarter > 0) {
                return file.year + '-Q' + file.quarter;
            }else if (file.month>0) {
                return file.year + '-' + file.month;
            }

            return file.year
        }
    });


