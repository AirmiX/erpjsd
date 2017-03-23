'use strict';

angular.module('Doob.procurement').factory('ServiceInvoiceItemsWithoutDisp', ['restResource', function ($restResource) {
	var ServiceInvoiceItemsWithoutDisp = $restResource('/procurement/invoiceitemswithoutdisps');
  	return ServiceInvoiceItemsWithoutDisp;
}]);