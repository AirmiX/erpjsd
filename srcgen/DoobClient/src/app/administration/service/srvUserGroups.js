'use strict';
angular.module('Doob.administration').factory('ServiceUserGroups', ['restResource', function ($restResource) {
	var ServiceUserGroups = $restResource('/user/userGroups');
  	return ServiceUserGroups;
}]);		
