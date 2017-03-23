'use strict';

angular.module('Doob.stockmanagement').factory('ServiceTangibleItemAmmountByAddress', ['restResource', function ($restResource) {
	var ServiceTangibleItemAmmountByAddress = $restResource('/stockmanagement/tangibleitemammountbyaddresss');
  	return ServiceTangibleItemAmmountByAddress;
}]);