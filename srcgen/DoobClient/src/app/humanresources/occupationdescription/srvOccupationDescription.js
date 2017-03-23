'use strict';

angular.module('Doob.humanresources').factory('ServiceOccupationDescription', ['restResource', function ($restResource) {
	var ServiceOccupationDescription = $restResource('/humanresources/occupationdescriptions');
  	return ServiceOccupationDescription;
}]);