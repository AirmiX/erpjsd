'use strict';

angular.module('Doob.commonbusinessentities').factory('ServiceClassification', ['restResource', function ($restResource) {
	var ServiceClassification = $restResource('/commonbusinessentities/classifications');
  	return ServiceClassification;
}]);