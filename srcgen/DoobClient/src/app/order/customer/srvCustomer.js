'use strict';

angular.module('Doob.order').factory('ServiceCustomer', ['restResource', function ($restResource) {
	var ServiceCustomer = $restResource('/order/customers');
  	return ServiceCustomer;
}]);