'use strict';

angular.module('Doob.sellingprice').factory('ServiceMarket', ['restResource', function ($restResource) {
	var ServiceMarket = $restResource('/sellingprice/markets');
  	return ServiceMarket;
}]);