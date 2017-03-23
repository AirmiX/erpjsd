'use strict';

angular.module('Doob.environment').factory('ServiceTerritorialUnitType', ['restResource', function ($restResource) {
	var ServiceTerritorialUnitType = $restResource('/environment/territorialunittypes');
  	return ServiceTerritorialUnitType;
}]);