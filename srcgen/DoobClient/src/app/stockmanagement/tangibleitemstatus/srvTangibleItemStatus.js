'use strict';

angular.module('Doob.stockmanagement').factory('ServiceTangibleItemStatus', ['restResource', function ($restResource) {
	var ServiceTangibleItemStatus = $restResource('/stockmanagement/tangibleitemstatuss');
  	return ServiceTangibleItemStatus;
}]);