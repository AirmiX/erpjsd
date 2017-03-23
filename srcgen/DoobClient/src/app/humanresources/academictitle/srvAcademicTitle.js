'use strict';

angular.module('Doob.humanresources').factory('ServiceAcademicTitle', ['restResource', function ($restResource) {
	var ServiceAcademicTitle = $restResource('/humanresources/academictitles');
  	return ServiceAcademicTitle;
}]);