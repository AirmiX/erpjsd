'use strict';

angular.module('Doob.capacitymanagement').factory('ServiceRate', ['restResource', function ($restResource) {
	var ServiceRate = $restResource('/capacitymanagement/rates');
  	return ServiceRate;
}]);