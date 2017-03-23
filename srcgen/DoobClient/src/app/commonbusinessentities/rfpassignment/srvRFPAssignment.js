'use strict';

angular.module('Doob.commonbusinessentities').factory('ServiceRFPAssignment', ['restResource', function ($restResource) {
	var ServiceRFPAssignment = $restResource('/commonbusinessentities/rfpassignments');
  	return ServiceRFPAssignment;
}]);