'use strict';

/**
 * @ngdoc function
 * @name blogClientApp.controller:AlertsCtrl
 * @description
 * # AlertsCtrl
 * Controller of the blogClientApp
 */
angular.module('blogClientApp')
  .controller('AlertsCtrl', function ($scope, alertService) {
     $scope.alerts = alertService.get();
 });
