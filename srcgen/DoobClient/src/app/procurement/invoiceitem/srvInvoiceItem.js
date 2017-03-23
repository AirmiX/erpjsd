'use strict';

angular.module('Doob.procurement').factory('ServiceInvoiceItem', ['restResource', function ($restResource) {
	var ServiceInvoiceItem = $restResource('/procurement/invoiceitems');
  	return ServiceInvoiceItem;
}]);