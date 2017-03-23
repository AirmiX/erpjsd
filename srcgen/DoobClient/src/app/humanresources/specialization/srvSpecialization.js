'use strict';

angular.module('Doob.humanresources').factory('ServiceSpecialization', ['restResource', function ($restResource) {
	var ServiceSpecialization = $restResource('/humanresources/specializations');
  	return ServiceSpecialization;
}]);