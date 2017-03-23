'use strict';

angular.module('Doob.stockmanagement').factory('ServicePriceDesignation', ['restResource', function ($restResource) {
	var ServicePriceDesignation = $restResource('/stockmanagement/pricedesignations');
  	return ServicePriceDesignation;
}]);