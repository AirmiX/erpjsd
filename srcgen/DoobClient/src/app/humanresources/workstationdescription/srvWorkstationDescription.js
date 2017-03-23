'use strict';

angular.module('Doob.humanresources').factory('ServiceWorkstationDescription', ['restResource', function ($restResource) {
	var ServiceWorkstationDescription = $restResource('/humanresources/workstationdescriptions');
  	return ServiceWorkstationDescription;
}]);