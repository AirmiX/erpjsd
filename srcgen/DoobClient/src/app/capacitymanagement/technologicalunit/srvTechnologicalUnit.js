'use strict';

angular.module('Doob.capacitymanagement').factory('ServiceTechnologicalUnit', ['restResource', function ($restResource) {
	var ServiceTechnologicalUnit = $restResource('/capacitymanagement/technologicalunits');
  	return ServiceTechnologicalUnit;
}]);