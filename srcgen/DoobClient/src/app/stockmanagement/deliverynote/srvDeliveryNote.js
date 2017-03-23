'use strict';

angular.module('Doob.stockmanagement').factory('ServiceDeliveryNote', ['restResource', function ($restResource) {
	var ServiceDeliveryNote = $restResource('/stockmanagement/deliverynotes');
  	return ServiceDeliveryNote;
}]);