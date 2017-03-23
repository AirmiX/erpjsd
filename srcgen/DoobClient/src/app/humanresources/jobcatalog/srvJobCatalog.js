'use strict';

angular.module('Doob.humanresources').factory('ServiceJobCatalog', ['restResource', function ($restResource) {
	var ServiceJobCatalog = $restResource('/humanresources/jobcatalogs');
  	return ServiceJobCatalog;
}]);