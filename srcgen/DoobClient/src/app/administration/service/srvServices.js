'use strict';
angular.module('Doob.administration').factory('ServiceServices', ['restResource', function ($restResource) {
	var ServiceServices = $restResource('/user/services');
  	return ServiceServices;
}]);		
