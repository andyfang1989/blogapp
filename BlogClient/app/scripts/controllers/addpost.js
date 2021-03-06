'use strict';

/**
 * @ngdoc function
 * @name blogClientApp.controller:AddpostCtrl
 * @description
 * # AddpostCtrl
 * Controller of the blogClientApp
 */
angular.module('blogClientApp')
  .controller('AddpostCtrl', function ($scope, $http, alertService, $location) {

   $scope.post = function() {
     var payload = {
       subject : $scope.subject,
       content: $scope.content
     };
     $http.post('/apps/post', payload)
         .error(function(data, status) {
           if(status === 400) {
             angular.forEach(data, function(value, key) {
               if(key === 'subject' || key === 'content') {
                 alertService.add('danger', key + ' : ' + value);
               } else {
                 alertService.add('danger', value.message);
               }
             });
           } else if(status === 401) {
             $location.path('/login');
           } else if(status === 500) {
             alertService.add('danger', 'Internal server error!');
           } else {
             alertService.add('danger', data);
           }
         })
         .success(function(data) {
           $scope.subject = '';
           $scope.content = '';
           alertService.add('success', data.success.message);
         });
   };
 });
