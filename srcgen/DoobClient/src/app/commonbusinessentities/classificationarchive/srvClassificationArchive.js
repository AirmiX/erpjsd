'use strict';

angular.module('Doob.commonbusinessentities').factory('ServiceClassificationArchive', ['restResource', function ($restResource) {
	var ServiceClassificationArchive = $restResource('/commonbusinessentities/classificationarchives');
  	return ServiceClassificationArchive;
}]);