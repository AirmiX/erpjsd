'use strict';

angular.module('Doob.logical').factory('ServiceOrderSupplierItem', ['restResource', function ($restResource) {
	var ServiceOrderSupplierItem = $restResource('/logical/ordersupplieritems');
  	return ServiceOrderSupplierItem;
}]);