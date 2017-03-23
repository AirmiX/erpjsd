'use strict';

angular.module('Doob.environment').factory('ServiceTerritorialUnit', ['restResource', function ($restResource) {
	var ServiceTerritorialUnit = $restResource('/environment/territorialunits');
  	return ServiceTerritorialUnit;
}]);