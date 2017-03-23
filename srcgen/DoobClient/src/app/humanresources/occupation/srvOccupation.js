'use strict';

angular.module('Doob.humanresources').factory('ServiceOccupation', ['restResource', function ($restResource) {
	var ServiceOccupation = $restResource('/humanresources/occupations');
  	return ServiceOccupation;
}]);