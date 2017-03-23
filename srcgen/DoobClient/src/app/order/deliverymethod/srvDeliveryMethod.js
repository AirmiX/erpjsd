'use strict';

angular.module('Doob.order').factory('ServiceDeliveryMethod', ['restResource', function ($restResource) {
	var ServiceDeliveryMethod = $restResource('/order/deliverymethods');
  	return ServiceDeliveryMethod;
}]);