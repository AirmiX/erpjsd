'use strict';

angular.module('Doob.customerrequest').factory('ServiceCustomerRequestHeading', ['restResource', function ($restResource) {
	var ServiceCustomerRequestHeading = $restResource('/customerrequest/customerrequestheadings');
  	return ServiceCustomerRequestHeading;
}]);