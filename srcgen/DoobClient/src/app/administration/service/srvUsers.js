'use strict';
angular.module('Doob.administration').factory('ServiceUsers', ['restResource', function ($restResource) {
	var ServiceUsers = $restResource('/user/appUsers');
  	return ServiceUsers;
}]);		
