'use strict';

angular.module('Doob.logical').factory('ServiceParity', ['restResource', function ($restResource) {
	var ServiceParity = $restResource('/logical/paritys');
  	return ServiceParity;
}]);