'use strict';

angular.module('Doob.capacitymanagement').factory('ServiceAvailabilityTechnologicalUnits', ['restResource', function ($restResource) {
	var ServiceAvailabilityTechnologicalUnits = $restResource('/capacitymanagement/availabilitytechnologicalunitss');
  	return ServiceAvailabilityTechnologicalUnits;
}]);