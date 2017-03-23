'use strict';

angular.module('Doob.stockmanagement').factory('ServiceTangibleItemAmmountByLot', ['restResource', function ($restResource) {
	var ServiceTangibleItemAmmountByLot = $restResource('/stockmanagement/tangibleitemammountbylots');
  	return ServiceTangibleItemAmmountByLot;
}]);