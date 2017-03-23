'use strict';

angular.module('Doob.initialization').factory('ServicePaymentCondition', ['restResource', function ($restResource) {
	var ServicePaymentCondition = $restResource('/initialization/paymentconditions');
  	return ServicePaymentCondition;
}]);