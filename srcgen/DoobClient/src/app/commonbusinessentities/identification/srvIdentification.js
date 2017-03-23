'use strict';

angular.module('Doob.commonbusinessentities').factory('ServiceIdentification', ['restResource', function ($restResource) {
	var ServiceIdentification = $restResource('/commonbusinessentities/identifications');
  	return ServiceIdentification;
}]);