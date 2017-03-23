'use strict';

angular.module('Doob.environment').factory('ServicePostOffice', ['restResource', function ($restResource) {
	var ServicePostOffice = $restResource('/environment/postoffices');
  	return ServicePostOffice;
}]);