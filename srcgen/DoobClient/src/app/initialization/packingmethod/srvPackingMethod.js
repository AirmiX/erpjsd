'use strict';

angular.module('Doob.initialization').factory('ServicePackingMethod', ['restResource', function ($restResource) {
	var ServicePackingMethod = $restResource('/initialization/packingmethods');
  	return ServicePackingMethod;
}]);