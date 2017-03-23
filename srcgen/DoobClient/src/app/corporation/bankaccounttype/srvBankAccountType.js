'use strict';

angular.module('Doob.corporation').factory('ServiceBankAccountType', ['restResource', function ($restResource) {
	var ServiceBankAccountType = $restResource('/corporation/bankaccounttypes');
  	return ServiceBankAccountType;
}]);