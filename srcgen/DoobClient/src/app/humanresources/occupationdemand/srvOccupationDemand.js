'use strict';

angular.module('Doob.humanresources').factory('ServiceOccupationDemand', ['restResource', function ($restResource) {
	var ServiceOccupationDemand = $restResource('/humanresources/occupationdemands');
  	return ServiceOccupationDemand;
}]);