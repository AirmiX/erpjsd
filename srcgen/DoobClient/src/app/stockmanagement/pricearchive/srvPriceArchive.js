'use strict';

angular.module('Doob.stockmanagement').factory('ServicePriceArchive', ['restResource', function ($restResource) {
	var ServicePriceArchive = $restResource('/stockmanagement/pricearchives');
  	return ServicePriceArchive;
}]);