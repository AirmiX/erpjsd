'use strict';

angular.module('Doob.capacitymanagement').factory('ServiceWorkCenterSteps', ['restResource', function ($restResource) {
	var ServiceWorkCenterSteps = $restResource('/capacitymanagement/workcenterstepss');
  	return ServiceWorkCenterSteps;
}]);