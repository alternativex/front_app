'use strict';

angular.module('crm.publisher')
    .filter("withPdf", function () {
        return _.memoize(
            function (files, providerId, last) {
                last = typeof last !== 'undefined' ? last : 2;
        		var filtered = files.filter(        			
        			function(file){        				
        				if (file.has_pdf && file.royalty_provider_id == providerId) {
        					return file;
        				}
        			}
        		)
                return filtered.slice(0,last);
            }, 
            function(x) {
                return JSON ? JSON.stringify(arguments) : Array.prototype.slice.call(arguments).toString()
            }
        );
    });