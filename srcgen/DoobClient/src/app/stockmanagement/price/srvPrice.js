'use strict';

angular.module('Doob.stockmanagement').factory('ServicePrice', ['restResource', function ($restResource) {
	var ServicePrice = $restResource('/stockmanagement/prices');
  	return ServicePrice;
}]);