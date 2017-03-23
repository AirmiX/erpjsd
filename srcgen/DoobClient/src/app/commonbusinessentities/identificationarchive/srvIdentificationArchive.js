'use strict';

angular.module('Doob.commonbusinessentities').factory('ServiceIdentificationArchive', ['restResource', function ($restResource) {
	var ServiceIdentificationArchive = $restResource('/commonbusinessentities/identificationarchives');
  	return ServiceIdentificationArchive;
}]);