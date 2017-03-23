/**
*  Module
*
* Description
*/
'use strict';
angular.module('resources.services', ['Doob.common']);
angular.module('resources.services').factory('Services', ['restResource', function ($restResource) {
  var Services = $restResource('user/services');
  return Services;
}]);	