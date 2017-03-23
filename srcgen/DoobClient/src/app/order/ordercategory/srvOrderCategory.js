'use strict';

angular.module('Doob.order').factory('ServiceOrderCategory', ['restResource', function ($restResource) {
	var ServiceOrderCategory = $restResource('/order/ordercategorys');
  	return ServiceOrderCategory;
}]);