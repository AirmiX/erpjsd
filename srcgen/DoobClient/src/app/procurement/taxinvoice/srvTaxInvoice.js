'use strict';

angular.module('Doob.procurement').factory('ServiceTaxInvoice', ['restResource', function ($restResource) {
	var ServiceTaxInvoice = $restResource('/procurement/taxinvoices');
  	return ServiceTaxInvoice;
}]);