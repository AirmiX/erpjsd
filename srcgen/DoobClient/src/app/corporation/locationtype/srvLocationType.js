'use strict';

angular.module('Doob.corporation').factory('ServiceLocationType', ['restResource', function ($restResource) {
	var ServiceLocationType = $restResource('/corporation/locationtypes');
  	return ServiceLocationType;
}]);