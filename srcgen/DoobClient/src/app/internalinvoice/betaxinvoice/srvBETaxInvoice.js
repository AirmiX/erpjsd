'use strict';

angular.module('Doob.internalinvoice').factory('ServiceBETaxInvoice', ['restResource', function ($restResource) {
	var ServiceBETaxInvoice = $restResource('/internalinvoice/betaxinvoices');
  	return ServiceBETaxInvoice;
}]);