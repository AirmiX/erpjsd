'use strict';

angular.module('Doob.stockmanagement').factory('ServicePacking', ['restResource', function ($restResource) {
	var ServicePacking = $restResource('/stockmanagement/packings');
  	return ServicePacking;
}]);