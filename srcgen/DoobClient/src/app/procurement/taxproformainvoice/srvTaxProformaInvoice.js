'use strict';

angular.module('Doob.procurement').factory('ServiceTaxProformaInvoice', ['restResource', function ($restResource) {
	var ServiceTaxProformaInvoice = $restResource('/procurement/taxproformainvoices');
  	return ServiceTaxProformaInvoice;
}]);