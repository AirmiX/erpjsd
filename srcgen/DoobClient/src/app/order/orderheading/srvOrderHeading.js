'use strict';

angular.module('Doob.order').factory('ServiceOrderHeading', ['restResource', function ($restResource) {
	var ServiceOrderHeading = $restResource('/order/orderheadings');
  	return ServiceOrderHeading;
}]);