'use strict';

angular.module('Doob.capacitymanagement').factory('ServiceAvailabilityWorkCenter', ['restResource', function ($restResource) {
	var ServiceAvailabilityWorkCenter = $restResource('/capacitymanagement/availabilityworkcenters');
  	return ServiceAvailabilityWorkCenter;
}]);