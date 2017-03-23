'use strict';

angular.module('Doob.productiondata').factory('ServiceProduct', ['restResource', function ($restResource) {
	var ServiceProduct = $restResource('/productiondata/products');
  	return ServiceProduct;
}]);