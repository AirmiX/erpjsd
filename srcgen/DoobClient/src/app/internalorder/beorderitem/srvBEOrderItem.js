'use strict';

angular.module('Doob.internalorder').factory('ServiceBEOrderItem', ['restResource', function ($restResource) {
	var ServiceBEOrderItem = $restResource('/internalorder/beorderitems');
  	return ServiceBEOrderItem;
}]);