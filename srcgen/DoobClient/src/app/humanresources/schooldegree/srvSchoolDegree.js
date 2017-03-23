'use strict';

angular.module('Doob.humanresources').factory('ServiceSchoolDegree', ['restResource', function ($restResource) {
	var ServiceSchoolDegree = $restResource('/humanresources/schooldegrees');
  	return ServiceSchoolDegree;
}]);