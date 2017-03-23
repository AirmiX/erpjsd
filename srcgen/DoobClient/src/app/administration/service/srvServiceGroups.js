'use strict';
angular.module('Doob.administration').factory('ServiceServiceGroups', ['restResource', function ($restResource) {
	var ServiceServiceGroups = $restResource('/user/serviceGroups');
  	return ServiceServiceGroups;
}]);		
