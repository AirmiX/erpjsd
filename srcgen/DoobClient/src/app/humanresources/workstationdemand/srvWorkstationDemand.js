'use strict';

angular.module('Doob.humanresources').factory('ServiceWorkstationDemand', ['restResource', function ($restResource) {
	var ServiceWorkstationDemand = $restResource('/humanresources/workstationdemands');
  	return ServiceWorkstationDemand;
}]);