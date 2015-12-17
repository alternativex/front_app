angular
    .module('crm.service', [])
    .factory('RestUrlParamsBuilder', [function() {
        return {
            getUrlParams: function(page, count, sorting, filter) {
                var paramsUrl = '_offset='+((page-1)*count)+'&_limit='+count;
                paramsUrl += (sorting != undefined && Object.keys(sorting).length > 0) ? '&_sort='+Object.keys(sorting)[0]+':'+sorting[Object.keys(sorting)[0]] : '';
                if (Object.keys(filter).length > 0) {
                    for (var key in filter) {
                        if (filter[key] != undefined &&
                            filter[key].toString().trim() != '' &&
                            filter[key].toString().trim() != '|or') {
                            paramsUrl += '&_filter[]=' + key + ':' + filter[key];
                        }
                    }
                }
                return paramsUrl;
            }
        }
    }])