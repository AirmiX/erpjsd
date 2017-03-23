'use strict';

angular.module('Doob.corporation').factory('ServiceLocation', ['restResource', function ($restResource) {
	var ServiceLocation = $restResource('/corporation/locations');
  	return ServiceLocation;
}]);