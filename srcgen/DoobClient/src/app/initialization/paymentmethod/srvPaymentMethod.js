'use strict';

angular.module('Doob.initialization').factory('ServicePaymentMethod', ['restResource', function ($restResource) {
	var ServicePaymentMethod = $restResource('/initialization/paymentmethods');
  	return ServicePaymentMethod;
}]);