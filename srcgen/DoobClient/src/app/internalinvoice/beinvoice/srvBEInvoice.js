'use strict';

angular.module('Doob.internalinvoice').factory('ServiceBEInvoice', ['restResource', function ($restResource) {
	var ServiceBEInvoice = $restResource('/internalinvoice/beinvoices');
  	return ServiceBEInvoice;
}]);