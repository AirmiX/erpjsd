'use strict';

angular.module('Doob.order').factory('ServiceOrderItem', ['restResource', function ($restResource) {
	var ServiceOrderItem = $restResource('/order/orderitems');
  	return ServiceOrderItem;
}]);