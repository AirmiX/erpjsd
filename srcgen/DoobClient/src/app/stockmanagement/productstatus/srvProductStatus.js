'use strict';

angular.module('Doob.stockmanagement').factory('ServiceProductStatus', ['restResource', function ($restResource) {
	var ServiceProductStatus = $restResource('/stockmanagement/productstatuss');
  	return ServiceProductStatus;
}]);