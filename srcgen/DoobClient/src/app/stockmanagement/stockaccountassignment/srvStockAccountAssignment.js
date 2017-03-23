'use strict';

angular.module('Doob.stockmanagement').factory('ServiceStockAccountAssignment', ['restResource', function ($restResource) {
	var ServiceStockAccountAssignment = $restResource('/stockmanagement/stockaccountassignments');
  	return ServiceStockAccountAssignment;
}]);