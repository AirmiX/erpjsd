'use strict';

angular.module('Doob.order').factory('ServiceOrderGroup', ['restResource', function ($restResource) {
	var ServiceOrderGroup = $restResource('/order/ordergroups');
  	return ServiceOrderGroup;
}]);