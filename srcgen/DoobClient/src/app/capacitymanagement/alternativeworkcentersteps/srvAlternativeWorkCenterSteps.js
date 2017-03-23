'use strict';

angular.module('Doob.capacitymanagement').factory('ServiceAlternativeWorkCenterSteps', ['restResource', function ($restResource) {
	var ServiceAlternativeWorkCenterSteps = $restResource('/capacitymanagement/alternativeworkcenterstepss');
  	return ServiceAlternativeWorkCenterSteps;
}]);