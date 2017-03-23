'use strict';

angular.module('Doob.customerrequest').factory('ServiceCustomerRequestItem', ['restResource', function ($restResource) {
	var ServiceCustomerRequestItem = $restResource('/customerrequest/customerrequestitems');
  	return ServiceCustomerRequestItem;
}]);