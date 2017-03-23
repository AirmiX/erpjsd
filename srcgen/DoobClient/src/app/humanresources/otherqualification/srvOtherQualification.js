'use strict';

angular.module('Doob.humanresources').factory('ServiceOtherQualification', ['restResource', function ($restResource) {
	var ServiceOtherQualification = $restResource('/humanresources/otherqualifications');
  	return ServiceOtherQualification;
}]);