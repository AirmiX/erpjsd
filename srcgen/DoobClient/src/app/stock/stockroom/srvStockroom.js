'use strict';

angular.module('Doob.stock').factory('ServiceStockroom', ['restResource', function ($restResource) {
	var ServiceStockroom = $restResource('/stock/stockrooms');
  	return ServiceStockroom;
}]);