'use strict';

angular.module('Doob.stockmanagement').factory('ServiceStockroomOrgUni', ['restResource', function ($restResource) {
	var ServiceStockroomOrgUni = $restResource('/stockmanagement/stockroomorgunis');
  	return ServiceStockroomOrgUni;
}]);