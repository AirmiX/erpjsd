'use strict';

angular.module('Doob.corporation').factory('ServiceBankAccount', ['restResource', function ($restResource) {
	var ServiceBankAccount = $restResource('/corporation/bankaccounts');
  	return ServiceBankAccount;
}]);