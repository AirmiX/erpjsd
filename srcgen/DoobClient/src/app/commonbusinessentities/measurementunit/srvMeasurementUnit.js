'use strict';

angular.module('Doob.commonbusinessentities').factory('ServiceMeasurementUnit', ['restResource', function ($restResource) {
	var ServiceMeasurementUnit = $restResource('/commonbusinessentities/measurementunits');
  	return ServiceMeasurementUnit;
}]);