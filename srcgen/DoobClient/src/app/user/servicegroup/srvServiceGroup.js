'use strict';

angular.module('Doob.user').factory('ServiceServiceGroup', ['restResource', function ($restResource) {
	var ServiceServiceGroup = $restResource('/user/servicegroups');
  	return ServiceServiceGroup;
}]);