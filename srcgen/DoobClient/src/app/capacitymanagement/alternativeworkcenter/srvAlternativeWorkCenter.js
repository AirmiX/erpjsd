'use strict';

angular.module('Doob.capacitymanagement').factory('ServiceAlternativeWorkCenter', ['restResource', function ($restResource) {
	var ServiceAlternativeWorkCenter = $restResource('/capacitymanagement/alternativeworkcenters');
  	return ServiceAlternativeWorkCenter;
}]);