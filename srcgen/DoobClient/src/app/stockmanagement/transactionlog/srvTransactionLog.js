'use strict';

angular.module('Doob.stockmanagement').factory('ServiceTransactionLog', ['restResource', function ($restResource) {
	var ServiceTransactionLog = $restResource('/stockmanagement/transactionlogs');
  	return ServiceTransactionLog;
}]);