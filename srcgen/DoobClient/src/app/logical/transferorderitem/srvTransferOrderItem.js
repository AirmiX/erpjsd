'use strict';

angular.module('Doob.logical').factory('ServiceTransferOrderItem', ['restResource', function ($restResource) {
	var ServiceTransferOrderItem = $restResource('/logical/transferorderitems');
  	return ServiceTransferOrderItem;
}]);