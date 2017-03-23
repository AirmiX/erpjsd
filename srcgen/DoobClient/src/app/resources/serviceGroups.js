/**
*  Module
*
* Description
*/
'use strict';
angular.module('resources.serviceGroups', ['Doob.common']);
angular.module('resources.serviceGroups').factory('ServiceGroups', ['restResource', function ($restResource) {
  var ServiceGroups = $restResource('user/serviceGroups');
  return ServiceGroups;
}]);	