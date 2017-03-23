'use strict';

angular.module('Doob.procurement').factory('ServiceProFormaInvoice', ['restResource', function ($restResource) {
	var ServiceProFormaInvoice = $restResource('/procurement/proformainvoices');
  	return ServiceProFormaInvoice;
}]);