'use strict';

angular.module('crm.api',['crm.configuration'])
.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $httpProvider.defaults.withCredentials = true;
}])
.factory('apiFactory', ['$q', '$http', 'SERVER_BASE', 'CRM_SERVER_BASE', function(q, $http, SERVER_BASE, CRM_SERVER_BASE) {
    return {
        login: function(email, password) {
            return $http.post(SERVER_BASE + 'api/auth/login', {email:email, password:password}).then(function(response){return response.data});
        },
        logout: function(email, password) {
            return $http.post(SERVER_BASE + 'api/auth/logout', {},{withCredentials:true}).then(function(response){return response.data});
        },
        sessionUser: function(){
          return $http.get(SERVER_BASE + 'api/users/me', {withCredentials:true}).then(function(response){return response.data});
        },
        deals: function(restUrlParams) {
            return $http.get(SERVER_BASE + 'api/deal?_with=company&'+restUrlParams, {withCredentials:true}).then(function(response){return response.data});
        },
        payeeDeals: function(payeeCode) {
            return $http.get(SERVER_BASE + 'api/deal?_filter[]=payee_code:'+payeeCode, {withCredentials:true}).then(function(response){return response.data});
        },
        deal: function(dealId) {
            return $http.get(SERVER_BASE + 'api/deal/'+dealId, {withCredentials:true}).then(function(response){return response.data.item});  
        },
        dealWithStreamFiles:function(dealId) {
            return $http.get(SERVER_BASE + 'api/deal/'+dealId+'?_with=royaltyStreamFiles', {withCredentials:true}).then(function(response){return response.data.item});
        },
        dealDelete: function(id) {
            return $http.delete(SERVER_BASE + 'api/deal/'+id, {withCredentials:true}).then(function(response){return response.data.item});
        },
        userTypes: function() {
            return $http.get(SERVER_BASE + 'api/user/method/types', {withCredentials:true}).then(function(response){return response.data.response});  
        },
        userCreate:function(user) {
            return $http.post(SERVER_BASE + 'api/user', user).then(function(response){return response.data.item});
        },
        userUpdate:function(user) {
            return $http.put(SERVER_BASE + 'api/user/'+user.id, user).then(function(response){return response.data.item});
        },
        dealStatus: function() {
            return $http.get(SERVER_BASE + 'api/deal/method/statuses', {withCredentials:true}).then(function(response){return response.data.response});  
        },
        dealUpdate:function(deal) {
            return $http.put(SERVER_BASE + 'api/deal/'+deal.id, deal).then(function(response){return response.data.item});
        },
        dealRoyaltiesAnalysisStats:function(dealId) {
            return $http.get(SERVER_BASE + 'api/deal/'+dealId+'/method/stats', {withCredentials:true}).then(function(response){return response.data.response});  
        },
        dealRoyaltiesAnalysisProviders:function(dealId) {
            return $http.get(SERVER_BASE + 'api/deal/'+dealId+'/method/providers', {withCredentials:true}).then(function(response){return response.data.response});
        },
        dealRoyaltiesEarnedByPerformanceDate:function(dealId) {
            return $http.get(SERVER_BASE + 'api/deal/'+dealId+'/method/royaltiesEarnedByPerformanceDate', {withCredentials:true}).then(function(response){return response.data.response});  
        },
        users:function(restUrlParams){
            return $http.get(SERVER_BASE + 'api/user?_filter[]=type:!payee&'+restUrlParams, {withCredentials:true}).then(function(response){return response.data});
        },
        companies:function(restUrlParams){
            return $http.get(SERVER_BASE + 'api/company?'+restUrlParams, {withCredentials:true}).then(function(response){return response.data});
        },
        companiesAll:function(restUrlParams){
            return $http.get(SERVER_BASE + 'api/company/method/all', {withCredentials:true}).then(function(response){return response.data});
        },
        companyCreate:function(company) {
            return $http.post(SERVER_BASE + 'api/company', company).then(function(response){return response.data.item});
        },
        companyUpdate:function(company) {
            return $http.put(SERVER_BASE + 'api/company/'+company.id, company).then(function(response){return response.data.item});
        },
        company: function(id) {
            return $http.get(SERVER_BASE + 'api/company/'+id, {withCredentials:true}).then(function(response){return response.data.item});
        },
        deleteUser: function(id) {
            return $http.delete(SERVER_BASE + 'api/user/'+id, {withCredentials:true}).then(function(response){return response.data.item});
        },
        user: function(id) {
            return $http.get(SERVER_BASE + 'api/user/'+id, {withCredentials:true}).then(function(response){return response.data.item});
        },
        userByPayeeCode: function(payeeCode) {
            return $http.get(SERVER_BASE + 'api/user/'+payeeCode+'/method/userByPayeeCode', {withCredentials:true}).then(function(response){return response.data.response});
        },
        credit: function(id) {
            return $http.get(SERVER_BASE + 'api/credit/'+id, {withCredentials:true}).then(function(response){return response.data.item});
        },
        creditUpdate:function(credit) {
            return $http.put(SERVER_BASE + 'api/credit/'+credit.id, credit).then(function(response){return response.data.item});
        },
        credits: function() {
            return $http.get(SERVER_BASE + 'api/credit/', {withCredentials:true}).then(function(response){return response.data.item});
        },
        royaltyPaymentFiles:function(restUrlParams){
            return $http.get(SERVER_BASE + 'api/royaltyPaymentFile?'+restUrlParams, {withCredentials:true}).then(function(response){return response.data});
        },
        payees:function(restUrlParams){
            return $http.get(SERVER_BASE + 'api/user?_with=advances&_filter[]=type:payee&'+restUrlParams, {withCredentials:true}).then(function(response){return response.data});
        },
        payeesWithEmail:function(restUrlParams){
            return $http.get(SERVER_BASE + 'api/payeeCompany?_with=advances&_select=user.*&_filter[]=user.type:payee&_filter[]=user.email:!null&'+restUrlParams, {withCredentials:true}).then(function(response){return response.data});
        },
        payeesWithoutEmail:function(restUrlParams){
            return $http.get(SERVER_BASE + 'api/payeeCompany?_with=advances&_select=user.*&_filter[]=user.type:payee&_filter[]=user.email:null&'+restUrlParams, {withCredentials:true}).then(function(response){return response.data});
        },
        royaltyPayments:function(restUrlParams){
            return $http.get(SERVER_BASE + 'api/royaltyPayment?_with=payeePayment&'+restUrlParams, {withCredentials:true}).then(function(response){return response.data});
        },
        services:function(){
            return $http.get(SERVER_BASE + 'api/service', {withCredentials:true}).then(function(response){return response.data});
        },
        companyServiceCreate:function(companyService) {
            return $http.post(SERVER_BASE + 'api/companyService', companyService).then(function(response){return response.data.item});
        },
        companyServiceDelete: function(id) {
            return $http.delete(SERVER_BASE + 'api/companyService/'+id, {withCredentials:true}).then(function(response){return response.data.item});
        },
        getAmountReceivedByDateFrom:function() {
            return $http.get(SERVER_BASE + 'api/royaltyPayment/method/amountReceivedByDateFrom', {withCredentials:true}).then(function(response){return response.data.response});
        },
        getAmountEarnedByDateFrom:function() {
            return $http.get(SERVER_BASE + 'api/royaltyPayment/method/amountEarnedByDateFrom', {withCredentials:true}).then(function(response){return response.data.response});
        },
        downloadNoEmailUrl:function() {
            return SERVER_BASE + 'api/user/download/noEmailUsers';
        },
        downloadUnpaidStatementsUrl:function() {
            return SERVER_BASE + 'api/payeePayment/download/exportUnpaidStatements';
        },
        downloadUnpaidPayeeStatementsUrl:function(payeeCode) {
            return SERVER_BASE + 'api/payeePayment/download/exportUnpaidPayeeStatements?payeeCode=' + payeeCode;
        },
        royaltyPaymentFileUploadUrl:function() {
            return SERVER_BASE + 'api/royaltyPaymentFile/upload';
        },
        payeesBatchUpdateUrl:function() {
            return SERVER_BASE + 'api/user/upload';
        },
        createPayeePayment: function(payment) {
            return $http.post(SERVER_BASE + 'api/payeePayment/method/createPayeePayment', payment).then(function(response){return response.data.item});
        },
        royaltyPaymentFileDownloadUrl:function(id) {
            return SERVER_BASE + 'api/royaltyPaymentFile/'+id+'/download/downloadFromDropbox';
        },

        royaltyPaymentFileDownloadHeaderUrl:function(id) {
            return SERVER_BASE + 'api/royaltyPaymentFile/download/downloadHeadersFile';
        },
        analysisReportIframeUrl: function(dealId, secretKey) {
            return 'https://royaltysnapshot.com:8443/RoyaltyExchange/rdPage.aspx?db_mode=2'+
                '&deal_id='+dealId+
                '&rdSecureKey='+secretKey;
        },
        analysisNewReportIframeUrl: function(token) {
            return "https://royaltysnapshot.com/calculator/?embed=1&payee_id="+token+"#/wizard/basic"
        },

        logiSecretKey:function(){
            return $http.get(SERVER_BASE + 'api/logi/secretKey', {withCredentials:true}).then(function(response){
                return response.data.secretKey});
        },

        batchUpdateEmails: function(users) {
            return $http.post(SERVER_BASE + 'api/user/method/batchUpdateEmails', users).then(function(response){return response.data.item});
        },
        payeesCounts: function() {
            return $http.get(SERVER_BASE + 'api/user/method/payeesCounts', {withCredentials:true}).then(function(response){return response.data.response});
        },
        payeePayments:function(restUrlParams){
            return $http.get(SERVER_BASE + 'api/payeePayment?_with=payee,client&'+restUrlParams, {withCredentials:true}).then(function(response){return response.data});
        },
        unpaidPayeePayments:function(restUrlParams){
            return $http.get(SERVER_BASE + 'api/payeePayment/unpaidPayeePayments?'+restUrlParams, {withCredentials:true}).then(function(response){return response.data});
        },
        payeePaymentsGroupedByMarkedAsPaid:function(restUrlParams){
            return $http.get(SERVER_BASE + 'api/payeePayment?_group_by=marked_as_paid_at&_select=sum(amount) as amount,status,marked_as_paid_at,payment_date,year,quarter,month&'+restUrlParams, {withCredentials:true}).then(function(response){return response.data});
        },
        markAllPayeePaymentsAsPaid: function(payeePayment) {
            return $http.post(SERVER_BASE + 'api/payeePayment/method/markAllAsPaid', payeePayment).then(function(response){return response.data.item});
        },
        detachFromPayeePayment: function(ids) {
            return $http.post(SERVER_BASE + 'api/royaltyPayment/method/detachFromPayeePayment', ids).then(function(response){return response.data.item});
        },
        payeePaymentsTotals: function() {
            return $http.get(SERVER_BASE + 'api/user/method/paymentsTotals', {withCredentials:true}).then(function(response){return response.data.response});
        },
        csvPaymentsDownloadUrl: function() {
            return SERVER_BASE + 'api/royaltyPayment/download/csv';
        },
        xlsPaymentsDownloadUrl: function() {
            return SERVER_BASE + 'api/royaltyPayment/download/xls';
        },
        addAdvance: function(advance) {
            return $http.post(SERVER_BASE + 'api/advance', advance).then(function(response){return response.data.item});
        },
        advance: function(advanceId) {
            return $http.get(SERVER_BASE + 'api/advance/'+advanceId).then(function(response){return response.data.item});
        },
        advancePayments: function(restUrlParams) {
            return $http.get(SERVER_BASE + 'api/advancePayment?_with=payeePayment&'+restUrlParams, {withCredentials:true}).then(function(response){return response.data});
        },
        advances: function(restUrlParams) {
            return $http.get(SERVER_BASE + 'api/advance?'+restUrlParams, {withCredentials:true}).then(function(response){return response.data});
        },
        royaltyLifeTimeValueUrl: function(amount) {
            return CRM_SERVER_BASE + 'public/royaltyLifeTimeValue/?amount='+amount;
        },
        sendAdviserContactEmail: function(dealId) {
            return $http.get(SERVER_BASE + 'api/deal/'+dealId+'/method/sendAdviserContactEmail', {withCredentials:true}).then(function(response){return response.data.response});
        },
        payeePaymentsBatchUpdateUrl:function() {
            return SERVER_BASE + 'api/payeePayment/upload';
        },
        crmToken:function() {
            return $http.get(SERVER_BASE + 'api/crm/token', {withCredentials:true}).then(
                function(response)
                {
                    return response.data;
                }
            );
        }
    };
}]);