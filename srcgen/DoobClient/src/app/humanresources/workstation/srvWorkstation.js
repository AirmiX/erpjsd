'use strict';

angular.module('Doob.humanresources').factory('ServiceWorkstation', ['restResource', function ($restResource) {
	var ServiceWorkstation = $restResource('/humanresources/workstations');
  	return ServiceWorkstation;
}]);