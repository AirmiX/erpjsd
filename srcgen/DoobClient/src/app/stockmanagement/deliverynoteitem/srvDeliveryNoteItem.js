'use strict';

angular.module('Doob.stockmanagement').factory('ServiceDeliveryNoteItem', ['restResource', function ($restResource) {
	var ServiceDeliveryNoteItem = $restResource('/stockmanagement/deliverynoteitems');
  	return ServiceDeliveryNoteItem;
}]);