'use strict';

angular.module('Doob.procurement').factory('ServiceInvoice', ['restResource', function ($restResource) {
	var ServiceInvoice = $restResource('/procurement/invoices');
  	return ServiceInvoice;
}]);