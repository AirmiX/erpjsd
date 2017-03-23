'use strict';

angular.module('Doob.procurement').factory('ServiceShippingDocumentItem', ['restResource', function ($restResource) {
	var ServiceShippingDocumentItem = $restResource('/procurement/shippingdocumentitems');
  	return ServiceShippingDocumentItem;
}]);