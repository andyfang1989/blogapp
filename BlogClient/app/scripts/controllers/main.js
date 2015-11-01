'use strict';

/**
 * @ngdoc function
 * @name blogClientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the blogClientApp
 */
angular.module('blogClientApp')
  .controller('MainCtrl', function ($scope, $http) {
     $scope.getPosts = function() {
       $http.get('apps/getPosts')
           .success(function(data) {
             $scope.posts = data;
           });
     };

     $scope.getPosts();

   });

