'use strict';

angular.module('Doob.sellingprice').factory('ServiceSellingPrice', ['restResource', function ($restResource) {
	var ServiceSellingPrice = $restResource('/sellingprice/sellingprices');
  	return ServiceSellingPrice;
}]);