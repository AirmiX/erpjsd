'use strict';

angular.module('Doob.stockmanagement').factory('ServiceItem', ['restResource', function ($restResource) {
	var ServiceItem = $restResource('/stockmanagement/items');
  	return ServiceItem;
}]);