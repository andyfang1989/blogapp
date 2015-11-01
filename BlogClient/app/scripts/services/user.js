'use strict';

/**
 * @ngdoc service
 * @name blogClientApp.user
 * @description
 * # user
 * Service in the blogClientApp.
 */
angular.module('blogClientApp')
  .factory('userService', function() {
     var username = '';

     return {
       username : username
     };
   });
