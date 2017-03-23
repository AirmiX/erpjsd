'use strict';

angular.module('Doob.procurement').factory('ServiceShippingDocument', ['restResource', function ($restResource) {
	var ServiceShippingDocument = $restResource('/procurement/shippingdocuments');
  	return ServiceShippingDocument;
}]);