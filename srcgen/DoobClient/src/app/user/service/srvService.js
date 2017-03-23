'use strict';

angular.module('Doob.user').factory('ServiceService', ['restResource', function ($restResource) {
	var ServiceService = $restResource('/user/services');
  	return ServiceService;
}]);