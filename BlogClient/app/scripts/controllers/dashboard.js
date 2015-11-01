'use strict';

/**
 * @ngdoc function
 * @name blogClientApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the blogClientApp
 */
angular.module('blogClientApp')
  .controller('DashboardCtrl', function ($scope, $log, $http, alertService, $location) {

     $scope.loadPosts = function() {
       $http.get('/apps/userposts')
           .error(function(data, status) {
             if(status === 401) {
               $location.path('/login');
             } else {
               alertService.add('danger', data.error.message);
             }
           })
           .success(function(data) {
             $scope.posts = data;
           });
     };

     $scope.loadPosts();
   });
