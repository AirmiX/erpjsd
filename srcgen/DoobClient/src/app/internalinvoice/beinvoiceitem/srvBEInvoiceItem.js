'use strict';

angular.module('Doob.internalinvoice').factory('ServiceBEInvoiceItem', ['restResource', function ($restResource) {
	var ServiceBEInvoiceItem = $restResource('/internalinvoice/beinvoiceitems');
  	return ServiceBEInvoiceItem;
}]);