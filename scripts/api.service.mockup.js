'use strict';

angular.module('crm.api',[]).factory('apiFactory', ['$q', function(q) {

  	var deals = [];
		deals.push({publisher_name:'Amazon', publisher_id:1, id:1,name:'b',writer_name:'alin',writer_email:'alin@eloquentix.com',writer_phone:'+019196002',percentage:100,created_at:'2014-01-01',status:0,etl_status:0});
		deals.push({publisher_name:'Amazon', publisher_id:1, id:2,name:'xxx1',writer_name:'alin',writer_email:'alin@eloquentix.com',writer_phone:'+019196002',percentage:100,created_at:'2014-01-01',status:0,etl_status:0});
		deals.push({publisher_name:'Amazon', publisher_id:1, id:3,name:'a',writer_name:'alin',writer_email:'alin@eloquentix.com',writer_phone:'+019196002',percentage:100,created_at:'2014-01-01',status:0,etl_status:0});

    var users = [];
    users.push({id:1,name:'Alin Vilcu as admin',password:'a',type:0,email:'a@a.com'},
               {id:2,name:'Alin Vilcu',password:'p',type:1,email:'p@p.com'});    


    var dealStatus = [{id:0,name:'Unreviewed'},
                {id:1,name:'Reviewed'},
                {id:2,name:'Accepted'},
                {id:3,name:'Rejected'},
                {id:4,name:'Pass'},
                {id:5,name:'Lost'},
                {id:6,name:'Contacted'}];


    var dealRoyaltiesAnalysisStats = {last_12_month_avg: 3848.56, top_5_song_avg:166.39};                

    var dealRoyaltiesAnalysisProviders = [{provider:'IODA', share:'Artist\'s Share', type:'Mechanical'},
                    {provider:'Orchard', share:'Artist\'s Share', type:'Mechanical'}];

    var dealRoyaltiesAnalysisPdfs = [{date:'11/11/2014',url:'xxx.pdf',name:'xxx.pdf'},
                    {date:'11/11/2015',url:'yyy.pdf',name:'yyy.pdf'}];

    var dealRoyaltiesEarnedByPerformanceDate = [{date:'Q1 2014', amount:1000}];

    return {
        login: function(email, password) {
            var deferred = q.defer();
            for (var i=0; i<users.length; i++){
                if (users[i].email === email && users[i].password === password){
                    console.log(email);
                    deferred.resolve(users[i]);                    
                    return deferred.promise;
                }
            }      
            deferred.reject('Authentication failed');     
            return deferred.promise;
        },

        userUpdate: function(user) {
            for (var i=0; i<users.length; i++){
                if (users[id] == user.id){
                    users[id] = user;
                }
            }           
        },

        deals: function() {
            var deferred = q.defer();
            deferred.resolve(deals);                    
        	return deferred.promise;
        },

        deal: function(dealId) {
            var deferred = q.defer();
            for (var i=0; i<deals.length; i++){                
                if (deals[i].id == dealId){
                    deferred.resolve(deals[i]);
                    return deferred.promise;
                }
            }        	
        },

        dealDelete: function(id) {
            var deferred = q.defer();
            for (var i=0; i<deals.length; i++){
                if (deals[i].id == id){
                    deals.splice(i, 1);
                    deferred.resolve();
                    break; 
                }
            }
            return deferred.promise;
        },   

        dealStatus: function() {
            var deferred = q.defer();
            deferred.resolve(dealStatus);
            return deferred.promise;
        },

        dealUpdate:function(deal) {
            var deferred = q.defer();
            for (var i=0; i<deals.length; i++){
                if (deals[i].id == deal.id){
                    deals[i] = deal;
                    deferred.resolve(deals[i]);
                }
            }
            return deferred.promise;
        },

        dealRoyaltiesAnalysisStats:function(dealId) {
            var deferred = q.defer();
            deferred.resolve(dealRoyaltiesAnalysisStats);
            return deferred.promise;
        },

        dealRoyaltiesAnalysisProviders:function(dealId) {
            var deferred = q.defer();
            deferred.resolve(dealRoyaltiesAnalysisProviders);
            return deferred.promise;
        },

        dealRoyaltiesAnalysisPdfs:function(dealId) {
            var deferred = q.defer();
            deferred.resolve(dealRoyaltiesAnalysisPdfs);
            return deferred.promise;
        },

        dealRoyaltiesEarnedByPerformanceDate:function(dealId) {
            var deferred = q.defer();
            deferred.resolve(dealRoyaltiesEarnedByPerformanceDate);
            return deferred.promise;
        }
    };
}]);